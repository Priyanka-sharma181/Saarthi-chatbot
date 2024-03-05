// chatbot.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatModule } from 'src/swiftchat/swiftchat.module';
import { UserModule } from 'src/model/user.module'; // Import the UserModule
import ChatbotService from './chatbot.service';
import IntentClassifier from '../intent/intent.classifier';
import { SwiftchatMessageService } from 'src/swiftchat/swiftchat.service';
import { MessageService } from 'src/message/message.service';
import { RmService } from './rm.service';

@Module({
  imports: [UserModule, SwiftchatModule], // Import UserModule
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
