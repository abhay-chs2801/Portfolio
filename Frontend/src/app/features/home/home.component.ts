import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Section } from '../../core/services/api.service';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { AccomplishmentsComponent } from '../accomplishments/accomplishments.component';
import { PocsComponent } from '../pocs/pocs.component';
import { OtherSkillsComponent } from '../other-skills/other-skills.component';
import { OpportunitiesComponent } from '../opportunities/opportunities.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    SkillsComponent,
    AccomplishmentsComponent,
    PocsComponent,
    OtherSkillsComponent,
    OpportunitiesComponent
  ],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Welcome to My Portfolio</h1>
          <p class="hero-subtitle">Full-Stack Developer | GenAI Enthusiast | Problem Solver</p>
        </div>
      </section>

      <div class="container">
        @if (sections.length > 0) {
          @for (section of sortedSections; track section.id) {
            <div class="section-wrapper fade-in">
              @switch (section.section_type) {
                @case ('about') {
                  <app-about [section]="section"></app-about>
                }
                @case ('skills') {
                  <app-skills [section]="section"></app-skills>
                }
                @case ('accomplishments') {
                  <app-accomplishments [section]="section"></app-accomplishments>
                }
                @case ('pocs') {
                  <app-pocs [section]="section"></app-pocs>
                }
                @case ('other_skills') {
                  <app-other-skills [section]="section"></app-other-skills>
                }
                @case ('opportunities') {
                  <app-opportunities [section]="section"></app-opportunities>
                }
                @default {
                  <div class="card">
                    <h2 class="section-title">{{ section.title }}</h2>
                    <div [innerHTML]="formatContent(section.content)"></div>
                  </div>
                }
              }
            </div>
          }
        } @else {
          <div class="loading">Loading...</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: calc(100vh - 200px);
    }
    .hero {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 80px 0;
      text-align: center;
      margin-bottom: 60px;
    }
    .hero-title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .hero-subtitle {
      font-size: 20px;
      opacity: 0.9;
    }
    .section-wrapper {
      margin-bottom: 40px;
    }
    .loading {
      text-align: center;
      padding: 60px 20px;
      font-size: 18px;
      color: var(--text-secondary);
    }
  `]
})
export class HomeComponent implements OnInit {
  sections: Section[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSections();
  }

  loadSections() {
    this.apiService.getAllSections().subscribe({
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

  formatContent(content: any): string {
    return JSON.stringify(content, null, 2);
  }
}

