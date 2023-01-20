import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroment';
import { UsersModule } from './users/users.module';
import { EmailService } from './core/email.service';
import { ExcelService } from './core/excel.service';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments.dev || '.env',
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, ExcelService],
})
export class AppModule {}
