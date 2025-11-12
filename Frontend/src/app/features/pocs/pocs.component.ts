import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-pocs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="pocs-grid">
        @for (poc of section.content.items; track poc) {
          <div class="poc-item">
            <span class="poc-icon">🔬</span>
            <span class="poc-name">{{ poc }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .pocs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
    .poc-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--bg-secondary);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    .poc-item:hover {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    .poc-icon {
      font-size: 24px;
    }
    .poc-name {
      font-weight: 500;
    }
  `]
})
export class PocsComponent {
  @Input() section!: Section;
}

