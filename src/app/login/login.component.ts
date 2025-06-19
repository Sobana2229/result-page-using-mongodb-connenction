import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerNumber = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = {
      regNo: this.registerNumber,
      password: this.password
    };
  
    this.http.post<any>('http://localhost:3000/api/login', payload).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('result', JSON.stringify(res));
        this.router.navigate(['/result']); // ✅ Correct way

      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });
  }
  
  
}
