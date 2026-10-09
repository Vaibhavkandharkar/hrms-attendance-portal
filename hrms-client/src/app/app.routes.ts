import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Attendance } from './components/attendance/attendance';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'attendance', component: Attendance },
  { path: 'employees', component: EmployeeListComponent },
  { path: '**', redirectTo: 'login' } // Fallback wildcard redirect
];