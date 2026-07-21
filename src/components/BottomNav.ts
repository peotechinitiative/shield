import type { ViewName } from '../types';

export class BottomNav {
  private onNavigate: (view: ViewName) => void;

  constructor(onNavigate: (view: ViewName) => void) {
    this.onNavigate = onNavigate;
  }

  render(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'bottom-nav';
    const items: Array<{ view: ViewName; icon: string; label: string }> = [
      { view: 'home', icon: '🏠', label: 'Home' },
      { view: 'checkin', icon: '📍', label: 'Check-in' },
      { view: 'vault', icon: '🔒', label: 'Vault' },
      { view: 'playbook', icon: '📋', label: 'Guide' }
    ];

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'nav-item';
      div.dataset.view = item.view;
      div.innerHTML = `<div class="nav-icon">${item.icon}</div>${item.label}`;
      div.addEventListener('click', () => this.onNavigate(item.view));
      el.appendChild(div);
    });

    // Highlight active
    const updateActive = (view: ViewName) => {
      el.querySelectorAll('.nav-item').forEach(n => {
        n.classList.toggle('active', (n as HTMLElement).dataset.view === view);
      });
    };

    // Listen for view changes via a custom event
    document.addEventListener('viewchange', ((e: CustomEvent<ViewName>) => {
      updateActive(e.detail);
    }) as EventListener);

    return el;
  }
}
