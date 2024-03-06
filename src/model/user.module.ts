// user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RmEntity } from './rm.entity';
import { AttendanceEntity } from './attedance.entity';
import { ParentEntity } from './parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RmEntity,AttendanceEntity,ParentEntity])], // Add TypeOrmModule.forFeature here
  providers: [UserService,AttendanceEntity,ParentEntity],
  exports: [UserService],
})
export class UserModule {}
