import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="skills-grid">
        @if (section.content.programming_languages) {
          <div class="skill-category">
            <h3>Programming Languages</h3>
            <div class="skill-tags">
              @for (skill of section.content.programming_languages; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.frameworks) {
          <div class="skill-category">
            <h3>Frameworks</h3>
            <div class="skill-tags">
              @for (skill of section.content.frameworks; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.genai_frameworks) {
          <div class="skill-category">
            <h3>GenAI Frameworks</h3>
            <div class="skill-tags">
              @for (skill of section.content.genai_frameworks; track skill) {
                <span class="skill-tag skill-tag-genai">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.databases) {
          <div class="skill-category">
            <h3>Databases</h3>
            <div class="skill-tags">
              @for (skill of section.content.databases; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.tools) {
          <div class="skill-category">
            <h3>Tools</h3>
            <div class="skill-tags">
              @for (skill of section.content.tools; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.cicd) {
          <div class="skill-category">
            <h3>CI/CD</h3>
            <div class="skill-tags">
              @for (skill of section.content.cicd; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.devops) {
          <div class="skill-category">
            <h3>DevOps</h3>
            <div class="skill-tags">
              @for (skill of section.content.devops; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.containerization) {
          <div class="skill-category">
            <h3>Containerization</h3>
            <div class="skill-tags">
              @for (skill of section.content.containerization; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.data_processing) {
          <div class="skill-category">
            <h3>Data Processing</h3>
            <div class="skill-tags">
              @for (skill of section.content.data_processing; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.other) {
          <div class="skill-category">
            <h3>Other</h3>
            <div class="skill-tags">
              @for (skill of section.content.other; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
          </div>
        }
        @if (section.content.familiarity) {
          <div class="skill-category">
            <h3>Familiarity</h3>
            <div class="skill-tags">
              @for (skill of section.content.familiarity; track skill) {
                <span class="skill-tag skill-tag-familiarity">{{ skill }}</span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      gap: 32px;
    }
    .skill-category h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--text-primary);
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .skill-tag {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      transition: transform 0.2s ease;
    }
    .skill-tag:hover {
      transform: scale(1.05);
    }
    .skill-tag-genai {
      background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
    }
    .skill-tag-familiarity {
      background: var(--text-secondary);
      opacity: 0.8;
    }
  `]
})
export class SkillsComponent {
  @Input() section!: Section;
}

