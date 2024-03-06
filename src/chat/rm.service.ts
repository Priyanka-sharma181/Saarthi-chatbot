import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { AttendanceEntity } from 'src/model/attedance.entity';
import { ParentEntity } from 'src/model/parent.entity';
import { RmEntity } from 'src/model/rm.entity';
import { UserService } from 'src/model/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class RmService {
  constructor(
    private readonly userService: UserService,
    private readonly message: MessageService,
    @InjectRepository(RmEntity)
    private readonly userRepository: Repository<RmEntity>,
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    @InjectRepository(ParentEntity)
    private readonly parentRepository: Repository<ParentEntity>,
  ) {
  }

  async sendMessageToRMforAskingWork() {
    const rm = await this.userService.findAll();
    // for (let number of rm) {
    if (`+91${7722819394}`) {
      await this.message.sendMessageToRM(`+91${7722819394}`);
    }
    // }
  }
  callTodayDate() {
    let time = new Date();
    let year = time.getFullYear();
    let month = ('0' + (time.getMonth() + 1)).slice(-2);
    let date = ('0' + time.getDate()).slice(-2);
    let today_Date = `${year}-${month}-${date}`;
    return today_Date;
  }
  async sendMessageTo() {
    try {
      const selectRM = [];
      const today_Date = this.callTodayDate();
      const activeRMs = await this.userService.findAllActiveRMs();
      const attendanceRMs =
        await this.userService.findAllAttendance(today_Date);
      let presentRM;
      if (attendanceRMs.length > 0) {
        for (const rm of activeRMs) {
          presentRM = attendanceRMs.filter(
            (obj1) => rm.RM_code === obj1.RM_code,
          );
        }
        if (presentRM.length > 0) {
          activeRMs.map((obj) =>
            presentRM.find((obj1) => {
              if (obj.RM_code == obj1.RM_code && obj1.Attendance == 'हाँ') {
                // obj.sendWS = true;
              } else if (
                obj.RM_code == obj1.RM_code &&
                obj1.Attendance == 'नहीं'
              ) {
                // obj.sendWS = false;
              } else {
                // obj.sendAttendance = true;
              }
            }),
          );
        }
      }
    } catch (err) {
      // Handle errors
      console.error(err);
    }
  }

  async sendWorkSheetToParent(data): Promise<void> {
    const phoneNumberWithoutCountryCode = data.replace(/^\+91/, '');
    console.log(phoneNumberWithoutCountryCode);

    let sendWorksheetMasg = '';
    const today_Date = this.callTodayDate();
    try {
      const resultData = await this.userRepository
        .createQueryBuilder('rm')
        .distinct(true)
        .where('rm.Status = :status', { status: 'Active' })
        .andWhere('rm.Phone_Number = :phoneNumber', {
          phoneNumber: phoneNumberWithoutCountryCode,
        })
        .andWhere('rm.RM_code IN (:...codes)', {
          codes: ['9R1'],
        })
        .getMany();
      if (!resultData || resultData.length === 0) {
        // Handle the case when no active RM is found for the given conditions
        return;
      }
      console.log(resultData)

      const presentRM = await this.attendanceRepository
        .createQueryBuilder('attendance')
        .where('attendance.RM_code = :rmCode', {
          rmCode: resultData[0].RM_code,
        })
        .andWhere('attendance.Today_Date >= :todayDate', {
          todayDate: today_Date,
        })
        .getMany();
console.log(presentRM)
      if (presentRM.length > 0 && presentRM[0].Attendance === 'हाँ') {
        const sendDetails = await this.parentRepository.query(
          `SELECT 
            Subject,
            Token_no,
            Worksheet_no,
            English_worksheet_no,
            English_mode_status,
            Mode_status,
            CL_code,
            RM_code,
            WhatsApp_no,
            planned_maths_worksheetlink,
            planned_maths_answersheetlink,
            planned_english_worksheetlink,
            planned_english_answersheetlink
          FROM parent_db
          WHERE CL_code = ?
          AND RM_code = ?
          AND Parent_status = 'Enrolled'`,
          [resultData[0].CL_Code, resultData[0].RM_code],
        );

        for (const element of sendDetails) {
          let mathMorningResponse = {
            CLcode: element.CL_code,
            RMcode: element.RM_code,
            token: element.Token_no,
            worksheet: element.Worksheet_no,
            send_Math_Link: element.planned_maths_worksheetlink,
            send_Math_Answer_Link: element.planned_maths_answersheetlink,
            date: today_Date,
            sendStatus: 'हाँ',
          };
          let englishMorningResponse = {
            CLcode: element.CL_code,
            RMcode: element.RM_code,
            token: element.Token_no,
            worksheet: element.English_worksheet_no,
            send_Eng_Link: element.planned_english_worksheetlink,
            send_Eng_Answer_Link: element.planned_english_answersheetlink,
            date: today_Date,
            sendStatus: 'हाँ',
          };
          if (
            element.Subject == 'Both' &&
            element.English_mode_status != 'Baseline test' &&
            element.Mode_status != 'Test A' &&
            element.Mode_status != 'Test B' &&
            element.Mode_status != 'Test C'
          ) {
            sendWorksheetMasg = `${element.Token_no} नमस्ते आज का काम 1. मैथ्स के लिए इस लिंक को खोले-${element.planned_maths_worksheetlink} 2.इंग्लिश के लिए इससे खोले-${element.planned_english_worksheetlink} नीचे दिए गए शब्द को आपको रिकॉर्ड करना है और हमे भेजना है`;
            // mathMorningForm(mathMorningResponse);
            // englishMorningForm(englishMorningResponse);
          }

          if (
            element.Subject == 'Math' ||
            (element.Subject == 'Both' &&
              element.English_mode_status == 'Baseline test' &&
              element.Mode_status != 'Test A' &&
              element.Mode_status != 'Test B' &&
              element.Mode_status != 'Test C')
          ) {
            sendWorksheetMasg = `नमस्ते आज का काम मैथ्स के लिए इस लिंक को खोले-${element.planned_maths_worksheetlink}`;
            // mathMorningForm(mathMorningResponse);
          }
          if (
            element.Subject == 'English' ||
            (element.Subject == 'Both' &&
              (element.Mode_status == 'Test A' ||
                element.Mode_status == 'Test B' ||
                element.Mode_status == 'Test C') &&
              element.English_mode_status != 'Baseline test')
          ) {
            sendWorksheetMasg = `${element.Token_no} नमस्ते आज का काम इंग्लिश के लिए इससे खोले-${element.planned_english_worksheetlink} नीचे दिए गए शब्द को आपको रिकॉर्ड करना है और हमे भेजना है`;
            // englishMorningForm(englishMorningResponse);
          }
          const data = {
            number: `91${element.WhatsApp_no}`,
            work: `${sendWorksheetMasg}`,
          };
          await this.message.sendWorkToParent(data.number, data.work);
          // let storeData = {
          //   whatsApp_id: data.whatsApp_id,
          //   from: 'RM',
          //   to: 'Parent',
          //   text: sendWorksheetMasg,
          //   json_field: '',
          //   masgtype: 'text',
          //   message_id: id,
          //   sent_type: 'Session',
          // };
          // await insertRMSendToParentData(storeData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
