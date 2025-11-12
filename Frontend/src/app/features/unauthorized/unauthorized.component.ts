import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <div class="icon">🔒</div>
        <h1>Access Denied</h1>
        <p class="message">
          You don't have permission to access this page. Only authorized administrators can access the admin panel.
        </p>
        <div class="actions">
          <a routerLink="/" class="btn btn-primary">Go to Home</a>
          <a routerLink="/login" class="btn btn-secondary">Admin Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .unauthorized-card {
      background: var(--bg-card);
      border-radius: 16px;
      padding: 60px 40px;
      box-shadow: var(--shadow-lg);
      text-align: center;
      max-width: 500px;
      width: 100%;
    }
    .icon {
      font-size: 64px;
      margin-bottom: 24px;
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--text-primary);
    }
    .message {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      min-width: 150px;
    }
  `]
})
export class UnauthorizedComponent {}

