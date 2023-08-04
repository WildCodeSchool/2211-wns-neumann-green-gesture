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
import { ContextType } from "..";
import { UserSubscriptionType } from "../entity/User";
import {
  UserEcoAction,
  UserEcoActionInputAddPoints,
  UserEcoActionInputAddProof,
} from "../entity/UserEcoAction";
import { ApolloError } from "apollo-server-errors";

@Resolver(UserEcoAction)
export class UserEcoActionResolver {
  // Query for getting user's userEcoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Query(() => UserEcoAction)
  async getUserEcoAction(
    @Arg("ecoActionId", () => Int) ecoActionId: number,
    @Arg("groupId", () => Int) groupId: number,
    @Ctx() { currentUser }: ContextType
  ): Promise<UserEcoAction> {
    const userEcoAction = await datasource
      .getRepository(UserEcoAction)
      .findOne({
        where: {
          user: { id: currentUser?.id },
          ecoAction: { id: ecoActionId },
          groupId,
        },
        relations: {
          ecoAction: true,
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

  // Mutation for adding points to an userEcoAction
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => String)
  async addPoints(
    @Arg("data")
    { ecoActionId, validationId, groupId, proof }: UserEcoActionInputAddPoints,
    @Ctx() { currentUser }: ContextType
  ): Promise<string> {
    const userEcoAction = await datasource.getRepository(UserEcoAction).save({
      user: { id: currentUser?.id },
      ecoAction: { id: ecoActionId },
      groupId,
      validationId,
      proof,
    });

    if (userEcoAction === null)
      throw new ApolloError("UserEcoAction not found");

    return "Your points have been added";
  }
}
