import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConversationMessagesService {
  constructor(private http: HttpClient) {}

  getConversationMessages(participants: string[]) {
    const params = { participants };
    return this.http.post<any>(
      `${environment.api}/api/v1/messages/getConversationMessages`,
      params
    );
  }

  sendMessage(message: Message): Observable<Message> {
    const params = {
      message,
    };
    return this.http.post<any>(
      `${environment.api}/api/v1/messages/addMessage`,
      params
    );
  }

  updateMessageStatusToRead(messageId: string, receiverId: string) {
    return this.http.put<any>(
      `${environment.api}/api/v1/messages/updateMessageStatusToRead/${messageId}/${receiverId}`,
      {}
    );
  }
}
