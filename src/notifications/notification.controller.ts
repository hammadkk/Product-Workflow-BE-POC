import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput, UpdateNotificationInput } from './dtos/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationService.findOne(id);
  }

  @Post()
  async create(@Body() createNotificationInput: CreateNotificationInput): Promise<Notification> {
    return this.notificationService.create(createNotificationInput);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationInput: UpdateNotificationInput,
  ): Promise<Notification> {
    return this.notificationService.update(id, updateNotificationInput);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.notificationService.remove(id);
  }
}
