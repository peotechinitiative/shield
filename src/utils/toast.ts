export function toast(message: string, duration = 2200): void {
  let el = document.getElementById('global-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-toast';
    el.style.cssText = `
      position: fixed; left: 18px; right: 18px; bottom: 96px;
      background: #132436; color: #fff; padding: 12px 16px;
      border-radius: 12px; font-size: 13px; text-align: center;
      opacity: 0; transform: translateY(10px);
      transition: all .25s ease; pointer-events: none; z-index: 50;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    `;
    document.body.appendChild(el);
  }
  el.textContent = message;
  // Force reflow
  void el.offsetWidth;
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  setTimeout(() => {
    el!.style.opacity = '0';
    el!.style.transform = 'translateY(10px)';
  }, duration);
}
