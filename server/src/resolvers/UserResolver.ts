import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import datasource from "../db";
import User, {
  hashPassword,
  UserInputLogin,
  UserInputSubscribe,
  UserSubscriptionType,
  verifyPassword,
} from "../entity/User";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { ContextType } from "..";
import { Not } from "typeorm";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find({
      relations: {
        createdGroups: true,
        groups: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [User])
  async getUsers(@Ctx() { currentUser }: ContextType): Promise<User[]> {
    const user = currentUser as User;

    return await datasource.getRepository(User).find({
      where: { id: Not(user.id) },
    });
  }

  @Query(() => User)
  async getUserById(@Arg("id", () => Int) id: number): Promise<User> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id }, relations: { friends: true } });

    if (user === null) throw new ApolloError("user not found", "NOT_FOUND");

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data")
    {
      firstName,
      lastName,
      email,
      password,
      role,
      subscriptionType,
    }: UserInputSubscribe
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    return await datasource.getRepository(User).save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      subscriptionType,
    });
  }

  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInputLogin,
    @Ctx() { res }: ContextType
  ): Promise<String> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(user.password, password)))
      throw new ApolloError("Invalid credentials", "INVALID_CREDS");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() { res }: ContextType): Promise<String> {
    res.clearCookie("token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return "Successfully logged out";
  }

  @Authorized()
  @Query(() => User)
  async getCurrentUser(@Ctx() { currentUser }: ContextType): Promise<User> {
    return currentUser as User;
  }

  // Mutation to add a user to friends list
  // @Authorized<UserSubscriptionType>([
  //   UserSubscriptionType.PARTNER,
  //   UserSubscriptionType.FREE,
  // ])
  @Mutation(() => User)
  async addFriend(
    @Arg("friendId", () => Int) friendId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<User> {
    const friend = await datasource
      .getRepository(User)
      .findOne({ where: { id: friendId } });

    if (friend === null) throw new ApolloError("friend not found", "NOT_FOUND");

    // const user = currentUser as User;
    const user = (await datasource
      .getRepository(User)
      .findOne({ where: { id: 1 }, relations: { friends: true } })) as User;

    console.log("user", user);

    const alreadyIn = user.friends?.findIndex((f) => f.id === friend.id) > -1;
    if (alreadyIn) {
      throw new ApolloError("friend already added", "ALREADY_ADDED");
    }

    user.friends?.push(friend);

    await datasource.getRepository(User).save(user);

    return user;
  }

  // query user friends with left join
  // @Authorized<UserSubscriptionType>([
  //   UserSubscriptionType.PARTNER,
  //   UserSubscriptionType.FREE,
  // ])
  @Query(() => [User])
  async getFriends(@Ctx() { currentUser }: ContextType): Promise<User[]> {
    // const user = currentUser as User;
    const user = (await datasource
      .getRepository(User)
      .findOne({ where: { id: 1 }, relations: { friends: true } })) as User;

    return await datasource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.friends", "friends")
      .where("user.id = :id", { id: user.id })
      .getMany();
  }
}
