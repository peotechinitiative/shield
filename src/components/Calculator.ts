import type { Operator } from '../types';

// const SECRET_CODE = '2468';
export class Calculator {
  private display = '0';
  private firstOperand: number | null = null;
  private operator: Operator | null = null;
  private waitingForSecond = false;
  private digitLog = '';
  private lastKeyWasEquals = false;
  private onUnlock: () => void;
  private displayEl: HTMLElement;
  private container: HTMLElement;

  constructor(parent: HTMLElement, onUnlock: () => void) {
    this.onUnlock = onUnlock;
    this.container = document.createElement('div');
    this.container.id = 'disguise';
    this.container.innerHTML = this.getHTML();
    parent.appendChild(this.container);
    this.displayEl = this.container.querySelector('#calcDisplay')!;
    this.bindEvents();
  }

  private getHTML(): string {
    return `
      <div class="calc-display" id="calcDisplay">0</div>
      <div class="calc-grid">
        <button class="calc-key fn" data-fn="clear">C</button>
        <button class="calc-key fn" data-fn="sign">±</button>
        <button class="calc-key fn" data-fn="percent">%</button>
        <button class="calc-key op" data-op="÷">÷</button>
        <button class="calc-key num" data-num="7">7</button>
        <button class="calc-key num" data-num="8">8</button>
        <button class="calc-key num" data-num="9">9</button>
        <button class="calc-key op" data-op="×">×</button>
        <button class="calc-key num" data-num="4">4</button>
        <button class="calc-key num" data-num="5">5</button>
        <button class="calc-key num" data-num="6">6</button>
        <button class="calc-key op" data-op="−">−</button>
        <button class="calc-key num" data-num="1">1</button>
        <button class="calc-key num" data-num="2">2</button>
        <button class="calc-key num" data-num="3">3</button>
        <button class="calc-key op" data-op="+">+</button>
        <button class="calc-key num zero" data-num="0">0</button>
        <button class="calc-key num" data-num=".">.</button>
        <button class="calc-key op" data-fn="equals">=</button>
      </div>
    `;
  }

  private bindEvents(): void {
    this.container.querySelectorAll<HTMLButtonElement>('.calc-key[data-num]').forEach(btn => {
      btn.addEventListener('click', () => this.inputDigit(btn.dataset.num!));
    });
    this.container.querySelectorAll<HTMLButtonElement>('.calc-key[data-op]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.inputOperator(btn.dataset.op as Operator);
        this.render();
      });
    });
    this.container.querySelector<HTMLButtonElement>('[data-fn="clear"]')!.addEventListener('click', () => this.clearAll());
    this.container.querySelector<HTMLButtonElement>('[data-fn="sign"]')!.addEventListener('click', () => {
      this.display = String(parseFloat(this.display) * -1);
      this.render();
    });
    this.container.querySelector<HTMLButtonElement>('[data-fn="percent"]')!.addEventListener('click', () => {
      this.display = String(parseFloat(this.display) / 100);
      this.render();
    });
    this.container.querySelector<HTMLButtonElement>('[data-fn="equals"]')!.addEventListener('click', () => {
      if (this.lastKeyWasEquals) {
        this.onUnlock();
        return;
      }
      this.compute();
      this.digitLog = '';
      this.render();
      this.lastKeyWasEquals = true;
    });
  }

  private inputDigit(d: string): void {
    if (this.waitingForSecond) {
      this.display = d;
      this.waitingForSecond = false;
    } else {
      this.display = (this.display === '0' && d !== '.') ? d : this.display + d;
    }
    this.digitLog += d;
    this.lastKeyWasEquals = false;
    this.render();
  }

  private inputOperator(op: Operator): void {
    if (this.operator && !this.waitingForSecond) {
      this.compute();
    }
    this.firstOperand = parseFloat(this.display);
    this.operator = op;
    this.waitingForSecond = true;
    this.digitLog = '';
    this.lastKeyWasEquals = false;
  }

  private compute(): void {
    if (this.operator === null) return;
    const second = parseFloat(this.display);
    let result = second;
    switch (this.operator) {
      case '+': result = this.firstOperand! + second; break;
      case '−': result = this.firstOperand! - second; break;
      case '×': result = this.firstOperand! * second; break;
      case '÷': result = second === 0 ? 0 : this.firstOperand! / second; break;
    }
    this.display = String(Math.round(result * 1e8) / 1e8);
    this.operator = null;
  }

  private clearAll(): void {
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.digitLog = '';
    this.lastKeyWasEquals = false;
    this.render();
  }

  private render(): void {
    this.displayEl.textContent = this.display;
  }

  destroy(): void {
    this.container.remove();
  }
}
