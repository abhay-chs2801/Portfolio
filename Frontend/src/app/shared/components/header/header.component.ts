import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, Admin } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="header">
      <nav class="nav container">
        <div class="logo">
          <a routerLink="/">Portfolio</a>
        </div>
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
          @if (isAuthenticated) {
            <li><a routerLink="/admin" routerLinkActive="active">Admin</a></li>
            <li><button class="nav-button" (click)="logout()">Logout</button></li>
          } @else {
            <li>
              <a routerLink="/login" routerLinkActive="active" class="nav-link-with-icon">
                <img src="assets/icon/protection.png" alt="Admin Login" class="nav-icon" />
                <span>Admin</span>
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 20px;
    }
    .logo a {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 500;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-links a:hover,
    .nav-links a.active {
      color: var(--primary-color);
    }
    .nav-link-with-icon {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      transition: transform 0.3s ease;
    }
    .nav-links a:hover .nav-icon {
      transform: scale(1.1);
    }
    .nav-button {
      background: none;
      border: none;
      color: var(--text-primary);
      font-weight: 500;
      cursor: pointer;
      font-size: inherit;
      font-family: inherit;
      padding: 0;
      transition: color 0.3s ease;
    }
    .nav-button:hover {
      color: var(--primary-color);
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private subscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    
    const authSub = this.authService.getAdminObservable().subscribe((admin: Admin | null) => {
      this.isAuthenticated = !!admin;
    });
    this.subscriptions.add(authSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}

