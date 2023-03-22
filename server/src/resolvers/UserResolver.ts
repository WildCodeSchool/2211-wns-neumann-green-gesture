import { ApolloError } from "apollo-server-errors";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, {
  hashPassword,
  UserInputLogin,
  UserInputSubscribe,
  verifyPassword,
} from "../entity/User";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { ContextType } from "..";

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

  @Query(() => User)
  async getUserById(@Arg("id", () => Int) id: number): Promise<User> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id } });

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
  ): Promise<User> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(user.password, password)))
      throw new ApolloError("Invalid credentials", "INVALID_CREDS");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return user;
  }
}
