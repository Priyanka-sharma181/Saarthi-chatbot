import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RmEntity } from './rm.entity';
import { AttendanceEntity } from './attedance.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RmEntity)
    private userRepository: Repository<RmEntity>,
    @InjectRepository(AttendanceEntity)
    private attendanceRepository: Repository<AttendanceEntity>
  ) {}
  async findAll(): Promise<RmEntity[]> {
    return this.userRepository.find();
  }
  async findAllActiveRMs(): Promise<RmEntity[]> {
    return this.userRepository
    .createQueryBuilder('rm')
    .where("rm.Status = 'Active'")
    .andWhere("rm.RM_code IN (:...codes)", { codes: ['9R1'] })
    .getMany();
  }
  
  async findRM(data): Promise<RmEntity[]> {
    return this.userRepository
      .createQueryBuilder('rm')
      .where('rm.Status = :status', { status: 'Active' })
      .andWhere('rm.Phone_Number = :phoneNumber', { phoneNumber: data.whatsApp_id })
      .andWhere('rm.RM_code IN (:...codes)', { codes: ['9R9', '9R10', '9R7'] })
      .getMany();
  }
  
  async findAllAttendance(todayDate): Promise<AttendanceEntity[]> {
    const distinctAttendances = await this.attendanceRepository
    .createQueryBuilder('attendance')
    .distinct(true)
    .where('attendance.Today_Date >= :todayDate', { todayDate })
    .getMany();
  return distinctAttendances;
  }
  async saveUser(user: RmEntity): Promise<RmEntity | undefined> {
    return this.userRepository.save(user);
  }
}
