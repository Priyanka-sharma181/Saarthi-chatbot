import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';
import { RmService } from './rm.service';

@Injectable()
export class ChatbotService {
  private readonly intentClassifier: IntentClassifier;
  private readonly message: MessageService;
  private readonly userService: UserService;
  private readonly rmService:RmService;

  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
    rmService:RmService
  ) {
    this.intentClassifier = intentClassifier;
    this.message = message;
    this.userService = userService;
    this.rmService = rmService;

  }


  
  public async processMessage(body: any): Promise<any> {
    try {
      const { from ,button_response} = body;
      if(button_response.body=="yes"){
        await this.message.askRmToSendWork(from)
      } else if(button_response.body=="sendAll"){
        await this.rmService.sendWorkSheetToParent(from)
      }
      // await this.rmService.sendMessageToRMforAskingWork(from,"hindi")
    } catch (error) {
      console.log(error);
    }
  }
  
}

export default ChatbotService;
