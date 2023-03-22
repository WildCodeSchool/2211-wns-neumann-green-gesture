import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import datasource from "../db";
import Group from "../entity/Group";
import { ContextType } from "..";
import EcoAction, { EcoActionInputCreation } from "../entity/EcoAction";

@Resolver(EcoAction)
export class EcoActionResolver {
  @Mutation(() => EcoAction)
  async createEcoAction(
    @Arg("data")
    { name, description }: EcoActionInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Group> {
    return await datasource.getRepository(Group).save({
      name,
      description,
      author: currentUser,
    });
  }

  @Query(() => [EcoAction])
  async getUserEcoActions(
    @Ctx() { currentUser }: ContextType
  ): Promise<EcoAction[]> {
    return await datasource.getRepository(EcoAction).find({
      where: {
        author: currentUser,
      },
      relations: {
        author: true,
      },
    });
  }
}
