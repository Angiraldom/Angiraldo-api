import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { WorkSheet, utils, WorkBook, write } from 'xlsx';

@Injectable()
export class ExcelService {
  generateExcel(users: User[]) {
    const ws: WorkSheet = utils.json_to_sheet(users);
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    const buff = write(wb, { type: 'buffer', bookType: 'xlsx' });
    return buff;
  }
}
