import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Group, {
  GroupInputAddEcoActions,
  GroupInputAddOneUser,
  GroupInputCreation,
} from "../entity/Group";
import { ContextType } from "..";
import User, { UserRole, UserSubscriptionType } from "../entity/User";
import EcoAction from "../entity/EcoAction";
import { In } from "typeorm";
import { UserEcoAction } from "../entity/UserEcoAction";

@Resolver(Group)
export class GroupResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => Group)
  async createGroup(
    @Arg("data")
    {
      name,
      challengeName,
      startDate,
      endDate,
      participants,
      ecoActionsIds,
    }: GroupInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Group> {
    // get users from participants
    const participantUsers = await datasource
      .getRepository(User)
      .findBy({ id: In(participants) });

    const ecoActions = await datasource
      .getRepository(EcoAction)
      .findBy({ id: In(ecoActionsIds) });

    const groupCreated = await datasource.getRepository(Group).save({
      name,
      challengeName,
      startDate,
      endDate,
      author: currentUser,
      users: [currentUser as User, ...participantUsers],
      ecoActions,
    });

    groupCreated.users.forEach((user) => {
      groupCreated.ecoActions.forEach(async (ecoAction) => {
        await datasource.getRepository(UserEcoAction).save({
          user: [user],
          ecoAction: [ecoAction],
        });
      });
    });

    return groupCreated;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => Group)
  async addUserToGroup(
    @Arg("data") { groupId, userId }: GroupInputAddOneUser
  ): Promise<Group> {
    const group = await datasource
      .getRepository(Group)
      .findOne({ where: { id: groupId }, relations: { users: true } });

    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userId } });

    if (group !== null && user !== null) {
      group.users = [...group.users, user];
      group.ecoActions.forEach(async (ecoAction) => {
        await datasource.getRepository(UserEcoAction).save({
          user: [user],
          ecoAction: [ecoAction],
        });
      });
      return await datasource.getRepository(Group).save(group);
    }

    throw new Error("Group or user not found");
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => Group)
  async addEcoActionsToGroup(
    @Arg("data") { groupId, ecoActionIds }: GroupInputAddEcoActions
  ): Promise<Group> {
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
        teams: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [Group])
  async getUserGroups(@Ctx() { currentUser }: ContextType): Promise<Group[]> {
    const res = await datasource.getRepository(Group).find({
      where: { users: { id: currentUser?.id } },
      relations: {
        users: true,
        ecoActions: true,
        author: true,
      },
      join: {
        alias: "group",
        leftJoinAndSelect: {
          users: "group.users",
        },
      },
    });

    if (res !== undefined) {
      return res;
    }
    throw new Error("User not found");
  }

  // Query to get one group by his groupId
  // @Authorized<UserSubscriptionType>([
  //   UserSubscriptionType.PARTNER,
  //   UserSubscriptionType.FREE,
  // ])
  @Query(() => Group)
  async getGroup(@Arg("groupId") groupId: number): Promise<Group> {
    const res = await datasource.getRepository(Group).findOne({
      where: { id: groupId },
      relations: {
        author: true,
        users: true,
        ecoActions: { validations: true },
        teams: { users: true },
      },
    });

    if (res !== null) {
      return res;
    }

    throw new Error("Group not found");
  }
}
