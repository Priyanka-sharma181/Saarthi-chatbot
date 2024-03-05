import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';

@Injectable()
export class RmService {
  constructor(
    private readonly userService: UserService,
    private readonly message: MessageService,
  ) {
    this.sendMessageTo()
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
    let month = ("0" + (time.getMonth() + 1)).slice(-2);
    let date = ("0" + time.getDate()).slice(-2);
    let today_Date = `${year}-${month}-${date}`;
    return today_Date;
  }
  async sendMessageTo() {
    try {
      const selectRM = [];
      const today_Date = this.callTodayDate();

      const activeRMs = await this.userService.findAllActiveRMs()

      const attendanceRMs = await this.userService.findAllAttendance(today_Date)
    
     if (attendanceRMs.length > 0) {
      console.log(attendanceRMs)
        activeRMs.forEach(obj => {
          // console.log(obj)
          const foundObj = attendanceRMs.find(obj1 => obj.RM_code === obj1.RM_code);
          // console.log(foundObj);
          if (foundObj) {
            // obj.sendWS = foundObj.Attendance === 'हाँ';
            // obj.sendAttendance = foundObj.Attendance === 'नहीं';
          } else {
            // obj.sendAttendance = true;
          }
     })}
       } catch (err) {
    }
  }
}
