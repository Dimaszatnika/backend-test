import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  // Menjalankan task setiap menit
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    console.log('Task running every minute');
  }
}
