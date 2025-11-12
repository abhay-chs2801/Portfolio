import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Section {
  id: string;
  title: string;
  content: any;
  section_type: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const authHeaders = this.authService.getAuthHeaders();
    return new HttpHeaders(authHeaders);
  }

  getAllSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/api/sections/`);
  }

  getSectionById(id: string): Observable<Section> {
    return this.http.get<Section>(`${this.apiUrl}/api/sections/${id}`);
  }

  getSectionsByType(type: string): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/api/sections/type/${type}`);
  }

  createSection(section: Partial<Section>): Observable<Section> {
    return this.http.post<Section>(`${this.apiUrl}/api/admin/sections`, section, {
      headers: this.getHeaders()
    });
  }

  updateSection(id: string, section: Partial<Section>): Observable<Section> {
    return this.http.put<Section>(`${this.apiUrl}/api/admin/sections/${id}`, section, {
      headers: this.getHeaders()
    });
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/admin/sections/${id}`, {
      headers: this.getHeaders()
    });
  }

  getAllSectionsAdmin(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.apiUrl}/api/admin/sections`, {
      headers: this.getHeaders()
    });
  }
}

