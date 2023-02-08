import { Query, Resolver } from "type-graphql";
import datasource from "../db";
import User from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find();
  }
}
