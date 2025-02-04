import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}identity/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}identity/register`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Just for test!
  getCurrentUserId(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<any>(`${this.baseUrl}home`, { headers });
  }
}
