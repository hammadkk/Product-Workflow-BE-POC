import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput, UpdateNotificationInput } from './dtos/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationRepository.find();
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id } });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async create(data: CreateNotificationInput): Promise<Notification> {
    const notification = this.notificationRepository.create(data);
    return this.notificationRepository.save(notification);
  }

  async update(id: string, data: UpdateNotificationInput): Promise<Notification> {
    const notification = await this.findOne(id);
    Object.assign(notification, data);
    return this.notificationRepository.save(notification);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.notificationRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
