import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import datasource from "../db";
import User, { UserSubscriptionType } from "../entity/User";
import Notification, {
  NotificationInputCreation,
} from "../entity/Notification";
import { ContextType } from "..";
import Group from "../entity/Group";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export class NotificationResolver {
  @Authorized<UserSubscriptionType>([
    UserSubscriptionType.FREE,
    UserSubscriptionType.PARTNER,
  ])
  @Mutation(() => Notification)
  async sendNotification(
    @Arg("data")
    { type, receiverId, groupId }: NotificationInputCreation,
    @Ctx() { currentUser }: ContextType
  ): Promise<Notification> {
    const receiver = await datasource.getRepository(User).findOne({
      where: { id: receiverId },
    });

    const group = await datasource.getRepository(Group).findOne({
      where: { id: groupId },
    });

    if (receiver === null) {
      throw new ApolloError("Invalid receiver", "INVALID_RECEIVER");
    }

    const notification = await datasource.getRepository(Notification).save({
      type,
      sender: currentUser,
      receiver,
      ...(group !== null && { group }),
    });

    return notification;
  }
}
