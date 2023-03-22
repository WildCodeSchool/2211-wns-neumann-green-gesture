import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Group, {
  GroupInputAddEcoActions,
  GroupInputCreation,
} from "../entity/Group";
import { ContextType } from "..";
import User, { UserRole, UserSubscriptionType } from "../entity/User";
import EcoAction from "../entity/EcoAction";
import { In } from "typeorm";

@Resolver(Group)
export class GroupResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
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

  /* @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ]) */
  @Mutation(() => Group)
  async addEcoActionsToGroup(
    /* @Arg("groupId", () => Int) groupId: number,
    @Arg("ecoActionIds", () => [Int]) ecoActionIds: number[] */
    @Arg("data") { groupId, ecoActionIds }: GroupInputAddEcoActions
  ): Promise<Group> {
    console.log("groupId", groupId);
    console.log("ecoActionIds", ecoActionIds);

    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    const ecoActions = await datasource
      .getRepository(EcoAction)
      .findBy({ id: In(ecoActionIds) });

    if (group !== null && ecoActions.length > 0) {
      group.ecoActions = ecoActions;
      return await datasource.getRepository(Group).save(group);
    }
    throw new Error("Group or ecoActions not found");
  }

  @Authorized<UserRole>([UserRole.ADMIN])
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
