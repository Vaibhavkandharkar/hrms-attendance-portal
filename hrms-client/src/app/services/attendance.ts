import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationError, UploadResponse } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:5130/api/attendance';

  constructor(private http: HttpClient) { }

  downloadTemplate(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/template`, { responseType: 'blob' });
  }

  uploadAttendance(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<UploadResponse>(`${this.baseUrl}/upload`, formData);
  }

  retryFailedRows(correctedRows: ValidationError[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/retry-failed`, correctedRows);
  }
}