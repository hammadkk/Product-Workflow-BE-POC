import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationResolver } from './notification.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationService, NotificationResolver],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
