import { Controller, Get } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';

@Controller('external-api')
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get('fetch-data')
  async fetchData() {
    return await this.externalApiService.getDataFromExternalApi();
  }
}
