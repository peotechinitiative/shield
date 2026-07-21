import type { GeoPosition } from '../services/location';

export class LiveMap {
  private container: HTMLElement;
 private mapEl: HTMLElement | null = null;
  private dotEl: HTMLElement;
  private trailEl: HTMLElement;
  private positions: GeoPosition[] = [];
  private center: GeoPosition | null = null;

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'live-map';
    this.container.innerHTML = `
      <div class="map-header">
        <div class="map-pulse"></div>
        <span class="map-status">Live location sharing</span>
      </div>
      <div class="map-canvas">
        <div class="map-grid"></div>
        <div class="map-trail"></div>
        <div class="map-dot"></div>
        <div class="map-accuracy"></div>
      </div>
      <div class="map-coords"></div>
    `;
    parent.appendChild(this.container);
    this.mapEl = this.container.querySelector('.map-canvas')!;
    this.dotEl = this.container.querySelector('.map-dot')!;
    this.trailEl = this.container.querySelector('.map-trail')!;
  }

  updatePosition(pos: GeoPosition): void {
    this.positions.push(pos);
    if (this.positions.length > 50) this.positions.shift();
    if (!this.center) this.center = pos;

    // Relative positioning (simplified canvas)
    const scale = 200000; // meters to pixels roughly
    const dx = ((pos.lng - this.center.lng) * scale).toFixed(1);
    const dy = ((this.center.lat - pos.lat) * scale).toFixed(1);

    this.dotEl.style.transform = `translate(${dx}px, ${dy}px)`;

    // Accuracy circle
    const accuracyEl = this.container.querySelector('.map-accuracy') as HTMLElement;
    const radiusPx = Math.min(Math.max(pos.accuracy / 2, 8), 60);
    accuracyEl.style.width = `${radiusPx * 2}px`;
    accuracyEl.style.height = `${radiusPx * 2}px`;
    accuracyEl.style.transform = `translate(${dx}px, ${dy}px)`;

    // Coords display
    const coordsEl = this.container.querySelector('.map-coords')!;
    coordsEl.textContent = `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)} · ±${Math.round(pos.accuracy)}m`;

    // Trail
    this.renderTrail();
  }

  private renderTrail(): void {
    if (!this.center || this.positions.length < 2) return;
    const scale = 200000;
    const points = this.positions.map(p => {
      const x = (p.lng - this.center!.lng) * scale;
      const y = (this.center!.lat - p.lat) * scale;
      return `${x},${y}`;
    }).join(' ');
    this.trailEl.innerHTML = `<svg width="100%" height="100%" viewBox="-100 -100 200 200"><polyline points="${points}" fill="none" stroke="#c98a3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/></svg>`;
  }

  destroy(): void {
    this.container.remove();
  }
}
