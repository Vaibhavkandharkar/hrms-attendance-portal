import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 400px; margin: 80px auto; padding: 25px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; color: #333;">HRMS Login</h2>
      <form (ngSubmit)="onLogin()">
        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold; color: #555;">Username:</label><br>
          <input type="text" [(ngModel)]="username" name="username" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>
        <div style="margin-bottom: 20px;">
          <label style="font-weight: bold; color: #555;">Password:</label><br>
          <input type="password" [(ngModel)]="password" name="password" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;" />
        </div>
        <button type="submit" style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Login</button>
      </form>
      <p style="color: red; margin-top: 15px; text-align: center;" *ngIf="errorMessage">{{ errorMessage }}</p>
      <p style="font-size: 12px; color: #666; margin-top: 20px; text-align: center;">Hint: use <b>admin / admin123</b></p>
    </div>
  `
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('Login Successful!');
        this.router.navigate(['/attendance']);
      },
      error: () => {
        this.errorMessage = 'Invalid Username or Password';
      }
    });
  }
}