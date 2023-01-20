import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import configuration from '../config';

@Injectable()
export class EmailService {
  constructor(
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
  ) {}

  createTransporter() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.config.email.username,
        pass: this.config.email.password,
      },
      tls: { rejectUnauthorized: false },
    });
    return transporter;
  }

  async sendMailExcel(excelFile) {
    const transporter = this.createTransporter();
    try {
      await transporter.sendMail({
        from: `"Formulario subscripción" <${this.config.email.username}>`,
        to: this.config.email.username,
        subject: 'Formulario suscripción libro',
        text: 'Formulario suscripción libro',
        attachments: [
          {
            filename: 'Base_Datos_Libro.xlsx',
            content: excelFile,
          },
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException('Problema no controlado');
    }
  }
}
