import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-other-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="skills-list">
        @for (skill of section.content.skills; track skill) {
          <div class="skill-item">
            <span class="skill-icon">⭐</span>
            <span>{{ skill }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skill-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--bg-secondary);
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    .skill-item:hover {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      transform: translateX(8px);
    }
    .skill-icon {
      font-size: 20px;
    }
  `]
})
export class OtherSkillsComponent {
  @Input() section!: Section;
}

