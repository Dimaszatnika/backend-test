import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExternalApiModule } from './external-api/external-api.module';
import { TaskModule } from './task/task.module';
import { ReportModule } from './report/report.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReportModule } from './report/report.module';
import { createPool } from 'mysql2/promise';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { ExternalApiModule } from './external-api/external-api.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Global untuk semua modul
    }),
    AuthModule,
    ExternalApiModule,
    TaskModule,
    ReportModule,
    DataModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const connection = await createPool({
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          connectionLimit: 10,
        });
        return connection;
      },
    },
  ],
})
export class AppModule {}
