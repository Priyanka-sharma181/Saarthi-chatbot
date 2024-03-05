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

  async findAllActiveRMs(): Promise<RmEntity[]> {
    return this.userRepository
      .createQueryBuilder('rm')
      .distinct(true)
      .where('(rm.Status = :status) AND (rm.RM_code IN (:codes))', {
        status: 'Active',
        codes: ['9R1'],
      })
      .getMany();
  }
  async findAll(): Promise<RmEntity[]> {
    return this.userRepository.find();
  }

  async findAllAttendance(todayDate): Promise<AttendanceEntity[]> {
    return this.attendanceRepository
      .createQueryBuilder('attendance')
      .distinct(true)
      .where('attendance.Today_Date >= :todayDate', { todayDate })
      .getMany();
  }
  async saveUser(user: RmEntity): Promise<RmEntity | undefined> {
    return this.userRepository.save(user);
  }
}
