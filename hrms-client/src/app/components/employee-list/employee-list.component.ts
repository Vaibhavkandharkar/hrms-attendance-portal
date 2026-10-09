import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]> | null = null;
  errorMessage = '';
  
  showModal = false;
  isEditing = false;
  currentEmployeeId?: number;
  employeeForm: FormGroup;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      dateOfJoining: [new Date().toISOString().substring(0, 10), Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.employees$ = this.employeeService.getEmployees().pipe(
      catchError(error => {
        console.error('Error fetching employees', error);
        this.errorMessage = error.message || 'Error loading data';
        return of([]);
      })
    );
  }

  openAddModal(): void {
    this.isEditing = false;
    this.currentEmployeeId = undefined;
    this.employeeForm.reset({
      dateOfJoining: new Date().toISOString().substring(0, 10),
      isActive: true
    });
    this.showModal = true;
  }

  openEditModal(employee: Employee): void {
    this.isEditing = true;
    this.currentEmployeeId = employee.id;
    
    const dateFormatted = employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().substring(0, 10) : '';
    
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      dateOfJoining: dateFormatted,
      isActive: employee.isActive
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employeeData: Employee = this.employeeForm.value;
    
    if (this.isEditing && this.currentEmployeeId) {
      employeeData.id = this.currentEmployeeId;
      this.employeeService.updateEmployee(this.currentEmployeeId, employeeData).subscribe({
        next: () => {
          this.closeModal();
          this.loadData();
        },
        error: (err) => console.error('Error updating employee', err)
      });
    } else {
      this.employeeService.createEmployee(employeeData).subscribe({
        next: () => {
          this.closeModal();
          this.loadData();
        },
        error: (err) => console.error('Error creating employee', err)
      });
    }
  }

  deleteEmployee(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
