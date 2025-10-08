import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from './dtos/notification.dto';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [Notification], { name: 'notifications' })
  async findAll() {
    return this.notificationService.findAll();
  }

  @Query(() => Notification, { name: 'notification' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  async createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationService.create(createNotificationInput);
  }

  @Mutation(() => Notification)
  async updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
    @Args('approval', { type: () => Boolean, defaultValue: false })
    approval: boolean,
  ) {
    return this.notificationService.update(
      updateNotificationInput.id,
      updateNotificationInput,
      approval,
    );
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('id', { type: () => ID }) id: string) {
    return this.notificationService.remove(id);
  }
}
