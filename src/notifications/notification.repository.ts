import { EntityRepository, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository extends Repository<Notification> {}
