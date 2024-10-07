import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('top-customer')
  async getTopCustomer() {
    return await this.reportService.getTopCustomer();
  }
}
