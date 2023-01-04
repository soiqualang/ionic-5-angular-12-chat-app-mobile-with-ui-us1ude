import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketProvider extends Socket {
  constructor() {
    super({
      url: `${environment.api}/conversation`,
      options: {
        query: {
          token: localStorage.getItem('chatToken'),
        },
      },
    });
  }
}
