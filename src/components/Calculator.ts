export type Operator = '+' | '-' | '×' | '÷';

export class Calculator {
  private display = '0';
  private firstValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForSecond = false;
  private lastKeyWasEquals = false;
  private keyLog = '';           // Tracks ALL keys: digits + operators + equals
  private container: HTMLElement;
  private onUnlockAttempt: (keyLog: string) => Promise<boolean>;
  private errorTimeout: ReturnType<typeof setTimeout> | null = null;
  private displayEl: HTMLElement | null = null;

  constructor(
    app: HTMLElement,
    onUnlockAttempt: (keyLog: string) => Promise<boolean>
  ) {
    this.container = app;
    this.onUnlockAttempt = onUnlockAttempt;
    this.render();
    this.attachListeners();
  }

  // ─────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────

  input(key: string): void {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }

    if (key === 'C') {
      this.clear();
      return;
    }

    if (key === '=') {
      await this.inputEquals();
      return;
    }

    if (['+', '-', '×', '÷'].includes(key)) {
      this.inputOperator(key as Operator);
      return;
    }

    if (/^[0-9.]$/.test(key)) {
      this.inputDigit(key);
      return;
    }
  }

  getDisplay(): string {
    return this.display;
  }

  clear(): void {
    this.display = '0';
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.lastKeyWasEquals = false;
    this.keyLog = '';
    this.updateDisplay();
  }

  destroy(): void {
    this.container.innerHTML = '';
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  // ─────────────────────────────────────────────
  // UNLOCK LOGIC (SECURITY)
  // ─────────────────────────────────────────────

  private async checkUnlock(): Promise<void> {
    const wasHandled = await this.onUnlockAttempt(this.keyLog);

    if (!wasHandled && this.keyLog.length >= 12) {
      // Wrong code: show error briefly, then reset
      this.display = 'Error';
      this.updateDisplay();
      this.errorTimeout = setTimeout(() => {
        this.keyLog = '';
        this.display = '0';
        this.updateDisplay();
      }, 800);
    }
  }

  // ─────────────────────────────────────────────
  // INPUT HANDLERS
  // ─────────────────────────────────────────────

  private inputDigit(d: string): void {
    if (this.waitingForSecond) {
      this.display = d;
      this.waitingForSecond = false;
    } else {
      this.display = (this.display === '0' && d !== '.') ? d : this.display + d;
    }

    this.keyLog += d;
    this.lastKeyWasEquals = false;
    this.checkUnlock();
    this.updateDisplay();
  }

  private inputOperator(op: Operator): void {
    const current = parseFloat(this.display);

    if (this.firstValue === null) {
      this.firstValue = current;
    } else if (this.operator && !this.waitingForSecond) {
      const result = this.calculate(this.firstValue, current, this.operator);
      this.display = String(result);
      this.firstValue = result;
    } else {
      this.firstValue = current;
    }

    this.operator = op;
    this.waitingForSecond = true;
    this.keyLog += op;
    this.lastKeyWasEquals = false;
    this.checkUnlock();
    this.updateDisplay();
  }

  private async inputEquals(): Promise<void> {
    if (this.firstValue === null || this.operator === null) {
      this.keyLog += '=';
      await this.checkUnlock();
      return;
    }

    const secondValue = parseFloat(this.display);
    const result = this.calculate(this.firstValue, secondValue, this.operator);

    this.display = String(result);
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecond = true;
    this.keyLog += '=';
    this.lastKeyWasEquals = true;
    await this.checkUnlock();
    this.updateDisplay();
  }

  // ─────────────────────────────────────────────
  // CALCULATION
  // ─────────────────────────────────────────────

  private calculate(a: number, b: number, op: Operator): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : NaN;
      default: return b;
    }
  }

  // ─────────────────────────────────────────────
  // RENDERING
  // ─────────────────────────────────────────────

  private render(): void {
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'calculator-container';
    wrapper.innerHTML = `
      <div class="calculator-body">
        <div class="calc-display" id="calc-display">0</div>
        <div class="calc-buttons">
          <button data-key="C" class="btn-clear">C</button>
          <button data-key="÷" class="btn-op">÷</button>
          <button data-key="×" class="btn-op">×</button>
          <button data-key="-" class="btn-op">−</button>

          <button data-key="7">7</button>
          <button data-key="8">8</button>
          <button data-key="9">9</button>
          <button data-key="+" class="btn-op">+</button>

          <button data-key="4">4</button>
          <button data-key="5">5</button>
          <button data-key="6">6</button>
          <button data-key="=" class="btn-equals" style="grid-row: span 2;">=</button>

          <button data-key="1">1</button>
          <button data-key="2">2</button>
          <button data-key="3">3</button>

          <button data-key="0" style="grid-column: span 2;">0</button>
          <button data-key=".">.</button>
        </div>
      </div>
      <p class="calc-footer">Calculator v1.0</p>
    `;

    this.container.appendChild(wrapper);
    this.displayEl = wrapper.querySelector('#calc-display');
  }

  private attachListeners(): void {
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const key = target.dataset.key;
      if (key) this.input(key);
    });
  }

  private updateDisplay(): void {
    if (this.displayEl) {
      this.displayEl.textContent = this.display;
    }
  }
}