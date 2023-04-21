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
import jwt from "jsonwebtoken";
import { Not } from "typeorm";

import User, {
  hashPassword,
  UserInputLogin,
  UserInputSubscribe,
  UserSubscriptionType,
  verifyPassword,
} from "../entity/User";

import datasource from "../db";
import { env } from "../env";
import { ContextType } from "..";
import { Company } from "../entity/Company";

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
    const user = await datasource.getRepository(User).findOne({
      where: { id },
      relations: { friends: true, company: true, createdCompany: true },
    });

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
      company,
      role,
      subscriptionType,
    }: UserInputSubscribe
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const createdUser = await datasource.getRepository(User).save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      subscriptionType,
    });

    if (company !== null && subscriptionType === UserSubscriptionType.PARTNER) {
      const newCompany = await datasource.getRepository(Company).save({
        name: company,
        creator: createdUser,
        users: [createdUser],
      });

      createdUser.createdCompany = newCompany;
      createdUser.company = newCompany;

      const createdPartnerUser = await datasource
        .getRepository(User)
        .save(createdUser);

      return createdPartnerUser;
    }

    return createdUser;
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
      .findOne({ where: { id: friendId }, relations: { friends: true } });

    if (friend === null) throw new ApolloError("friend not found", "NOT_FOUND");

    // const user = currentUser as User;
    const user = currentUser as User;

    const alreadyIn = user.friends?.findIndex((f) => f.id === friend.id) > -1;
    if (alreadyIn) {
      throw new ApolloError("friend already added", "ALREADY_ADDED");
    }

    user.friends?.push(friend);

    friend.friends?.push(user);

    await datasource.getRepository(User).save(user);
    await datasource.getRepository(User).save(friend);

    return user;
  }
}
