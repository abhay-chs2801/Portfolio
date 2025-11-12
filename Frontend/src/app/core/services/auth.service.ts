import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Admin {
  id: string;
  username: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  admin: Admin;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'admin_token';
  private adminKey = 'admin_data';
  private currentAdminSubject = new BehaviorSubject<Admin | null>(this.getStoredAdmin());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        this.setToken(response.access_token);
        this.setAdmin(response.admin);
        this.currentAdminSubject.next(response.admin);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    if (token) {
      return this.http.post(`${this.apiUrl}/api/auth/logout`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).pipe(
        tap(() => {
          this.clearAuth();
        })
      );
    }
    this.clearAuth();
    return new Observable(observer => {
      observer.next({});
      observer.complete();
    });
  }

  getCurrentAdmin(): Observable<Admin> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    return this.http.get<Admin>(`${this.apiUrl}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).pipe(
      tap(admin => {
        this.setAdmin(admin);
        this.currentAdminSubject.next(admin);
      })
    );
  }

  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.next({ valid: false });
        observer.complete();
      });
    }
    return this.http.get(`${this.apiUrl}/api/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getAdmin(): Admin | null {
    return this.currentAdminSubject.value;
  }

  getAdminObservable(): Observable<Admin | null> {
    return this.currentAdminSubject.asObservable();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setAdmin(admin: Admin): void {
    localStorage.setItem(this.adminKey, JSON.stringify(admin));
  }

  private getStoredAdmin(): Admin | null {
    const adminData = localStorage.getItem(this.adminKey);
    if (adminData) {
      try {
        return JSON.parse(adminData);
      } catch {
        return null;
      }
    }
    return null;
  }

  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.adminKey);
    this.currentAdminSubject.next(null);
  }

  getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    if (token) {
      return { 'Authorization': `Bearer ${token}` };
    }
    return {};
  }
}

