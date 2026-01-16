import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(payload: { to: string; subject: string; html: string }) {
    return this.http.post('/api/send-email', payload);
  }
}
