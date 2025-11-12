import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--text-primary);
      color: white;
      padding: 2rem 0;
      text-align: center;
      margin-top: 4rem;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

