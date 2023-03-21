import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Group, { GroupInputCreation } from "../entity/Group";
import { ContextType } from "..";
import User from "../entity/User";

@Resolver(Group)
export class GroupResolver {
  @Mutation(() => Group)
  async createGroup(
    @Arg("data")
    { name, startDate, endDate }: GroupInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Group> {
    return await datasource.getRepository(Group).save({
      name,
      startDate,
      endDate,
      author: currentUser,
      users: [currentUser as User],
    });
  }

  @Query(() => [Group])
  async getGroups(): Promise<Group[]> {
    return await datasource.getRepository(Group).find({
      relations: {
        author: true,
        users: true,
      },
    });
  }
}
