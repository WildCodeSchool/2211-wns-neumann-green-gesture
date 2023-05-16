import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import datasource from "../db";
import { ContextType } from "..";
import { UserSubscriptionType } from "../entity/User";
import { UserEcoAction } from "../entity/UserEcoAction";

@Resolver(UserEcoAction)
export class UserEcoActionResolver {
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
    return await datasource.getRepository(UserEcoAction).find({
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
        ecoAction: true,
      },
    });
  }
}
