import { Injectable, HttpService } from '@nestjs/common';
import { ApiResponse } from './dto/response';

@Injectable()
export class TinkoffApiService {
  apiPath: string;
  constructor(private readonly httpService: HttpService) {
    this.apiPath = 'https://api.tinkoff.ru/';
  }

  get(path) {
    const url = `${this.apiPath}${path}`;
    return this.httpService.get(url);
  }

  async post(path, data): Promise<ApiResponse> {
    const url = `${this.apiPath}${path}`;
    let response;
    response = await this.httpService.post(url, data).toPromise().then(
      ({ data }) => data,
    );
    return response;
  }
}
