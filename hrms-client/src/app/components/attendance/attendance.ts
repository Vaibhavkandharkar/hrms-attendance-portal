import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../services/attendance';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  template: `
      <div style="min-height: 100vh; background: #0b0f19; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; align-items: center; justify-content: center;">
      <div style="width: 100%; max-width: 650px; background: #1e293b; border-radius: 12px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); overflow: hidden; border: 1px solid #334155;">
        
       <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white; padding: 25px 30px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 600;">Attendance Management</h2>
          <p style="margin: 6px 0 0 0; color: #93c5fd; font-size: 13px;">Manage employee attendance records seamlessly via Excel sheets.</p>
        </div>

        <div style="padding: 30px;">
          
       <!-- Step 1: Download Section -->
          <div style="display: flex; align-items: center; justify-content: space-between; background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <div>
              <h4 style="margin: 0 0 4px 0; color: #f8fafc; font-size: 15px; font-weight: 600;">1. Download Template</h4>
              <p style="margin: 0; color: #94a3b8; font-size: 13px;">Get the pre-formatted Excel template for tracking.</p>
            </div>
            <button (click)="download()" style="padding: 10px 16px; background: #059669; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
              📥 Download Excel
            </button>
          </div>

          <!-- Step 2: Upload Section -->
          <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 6px 0; color: #f8fafc; font-size: 15px; font-weight: 600;">2. Upload Filled Attendance File</h4>
            <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 13px;">Select your updated .xlsx file to process and import records.</p>
            
            <div style="display: flex; gap: 12px; align-items: center;">
              <input type="file" (change)="onFileSelected($event)" accept=".xlsx" style="flex: 1; padding: 8px; border: 1px dashed #475569; border-radius: 6px; background: #1e293b; color: #cbd5e1; cursor: pointer;" />
              <button (click)="upload()" style="padding: 10px 18px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
                📤 Upload & Process
              </button>
            </div>
          </div>

         <!-- Alert Feedback Box -->
          <div *ngIf="message" style="margin-top: 20px; padding: 14px; background: #064e3b; border: 1px solid #059669; color: #a7f3d0; border-radius: 6px; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 10px;">
            <span>✨</span> {{ message }}
          </div>

        </div>
      </div>
    </div>
  `
})
export class Attendance {
  selectedFile: File | null = null;
  message = '';

  constructor(private attendanceService: AttendanceService) {}

  download() {
    this.attendanceService.downloadTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Attendance_Template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('Failed to download template.');
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) {
      alert('Please select an Excel file first.');
      return;
    }

    this.attendanceService.uploadAttendance(this.selectedFile).subscribe({
      next: (res) => {
        this.message = res.message || 'Attendance uploaded and processed successfully!';
      },
      error: () => {
        alert('Failed to upload attendance file.');
      }
    });
  }
}