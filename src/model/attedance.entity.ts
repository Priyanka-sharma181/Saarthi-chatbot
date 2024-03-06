// attendance.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendance_rm' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'Today_Date',nullable:true })
  Today_Date: Date;

  @Column({ name: 'RM_code',nullable:true })
  RM_code: string;

  @Column({ name: 'CL_code',nullable:true })
  CL_code: string;

  @Column({ name: 'Reason',nullable:true })
  Reason: string;

  @Column({ type: 'date', name: 'Date',nullable:true })
  Date: Date;

  @Column({ name: 'Attendance' ,nullable:true})
  Attendance: string;

  @Column({ name: 'TimeStamp',nullable:true })
  TimeStamp: string;

}
