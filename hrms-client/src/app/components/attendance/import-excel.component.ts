import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance';
import { ValidationError, UploadResponse } from '../../models/attendance.model';

@Component({
  selector: 'app-import-excel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent {
  selectedFile: File | null = null;
  isLoading: boolean = false;
  successMessage: string = '';

  // Fixed: changed '-' to '='
  failedRows: ValidationError[] = [];

  constructor(private attendanceService: AttendanceService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.failedRows = [];
    this.successMessage = ''; // Fixed: changed '-' to '='
  }

  onUpload() {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.failedRows = [];

    this.attendanceService.uploadAttendance(this.selectedFile).subscribe({
      next: (response: UploadResponse) => {
        this.isLoading = false;
        this.successMessage = response.message;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error && err.error.errors) {
          this.failedRows = err.error.errors;
        }
      }
    });
  }

  retryCorrectedRows() {
    this.isLoading = true;
    this.attendanceService.retryFailedRows(this.failedRows).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = "Corrected rows successfully processed!";
        this.failedRows = [];
      },
      error: (err) => {
        this.isLoading = false;
        alert("Some rows still have errors. Please recheck.");
      }
    });
  }
}