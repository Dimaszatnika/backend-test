import { Injectable, HttpService } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalApiService {
  constructor(private readonly httpService: HttpService) {}

  async getDataFromExternalApi() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Contoh API
    try {
      const response = await firstValueFrom(this.httpService.get(apiUrl));
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data from external API');
    }
  }
}
