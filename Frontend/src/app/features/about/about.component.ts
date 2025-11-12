import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Section } from '../../core/services/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2 class="section-title">{{ section.title }}</h2>
      <p class="description">{{ section.content.description }}</p>
      <ul class="highlights">
        @for (highlight of section.content.highlights; track highlight) {
          <li>{{ highlight }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .description {
      font-size: 16px;
      line-height: 1.8;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
    .highlights {
      list-style: none;
      padding: 0;
    }
    .highlights li {
      padding: 12px 0;
      padding-left: 24px;
      position: relative;
      color: var(--text-primary);
    }
    .highlights li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }
  `]
})
export class AboutComponent {
  @Input() section!: Section;
}

