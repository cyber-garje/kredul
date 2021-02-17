import { Component } from '@angular/core';
import { TestWsApiService } from './sandbox/services/test-ws-api.service';

@Component({
  selector: 'kredul-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My fabulous APP';

  apiMessage = '';

  constructor(
    private readonly testWsApiService: TestWsApiService
  ) {
    this.testWsApiService.get()
      .subscribe((value) => this.apiMessage = value.message);

  }

}
