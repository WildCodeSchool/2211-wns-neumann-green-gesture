import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTeamInput, Team, TeamInputAddUsers } from "../entity/Team";
import datasource from "../db";
import Group from "../entity/Group";
import { ApolloError } from "apollo-server-errors";
import User from "../entity/User";
import { In } from "typeorm";

@Resolver(Team)
export class CommentResolver {
  // Accessible au partenaires
  @Mutation(() => Team)
  async createTeam(
    @Arg("data") { name, groupId }: CreateTeamInput
  ): Promise<Team> {
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });

    if (group === null) throw new ApolloError("Group not found", "NOT_FOUND");

    return await datasource.getRepository(Team).save({
      name,
      group,
    });
  }

  // Accessible à l'admin
  @Query(() => [Team])
  async getTeams(): Promise<Team[]> {
    return await datasource
      .getRepository(Team)
      .find({ relations: { group: true, users: true } });
  }

  @Mutation(() => Team)
  async addUsersToTeam(
    @Arg("data") { teamId, userIds }: TeamInputAddUsers
  ): Promise<Team> {
    const team = await datasource.getRepository(Team).findOne({
      where: { id: teamId },
      relations: { users: true, group: true },
    });

    const users = await datasource
      .getRepository(User)
      .findBy({ id: In(userIds) });
    console.log(users);

    if (team !== null && users.length > 0) {
      team.users = users;
      console.log(team);
      const team1 = await datasource.getRepository(Team).save(team);
      console.log(team1);
      return team1;

      //   return await datasource.getRepository(Team).findOne({
      //     where: { id: teamId },
      //     relations: { users: true, group: true },
      //     });
    }
    throw new Error("Team or users not found");
  }
}
