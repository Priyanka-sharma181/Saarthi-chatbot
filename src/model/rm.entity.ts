// rm.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'rm_db' })
export class RmEntity {
  @PrimaryGeneratedColumn({ name: 'S_no' })
  S_no: number;

  @Column({ name: 'RM_code', length: 6 ,nullable:true})
  RM_code: string;

  @Column({ name: 'RM_Name', length: 15 ,nullable:true})
  RM_Name: string;

  @Column({ name: 'Status', length: 8,nullable:true })
  Status: string;

  @Column({ name: 'Start_Date', type: 'date' ,nullable:true})
  Start_Date: Date;

  @Column({ name: 'End_Date', type: 'date' ,nullable:true})
  End_Date: Date;

  @Column({ name: 'Phone_Number', length: 10 ,nullable:true})
  Phone_Number: string;

  @Column({ name: 'Address', length: 100 ,nullable:true})
  Address: string;

  @Column({ name: 'Reasons_for_Leaving', length: 50 ,nullable:true})
  Reasons_for_Leaving: string;

  @Column({ name: 'CL_Code' ,nullable:true})
  CL_Code: number;

  @Column({ name: 'RM_password', length: 45,nullable:true })
  RM_password: string;
}
