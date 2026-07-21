import { router } from '../utils/router';
import { HomeView } from './HomeView';
import { CheckInView } from './CheckInView';
import { LookupView } from './LookupView';
import { VaultView } from './VaultView';
import { PlaybookView } from './PlaybookView';
import { PanicView } from './PanicView';
import { BottomNav } from './BottomNav';
import type { ViewName } from '../types';

export class Shell {
  private container: HTMLElement;
  private views: Map<ViewName, HTMLElement> = new Map();
      private currentView: ViewName = 'home';
  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'shell active';
    this.container.innerHTML = `<div class="shell-views"></div>`;
    parent.appendChild(this.container);

    const viewsContainer = this.container.querySelector('.shell-views')!;

    // Initialize views
    this.views.set('home', new HomeView().render());
    this.views.set('checkin', new CheckInView().render());
    this.views.set('lookup', new LookupView().render());
    this.views.set('vault', new VaultView().render());
    this.views.set('playbook', new PlaybookView().render());
    this.views.set('panic', new PanicView().render());

    this.views.forEach((el, name) => {
      el.classList.toggle('hidden', name !== 'home');
      viewsContainer.appendChild(el);
    });

    // Bottom nav
    const nav = new BottomNav((view) => router.navigate(view));
    this.container.appendChild(nav.render());

    // Router subscription
    router.onChange((view) => this.showView(view));
  }

  private showView(view: ViewName): void {
    this.views.forEach((el, name) => {
      el.classList.toggle('hidden', name !== view);
    });
    this.currentView = view;
  }
}
