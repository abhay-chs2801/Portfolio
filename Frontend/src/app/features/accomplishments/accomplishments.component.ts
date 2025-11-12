import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-accomplishments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="accomplishments-list">
        @for (item of section.content.items; track item.title) {
          <div class="accomplishment-item">
            <h3 class="accomplishment-title">{{ item.title }}</h3>
            <p class="accomplishment-description">{{ item.description }}</p>
            @if (item.technologies && item.technologies.length > 0) {
              <div class="technologies">
                @for (tech of item.technologies; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .accomplishments-list {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .accomplishment-item {
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
      transition: transform 0.3s ease;
    }
    .accomplishment-item:hover {
      transform: translateX(8px);
    }
    .accomplishment-title {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text-primary);
    }
    .accomplishment-description {
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }
    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tech-tag {
      background-color: var(--primary-color);
      color: white;
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }
  `]
})
export class AccomplishmentsComponent {
  @Input() section!: Section;
}

