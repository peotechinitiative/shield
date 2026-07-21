import type { ViewName } from '../types';

type ViewChangeCallback = (view: ViewName) => void;

class Router {
  private currentView: ViewName = 'home';
  private listeners: ViewChangeCallback[] = [];

  onChange(cb: ViewChangeCallback): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  navigate(view: ViewName): void {
    this.currentView = view;
    this.listeners.forEach(cb => cb(view));
  }

  getCurrent(): ViewName {
    return this.currentView;
  }
}

export const router = new Router();
