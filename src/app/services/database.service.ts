import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://localhost:8080/besant_form';

  constructor(private http: HttpClient) {}

  insertData(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.apiUrl, data);
  }

  getDataByMobile(mobile: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?mobile=${mobile}`);

  }
}


