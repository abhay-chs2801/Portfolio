import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="opportunities-list">
        @for (area of section.content.areas; track area) {
          <div class="opportunity-item">
            <span class="opportunity-icon">🚀</span>
            <span class="opportunity-text">{{ area }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .opportunities-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .opportunity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
      border-radius: 12px;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }
    .opportunity-item:hover {
      border-color: var(--primary-color);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    .opportunity-icon {
      font-size: 28px;
    }
    .opportunity-text {
      font-size: 18px;
      font-weight: 500;
      color: var(--text-primary);
    }
  `]
})
export class OpportunitiesComponent {
  @Input() section!: Section;
}

