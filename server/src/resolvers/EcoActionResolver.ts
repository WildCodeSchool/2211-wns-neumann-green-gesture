import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import { ContextType } from "..";
import EcoAction, { EcoActionInputCreation } from "../entity/EcoAction";
import { UserSubscriptionType } from "../entity/User";
import { In, IsNull } from "typeorm";
import Validation from "../entity/Validation";
import { ApolloError } from "apollo-server-errors";

@Resolver(EcoAction)
export class EcoActionResolver {
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => EcoAction)
  async createEcoAction(
    @Arg("data")
    { name, description, validationIds }: EcoActionInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction> {
    const validations = await datasource.getRepository(Validation).find({
      where: { id: In(validationIds) },
    });

    if (validations.length !== validationIds.length)
      throw new ApolloError("Validation not found", "NOT_FOUND");

    return await datasource.getRepository(EcoAction).save({
      name,
      description,
      author: currentUser,
      validations,
    });
  }

  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Query(() => [EcoAction])
  async getUserEcoActions(
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: {
          id: currentUser?.id,
        },
      },
      relations: {
        author: true,
        validations: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [EcoAction])
  async getFreeEcoActions(): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: IsNull(),
      },
      relations: {
        validations: true,
      },
    });
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [EcoAction])
  async getPopularFreeEcoActions(): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: IsNull(),
      },
      take: 5,
      relations: {
        validations: true,
      },
    });
  }
}
