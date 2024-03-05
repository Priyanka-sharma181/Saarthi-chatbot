import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { localisedStrings } from 'src/i18n/hn/localised-strings';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';

dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }

  async sendLanguageChangedMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.select_language,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }


async  sendAttednaceMessagToRM(recipientMobile,language) {
  try {
   const requestData ={
      to: recipientMobile,
      type: "template",
      template: {
        name: "send_attendance_to_rm",
        parameters: "parameters",
      }
    }
    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
  }
}

async senRemiderMessageToParent(from,language){
  const localisedStrings = LocalizationService.getLocalisedString(language);
  const requestData = this.prepareRequestData(
    from,
    localisedStrings.reminderMessageToParent,
  );
  const response = await this.sendMessage(
    this.baseUrl,
    requestData,
    this.apiKey,
  );
  return response;
}
async askRmToSendWork(from,language){
  const requestData  = {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.askRmToSendWorkToParent,
        },
      },
      buttons: [
        {
          type: 'solid',
          body: 'sendAll',
          reply: 'sendAll',
        },
      ],
      allow_custom_response: false,
    },
  };
  const response = await this.sendMessage(
    this.baseUrl,
    requestData,
    this.apiKey,
  );
  return response;
}


async sendMessageToRM(
  from: string
): Promise<void> {
  const data = {
    to: from,
    type: 'button',
    button: {
      body: {
        type: 'text',
        text: {
          body: localisedStrings.rm,
        },
      },
      buttons: [
        {
          type: 'solid',
          body: 'yes',
          reply: 'yes',
        },
        {
          type: 'solid',
          body: 'no',
          reply: 'no',
        },
      ],
      allow_custom_response: false,
    },
  };
  const response = await this.sendMessage(
    this.baseUrl,
    data,
    this.apiKey,
  );
  return response;

}
}