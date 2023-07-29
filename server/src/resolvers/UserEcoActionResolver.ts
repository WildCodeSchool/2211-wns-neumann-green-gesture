import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import { ContextType } from "..";
import { UserSubscriptionType } from "../entity/User";
import {
  UserEcoAction,
  UserEcoActionInputAddLike,
  UserEcoActionInputAddPoints,
  UserEcoActionInputAddProof,
} from "../entity/UserEcoAction";
import { ApolloError } from "apollo-server-errors";
import EcoAction from "../entity/EcoAction";

@Resolver(UserEcoAction)
export class UserEcoActionResolver {
  // Query for getting user's userEcoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Query(() => UserEcoAction)
  async getUserEcoAction(
    @Arg("ecoActionId") ecoActionId: number,
    @Arg("groupId") groupId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<UserEcoAction> {
    const userEcoAction = await datasource
      .getRepository(UserEcoAction)
      .findOne({
        where: {
          user: {
            id: currentUser?.id,
          },
          ecoAction: {
            id: ecoActionId,
            groups: {
              id: groupId,
            },
          },
        },
        relations: {
          ecoAction: {
            groups: true,
            validations: true,
            relatedUsers: true,
          },
          user: true,
        },
      });

    if (userEcoAction === null)
      throw new ApolloError("UserEcoAction not found");

    return userEcoAction;
  }

  // Mutation for adding a proof to an ecoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => String)
  async addProof(
    @Arg("data") { proof, userEcoActionId }: UserEcoActionInputAddProof
  ): Promise<string> {
    const userEcoAction = await datasource
      .getRepository(UserEcoAction)
      .findOne({
        where: {
          id: userEcoActionId,
        },
      });

    if (userEcoAction === null) {
      throw new ApolloError("UserEcoAction not found");
    }

    userEcoAction.proof = proof;
    await datasource.getRepository(UserEcoAction).save(userEcoAction);

    return "Your proof has been added";
  }

  // Mutation for liking an ecoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => String)
  async likeEcoAction(
    @Arg("data")
    { hasLiked, ecoActionId, groupId }: UserEcoActionInputAddLike,
    @Ctx() { currentUser }: ContextType
  ): Promise<string> {
    const userEcoAction = await datasource
      .getRepository(UserEcoAction)
      .findOne({
        where: {
          user: {
            id: currentUser?.id,
          },
          ecoAction: {
            id: ecoActionId,
            groups: {
              id: groupId,
            },
          },
        },
        relations: {
          ecoAction: {
            groups: true,
            validations: true,
          },
          user: true,
        },
      });

    if (userEcoAction === null) {
      throw new ApolloError("UserEcoAction not found");
    }

    userEcoAction.hasLiked = hasLiked;
    await datasource.getRepository(UserEcoAction).save(userEcoAction);

    // update ecoAction likes
    const ecoAction = await datasource
      .getRepository(EcoAction)
      .findOneBy({ id: ecoActionId });
    if (ecoAction === null) {
      throw new ApolloError("EcoAction not found");
    }
    ecoAction.likes = hasLiked ? +ecoAction.likes + 1 : +ecoAction.likes - 1;
    await datasource.getRepository(EcoAction).save(ecoAction);

    return "Your like has been added";
  }

  // Mutation for adding points to an userEcoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => String)
  async addPoints(
    @Arg("data") { userEcoActionId, points }: UserEcoActionInputAddPoints
  ): Promise<string> {
    const userEcoAction = await datasource
      .getRepository(UserEcoAction)
      .findOne({
        where: {
          id: userEcoActionId,
        },
      });

    if (userEcoAction === null) {
      throw new ApolloError("UserEcoAction not found");
    }

    userEcoAction.validationId = points;
    await datasource.getRepository(UserEcoAction).save(userEcoAction);

    return "Your points have been added";
  }
}
