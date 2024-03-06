// parent.entity.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'parent_db' })
export class ParentEntity {
  @PrimaryColumn({ type: 'varchar', length: 7  })
  Token_no: string;

  @Column({ type: 'varchar', length: 100 ,nullable:true})
  Student_name: string;

  @Column({ type: 'varchar', length: 8 ,nullable:true})
  Parent_status: string;

  @Column({ type: 'varchar', length: 50 ,nullable:true})
  Class: string;

  @Column({ type: 'date' ,nullable:true })
  Joining_date: Date;

  @Column({ type: 'varchar', length: 15 ,nullable:true})
  School_type: string;

  @Column({ type: 'varchar', length: 23,nullable:true })
  Dropout_date: string;

  @Column({ type: 'varchar', length: 23 ,nullable:true})
  DOB: string;

  @Column({ type: 'varchar', length: 100 ,nullable:true})
  Mother_name: string;

  @Column({ type: 'int' ,nullable:true})
  CL_code: number;

  @Column({ type: 'varchar', length: 5 ,nullable:true})
  RM_code: string;

  @Column({ type: 'varchar', length: 15 ,nullable:true})
  School_fee: string;

  @Column({ type: 'varchar', length: 200 ,nullable:true})
  Address: string;

  @Column({ type: 'varchar', length: 10 ,nullable:true})
  Calling_no: string;

  @Column({ type: 'varchar', length: 12 ,nullable:true})
  WhatsApp_no: string;

  @Column({ type: 'varchar', length: 23 ,nullable:true})
  End_date: string;

  @Column({ type: 'int',nullable:true })
  Lifetime: number;

  @Column({ type: 'int',nullable:true })
  Worksheet_no: number;

  @Column({ type: 'varchar', length: 20 })
  Label: string;

  @Column({ type: 'varchar', length: 30 })
  MCB: string;

  @Column({ type: 'varchar', length: 45 })
  tempRM: string;

  @Column({ type: 'varchar', length: 45 })
  Mode_status: string;

  @Column({ type: 'varchar', length: 45 })
  Subject: string;

  @Column({ type: 'int' })
  English_worksheet_no: number;

  @Column({ type: 'varchar', length: 45 })
  English_label: string;

  @Column({ type: 'varchar', length: 45 })
  English_mode_status: string;

  @Column({ type: 'varchar', length: 45 })
  Sub_community: string;

  @Column({ type: 'varchar', length: 45 })
  Content_version: string;

  @Column({ type: 'varchar', length: 45 })
  Plan_type: string;

  @Column({ type: 'varchar', length: 45 })
  Basic_fee: string;

  @Column({ type: 'date' })
  Next_due_date: Date;

  @Column({ type: 'date' })
  maths_morning_status: Date;

  @Column({ type: 'date' })
  english_morning_status: Date;

  @Column({ type: 'date' })
  maths_evening_status: Date;

  @Column({ type: 'date' })
  english_evening_status: Date;

  @Column({ type: 'varchar', length: 20 })
  maths_marks: string;

  @Column({ type: 'varchar', length: 20 })
  english_marks: string;

  @Column({ type: 'int' })
  sent_maths_worksheet_no: number;

  @Column({ type: 'int' })
  sent_maths_label: number;

  @Column({ type: 'varchar', length: 45 })
  Previous_maths_mode_status: string;

  @Column({ type: 'int' })
  sent_english_worksheet_no: number;

  @Column({ type: 'varchar', length: 50 })
  sent_english_label: string;

  @Column({ type: 'varchar', length: 45 })
  Previous_english_mode_status: string;

  @Column({ type: 'varchar', length: 500 })
  sent_maths_worksheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  sent_maths_answersheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  sent_english_worksheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  sent_english_answersheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  planned_maths_worksheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  planned_maths_answersheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  planned_english_worksheetlink: string;

  @Column({ type: 'varchar', length: 500 })
  planned_english_answersheetlink: string;

  @Column({ type: 'varchar', length: 100 })
  visit_status: string;

  @Column({ type: 'date' })
  visit_status_date: Date;

  @Column({ type: 'varchar', length: 45 })
  student_status_maths: string;

  @Column({ type: 'varchar', length: 45 })
  student_status_english: string;
}
