import { Module } from '@nestjs/common';
import { SwiftchatModule } from 'src/swiftchat/swiftchat.module';
import { UserModule } from 'src/model/user.module';
import ChatbotService from './chatbot.service';
import IntentClassifier from '../intent/intent.classifier';
import { SwiftchatMessageService } from 'src/swiftchat/swiftchat.service';
import { MessageService } from 'src/message/message.service';
import { RmService } from './rm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmEntity } from 'src/model/rm.entity';
import { AttendanceEntity } from 'src/model/attedance.entity';
import { ParentEntity } from 'src/model/parent.entity';

@Module({
  imports: [
    UserModule,
    SwiftchatModule,
    TypeOrmModule.forFeature([RmEntity, AttendanceEntity, ParentEntity]),
  ], // Import UserModule
  providers: [
    ChatbotService,
    IntentClassifier,
    RmService,
    {
      provide: MessageService,
      useClass: SwiftchatMessageService,
    },
  ],
  exports: [ChatbotService, IntentClassifier],
})
export class ChatbotModule {}
