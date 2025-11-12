import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, Section } from '../../core/services/api.service';
import { AuthService, Admin } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <div class="container">
        <div class="admin-header">
          <div>
            <h1 class="admin-title">Admin Panel</h1>
            <p class="admin-subtitle">Manage your portfolio sections</p>
          </div>
          @if (currentAdmin) {
            <div class="admin-info">
              <span class="admin-name">Logged in as: {{ currentAdmin.username }}</span>
              <button class="btn btn-secondary" (click)="logout()">Logout</button>
            </div>
          }
        </div>

        <div class="admin-actions">
          <button class="btn btn-primary" (click)="showAddForm = !showAddForm">
            {{ showAddForm ? 'Cancel' : 'Add New Section' }}
          </button>
        </div>

        @if (showAddForm) {
          <div class="card form-card">
            <h2>Add New Section</h2>
            <form (ngSubmit)="createSection()">
              <div class="form-group">
                <label>Title</label>
                <input type="text" [(ngModel)]="newSection.title" name="title" required>
              </div>
              <div class="form-group">
                <label>Section Type</label>
                <select [(ngModel)]="newSection.section_type" name="section_type" required>
                  <option value="about">About</option>
                  <option value="skills">Skills</option>
                  <option value="accomplishments">Accomplishments</option>
                  <option value="pocs">POCs</option>
                  <option value="other_skills">Other Skills</option>
                  <option value="opportunities">Opportunities</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div class="form-group">
                <label>Order</label>
                <input type="number" [(ngModel)]="newSection.order" name="order" required>
              </div>
              <div class="form-group">
                <label>Content (JSON)</label>
                <textarea [(ngModel)]="contentJson" name="content" rows="10" required></textarea>
              </div>
              <div class="form-group">
                <label>
                  <input type="checkbox" [(ngModel)]="newSection.is_active" name="is_active">
                  Active
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Create Section</button>
            </form>
          </div>
        }

        <div class="sections-list">
          @if (sections.length > 0) {
            @for (section of sortedSections; track section.id) {
              <div class="card section-card">
                <div class="section-header">
                  <div>
                    <h3>{{ section.title }}</h3>
                    <p class="section-meta">
                      Type: {{ section.section_type }} | Order: {{ section.order }} | 
                      Status: <span [class]="section.is_active ? 'active' : 'inactive'">
                        {{ section.is_active ? 'Active' : 'Inactive' }}
                      </span>
                    </p>
                  </div>
                  <div class="section-actions">
                    <button class="btn btn-secondary" (click)="editSection(section)">Edit</button>
                    <button class="btn btn-danger" (click)="deleteSection(section.id)">Delete</button>
                  </div>
                </div>
                @if (editingSection && editingSection.id === section.id) {
                  <div class="edit-form">
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" [(ngModel)]="editingSection!.title">
                    </div>
                    <div class="form-group">
                      <label>Section Type</label>
                      <select [(ngModel)]="editingSection!.section_type">
                        <option value="about">About</option>
                        <option value="skills">Skills</option>
                        <option value="accomplishments">Accomplishments</option>
                        <option value="pocs">POCs</option>
                        <option value="other_skills">Other Skills</option>
                        <option value="opportunities">Opportunities</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Order</label>
                      <input type="number" [(ngModel)]="editingSection!.order">
                    </div>
                    <div class="form-group">
                      <label>Content (JSON)</label>
                      <textarea [(ngModel)]="editingContentJson" rows="10"></textarea>
                    </div>
                    <div class="form-group">
                      <label>
                        <input type="checkbox" [(ngModel)]="editingSection!.is_active">
                        Active
                      </label>
                    </div>
                    <div class="form-actions">
                      <button class="btn btn-primary" (click)="updateSection()">Save</button>
                      <button class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
                    </div>
                  </div>
                }
              </div>
            }
          } @else {
            <div class="loading">No sections found. Create your first section!</div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: calc(100vh - 200px);
      padding: 40px 0;
    }
    .admin-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .admin-subtitle {
      font-size: 18px;
      color: var(--text-secondary);
      margin-bottom: 32px;
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .admin-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .admin-name {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .admin-actions {
      margin-bottom: 32px;
    }
    .form-card {
      margin-bottom: 32px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-primary);
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
    }
    .form-group textarea {
      font-family: 'Courier New', monospace;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .sections-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .section-card {
      padding: 24px;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    .section-header h3 {
      font-size: 24px;
      margin-bottom: 8px;
    }
    .section-meta {
      color: var(--text-secondary);
      font-size: 14px;
    }
    .active {
      color: #10b981;
      font-weight: 600;
    }
    .inactive {
      color: #ef4444;
      font-weight: 600;
    }
    .section-actions {
      display: flex;
      gap: 12px;
    }
    .edit-form {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 2px solid var(--border-color);
    }
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    .loading {
      text-align: center;
      padding: 60px 20px;
      font-size: 18px;
      color: var(--text-secondary);
    }
  `]
})
export class AdminComponent implements OnInit, OnDestroy {
  sections: Section[] = [];
  showAddForm = false;
  newSection: Partial<Section> = {
    title: '',
    section_type: 'custom',
    order: 0,
    is_active: true,
    content: {}
  };
  contentJson = '{}';
  editingSection: Partial<Section> | null = null;
  editingContentJson = '';
  currentAdmin: Admin | null = null;
  private subscriptions = new Subscription();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/admin' } });
      return;
    }

    // Get current admin
    const adminSub = this.authService.getAdminObservable().subscribe(admin => {
      this.currentAdmin = admin;
    });
    this.subscriptions.add(adminSub);

    // Verify token and load admin data
    this.authService.verifyToken().subscribe({
      next: (response) => {
        if (response.valid && response.admin) {
          this.currentAdmin = response.admin;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: '/admin' } });
        }
      },
      error: () => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: '/admin' } });
      }
    });

    this.loadSections();
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

  loadSections() {
    this.apiService.getAllSectionsAdmin().subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (error) => {
        console.error('Error loading sections:', error);
      }
    });
  }

  get sortedSections() {
    return [...this.sections].sort((a, b) => a.order - b.order);
  }

  createSection() {
    try {
      this.newSection.content = JSON.parse(this.contentJson);
      this.apiService.createSection(this.newSection).subscribe({
        next: (section) => {
          this.sections.push(section);
          this.showAddForm = false;
          this.resetForm();
          this.loadSections();
        },
        error: (error) => {
          console.error('Error creating section:', error);
          alert('Error creating section. Please check the console.');
        }
      });
    } catch (error) {
      alert('Invalid JSON format in content field');
    }
  }

  editSection(section: Section) {
    this.editingSection = { ...section };
    this.editingContentJson = JSON.stringify(section.content, null, 2);
  }

  updateSection() {
    if (!this.editingSection || !this.editingSection.id) return;

    try {
      this.editingSection.content = JSON.parse(this.editingContentJson);
      this.apiService.updateSection(this.editingSection.id, this.editingSection).subscribe({
        next: (updatedSection) => {
          const index = this.sections.findIndex(s => s.id === updatedSection.id);
          if (index !== -1) {
            this.sections[index] = updatedSection;
          }
          this.cancelEdit();
          this.loadSections();
        },
        error: (error) => {
          console.error('Error updating section:', error);
          alert('Error updating section. Please check the console.');
        }
      });
    } catch (error) {
      alert('Invalid JSON format in content field');
    }
  }

  deleteSection(id: string) {
    if (!confirm('Are you sure you want to delete this section?')) return;

    this.apiService.deleteSection(id).subscribe({
      next: () => {
        this.sections = this.sections.filter(s => s.id !== id);
        this.loadSections();
      },
      error: (error) => {
        console.error('Error deleting section:', error);
        alert('Error deleting section. Please check the console.');
      }
    });
  }

  cancelEdit() {
    this.editingSection = null;
    this.editingContentJson = '';
  }

  resetForm() {
    this.newSection = {
      title: '',
      section_type: 'custom',
      order: 0,
      is_active: true,
      content: {}
    };
    this.contentJson = '{}';
  }
}

