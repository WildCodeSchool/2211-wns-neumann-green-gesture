import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Group from "../entity/Group";
import { ContextType } from "..";
import EcoAction, { EcoActionInputCreation } from "../entity/EcoAction";
import { UserSubscriptionType } from "../entity/User";
import { IsNull } from "typeorm";

@Resolver(EcoAction)
export class EcoActionResolver {
  @Authorized<UserSubscriptionType>([UserSubscriptionType.PARTNER])
  @Mutation(() => EcoAction)
  async createEcoAction(
    @Arg("data")
    { name, description, validations }: EcoActionInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Group> {
    return await datasource.getRepository(Group).save({
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
      order: {
        likes: "DESC",
      },
      take: 5,
      relations: {
        validations: true,
      },
    });
  }
}
