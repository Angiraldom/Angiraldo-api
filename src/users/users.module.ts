import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controller/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UsersService } from './service/users.service';
import { ExcelService } from 'src/core/excel.service';
import { EmailService } from 'src/core/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, EmailService, ExcelService],
})
export class UsersModule {}
