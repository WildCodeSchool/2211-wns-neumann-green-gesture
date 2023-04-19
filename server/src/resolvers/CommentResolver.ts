import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Comment, { CommentInputCreation } from "../entity/Comment";
import User, { UserSubscriptionType } from "../entity/User";
import datasource from "../db";
import { ContextType } from "..";
import Group from "../entity/Group";

@Resolver(Comment)
export class CommentResolver {
  // Mutation to create a comment
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Mutation(() => Comment)
  async createComment(
    @Arg("data") { message, groupId }: CommentInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Comment> {
    // fetch group
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    if (group === null) throw new Error(`Group not found with id: ${groupId}`);

    const newComment = await datasource.getRepository(Comment).save({
      message,
      user_id: currentUser as User,
      group_id: group,
      createdAt: new Date(),
    });

    return newComment;
  }

  // Query to get all comments for a group
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.PARTNER,
    UserSubscriptionType.FREE,
  ])
  @Query(() => [Comment])
  async getCommentsForGroup(
    @Arg("groupId") groupId: number
  ): Promise<Comment[]> {
    const group = await datasource
      .getRepository(Group)
      .findOneBy({ id: groupId });
    if (group === null) throw new Error(`Group not found with id: ${groupId}`);

    const comments = await datasource.getRepository(Comment).find({
      where: {
        group_id: { id: group.id },
      },
      relations: {
        user_id: true,
      },
    });

    return comments;
  }
}
