import { Controller, Post } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('save')
  async saveData() {
    return await this.dataService.saveData();
  }
}
