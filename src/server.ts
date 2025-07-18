import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:5000/api/login'; // Change to your backend API endpoint

  constructor(private http: HttpClient) {}

  getResult(registerNumber: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { registerNumber, password });
  }
}
