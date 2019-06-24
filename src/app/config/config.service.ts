import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  constructor(public http: HttpClient) { }

  configUrl = 'assets/config.json';

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
