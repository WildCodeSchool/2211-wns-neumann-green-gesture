import { Arg, Authorized, Int, Query, Resolver } from "type-graphql";
import Validation from "../entity/Validation";
import datasource from "../db";
import { UserSubscriptionType } from "../entity/User";

@Resolver()
export class ValidationResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Query(() => Validation)
  async getValidation(@Arg("id", () => Int) id: number): Promise<Validation> {
    const validation = await datasource
      .getRepository(Validation)
      .findOne({ where: { id } });

    if (validation === null) throw new Error("Validation not found");

    return validation;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Query(() => Validation)
  async getMaxValidationPoints(
    @Arg("ecoActionId", () => Int) ecoActionId: number
  ): Promise<Validation> {
    const validation = await datasource.getRepository(Validation).findOne({
      where: { ecoAction: { id: ecoActionId } },
      order: { points: "DESC" },
    });

    if (validation === null) throw new Error("Validation not found");

    return validation;
  }

  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Query(() => [Validation])
  async getValidationsByEcoAction(
    @Arg("ecoActionId", () => Int) ecoActionId: number
  ): Promise<Validation[]> {
    const validations = await datasource.getRepository(Validation).find({
      where: { ecoAction: { id: ecoActionId } },
    });

    if (validations === null) throw new Error("Validation not found");

    return validations;
  }
}
