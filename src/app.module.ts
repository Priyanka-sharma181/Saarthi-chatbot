// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmEntity } from './model/rm.entity';
import { AppController } from './app.controller';
import { UserService } from './model/user.service';
import * as dotenv from 'dotenv';
import { databaseConfig } from './config/database-config.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggingService } from './common/middleware/logger.middleware';
import { SwiftchatModule } from './swiftchat/swiftchat.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { ChatbotModule } from './chat/chatbot.module';
import { MessageModule } from './message/message.module';
import { RmService } from './chat/rm.service';
import { AttendanceEntity } from './model/attedance.entity';
import { ParentEntity } from './model/parent.entity';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return databaseConfig;
      },
    }),
    TypeOrmModule.forFeature([RmEntity,AttendanceEntity,ParentEntity]),
    MessageModule,
    ChatbotModule,
    SwiftchatModule,
  ],
  controllers: [AppController],
  providers: [
    LoggingService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    RmService,
  ],
})
export class AppModule {}
