import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-icon-container">
          <img src="assets/icon/admin.png" alt="Admin" class="login-icon" />
        </div>
        <h1 class="login-title">Admin Login</h1>
        <p class="login-subtitle">Enter your credentials to access the admin panel</p>
        
        @if (errorMessage) {
          <div class="error-message">
            {{ errorMessage }}
          </div>
        }
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              required
              [disabled]="loading"
              class="form-control"
              placeholder="Enter your username"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              [disabled]="loading"
              class="form-control"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            class="btn btn-primary btn-block"
            [disabled]="loading || !loginForm.valid"
          >
            @if (loading) {
              <span>Logging in...</span>
            } @else {
              <span>Login</span>
            }
          </button>
        </form>
        
        <div class="login-footer">
          <p>Only authorized administrators can access this page.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    }
    .login-card {
      background: var(--bg-card);
      border-radius: 16px;
      padding: 40px;
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 400px;
    }
    .login-icon-container {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }
    .login-icon {
      width: 80px;
      height: 80px;
      object-fit: contain;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }
    .login-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      text-align: center;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .login-subtitle {
      text-align: center;
      color: var(--text-secondary);
      margin-bottom: 32px;
      font-size: 14px;
    }
    .form-group {
      margin-bottom: 24px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-primary);
      font-size: 14px;
    }
    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
      font-family: inherit;
    }
    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    .form-control:disabled {
      background-color: var(--bg-secondary);
      cursor: not-allowed;
    }
    .btn-block {
      width: 100%;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 8px;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error-message {
      background-color: #fee2e2;
      color: #dc2626;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      border: 1px solid #fecaca;
      font-size: 14px;
    }
    .login-footer {
      margin-top: 24px;
      text-align: center;
      color: var(--text-secondary);
      font-size: 12px;
    }
  `]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';
  returnUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get return url from route parameters or default to '/admin'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    
    // If already logged in, redirect
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    if (this.loading) return;
    
    this.loading = true;
    this.errorMessage = '';
    
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    });
  }
}

