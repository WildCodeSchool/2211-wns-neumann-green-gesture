import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import { ContextType } from "..";
import { UserSubscriptionType } from "../entity/User";
import {
  UserEcoAction,
  UserEcoActionInputAddLike,
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
  @Query(() => [UserEcoAction])
  async getUserEcoAction(
    @Arg("ecoActionId") ecoActionId: number,
    @Arg("groupId") groupId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<UserEcoAction[]> {
    const res = await datasource.getRepository(UserEcoAction).find({
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

    return res;
  }

  // Mutation for adding a proof to an ecoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => String)
  async addProof(
    @Arg("data") { proof, ecoActionId, groupId }: UserEcoActionInputAddProof,
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
    ecoAction.likes = +ecoAction.likes + 1;
    await datasource.getRepository(EcoAction).save(ecoAction);

    return "Your like has been added";
  }
}
