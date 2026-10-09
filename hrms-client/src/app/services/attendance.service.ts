import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationError, UploadResponse } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://your-dotnet-api-url/api/attendance'; // Replace with your actual .NET endpoint

  constructor(private http: HttpClient) {}

  // Existing upload method
  uploadAttendance(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
  }

  // ADD THIS METHOD: Sends the corrected rows back to the .NET backend
  retryFailedRows(correctedRows: ValidationError[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/retry-failed`, correctedRows);
  }
}