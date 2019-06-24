import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

export interface Config {
    usersUrl: string;
}

@Component({
    selector: 'app-config-component',
    template: '',
})

export class ConfigComponent extends ConfigService {

    config: Config;

    showConfig() {
        this.getConfig()
            // clone the data object, using its known Config shape
            .subscribe((data: Config) => this.config = { ...data });
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
          this.configUrl, { observe: 'response' });
      }
}
