// attendance.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'attendance_rm' })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'Today_Date' })
  Today_Date: Date;

  @Column({ name: 'RM_code' })
  RM_code: string;

  @Column({ name: 'CL_code' })
  CL_code: string;

  @Column({ name: 'Reason' })
  Reason: string;

  @Column({ type: 'date', name: 'Date' })
  Date: Date;

  @Column({ name: 'Attendance' })
  Attendance: string;

  @Column({ name: 'TimeStamp' })
  TimeStamp: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  numericColumn: number;

}
