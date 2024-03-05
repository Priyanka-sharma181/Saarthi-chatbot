import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AttendanceEntity } from 'src/model/attedance.entity';
import { RmEntity } from 'src/model/rm.entity';
dotenv.config();
console.log( process.env.DATABASE_NAME)
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [RmEntity,AttendanceEntity],
  synchronize: true,
};

