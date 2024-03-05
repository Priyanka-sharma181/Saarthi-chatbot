import ChatbotService from './chat/chatbot.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { log } from './common/middleware/logger.help';
import { Response } from 'express';
import { UserService } from './model/user.service';
import * as dotenv from 'dotenv';
import { RmService } from './chat/rm.service';
dotenv.config()
@Controller("/api")
export class AppController {
  UserService: any;
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly rmService:RmService,
    private readonly langugae: UserService,
  ) {}

  @Get('/status')
  getStatus(@Res() res: Response) {
    res.status(200).send({
      status: {
        code: 0,
        message: 'OK',
      },
    });
  }

  @Post('/message')
  async handelUserMessage(@Body() body, @Res() res): Promise<void> {
    try {
      const { from, text } = body;
      console.log(from)
      this.chatbotService.processMessage(body);
      log(body.from, text.body);
      res.status(200).send({
        status: {
          code: 0,
          message: 'Success',
        },
      });
    } catch (error) {
      res.status(500).send({
        status: {
          code: 1,
          message: error.message,
        },
      });
    }
  }

  @Get('/sendMessageToRm')
  async sendMessageToRm(){
    await this.rmService.sendMessageToRMforAskingWork()
  }
}
