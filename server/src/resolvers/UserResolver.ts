import { ApolloError } from "apollo-server-errors";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import User, {
  hashPassword,
  UserInputLogin,
  UserInputSubscribe,
  verifyPassword,
} from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find();
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

  @Query(() => Boolean)
  async login(
    @Arg("data") { email, password }: UserInputLogin
  ): Promise<boolean> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(user.password, password)))
      throw new ApolloError("Invalid credentials", "INVALID_CREDS");

    return true;
  }
}
