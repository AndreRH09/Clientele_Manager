import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = '';

  constructor(private http: HttpClient) { }

  private getallEmployee(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/employee/all`);
  }
}
