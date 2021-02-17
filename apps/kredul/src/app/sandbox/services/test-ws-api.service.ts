import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class TestWsApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) {  }

  get() {
    return this.httpClient.get<{ message: string }>(`${environment.host}/api/${environment.testWsApi}`);
  }
}
