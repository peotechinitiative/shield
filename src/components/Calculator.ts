export type Operator = '+' | '-' | '*' | '/';

export class Calculator {
  private display = '0';
  private firstValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForSecond = false;
  private lastKeyWasEquals = false;
  private keyLog = '';
  private container: HTMLElement;
  private onUnlockAttempt: (keyLog: string) => Promise<boolean>;
  private errorTimeout: ReturnType<typeof setTimeout> | null = null;
  private displayEl: HTMLElement | null = null;
  private isScientific = false;
  private clickHandler: ((e: Event) => void) | null = null;

  constructor(
    app: HTMLElement,
    onUnlockAttempt: (keyLog: string) => Promise<boolean>
  ) {
    this.container = app;
    this.onUnlockAttempt = onUnlockAttempt;
    this.render();
    this.attachListeners();
  }

  // PUBLIC API

  async input(key: string): Promise<void> {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }

    if (key === 'C') {
      this.clear();
      return;
    }

    if (key === 'AC') {
      this.allClear();
      return;
    }

    if (key === '=') {
      await this.inputEquals();
      return;
    }

    if (key === 'SCI') {
      this.toggleScientific();
      return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
      this.inputOperator(key as Operator);
      return;
    }

    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x2', '1/x', 'pi', 'e', '%', 'pm'].includes(key)) {
      this.inputScientific(key);
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

  allClear(): void {
    this.clear();
  }

  destroy(): void {
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
    }
    this.container.innerHTML = '';
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  // UNLOCK LOGIC (SECURITY)

  private async checkUnlock(): Promise<void> {
    const wasHandled = await this.onUnlockAttempt(this.keyLog);

    if (!wasHandled && this.keyLog.length >= 12) {
      this.display = 'Error';
      this.updateDisplay();
      this.errorTimeout = setTimeout(() => {
        this.keyLog = '';
        this.display = '0';
        this.updateDisplay();
      }, 800);
    }
  }

  // INPUT HANDLERS

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

  private inputScientific(func: string): void {
    const current = parseFloat(this.display);
    let result = current;

    switch (func) {
      case 'sin':
        result = Math.sin(current * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(current * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(current * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case 'x2':
        result = current * current;
        break;
      case '1/x':
        result = 1 / current;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '%':
        result = current / 100;
        break;
      case 'pm':
        result = -current;
        break;
    }

    this.display = String(result);
    this.waitingForSecond = true;
    this.updateDisplay();
  }

  private toggleScientific(): void {
    this.isScientific = !this.isScientific;
    this.render();
    this.attachListeners();
  }

  // CALCULATION

  private calculate(a: number, b: number, op: Operator): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : NaN;
      default: return b;
    }
  }

  // RENDERING

  private render(): void {
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
    }
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'calculator-container';

    const scientificButtons = this.isScientific ? `
      <div class="sci-row">
        <button data-key="sin" class="btn-sci">sin</button>
        <button data-key="cos" class="btn-sci">cos</button>
        <button data-key="tan" class="btn-sci">tan</button>
        <button data-key="log" class="btn-sci">log</button>
      </div>
      <div class="sci-row">
        <button data-key="ln" class="btn-sci">ln</button>
        <button data-key="sqrt" class="btn-sci">sqrt</button>
        <button data-key="x2" class="btn-sci">x2</button>
        <button data-key="1/x" class="btn-sci">1/x</button>
      </div>
      <div class="sci-row">
        <button data-key="pi" class="btn-sci">pi</button>
        <button data-key="e" class="btn-sci">e</button>
        <button data-key="%" class="btn-sci">%</button>
        <button data-key="pm" class="btn-sci">+/-</button>
      </div>
    ` : '';

    wrapper.innerHTML = `
      <div class="calculator-body">
        <div class="calc-display" id="calc-display">0</div>

        <div class="calc-buttons">
          <div class="btn-row">
            <button data-key="SCI" class="btn-sci-toggle">${this.isScientific ? 'BASIC' : 'SCI'}</button>
            <button data-key="C" class="btn-gray">C</button>
            <button data-key="pm" class="btn-gray">+/-</button>
            <button data-key="/" class="btn-orange">&divide;</button>
          </div>

          ${scientificButtons}

          <div class="btn-row">
            <button data-key="7" class="btn-dark">7</button>
            <button data-key="8" class="btn-dark">8</button>
            <button data-key="9" class="btn-dark">9</button>
            <button data-key="*" class="btn-orange">&times;</button>
          </div>

          <div class="btn-row">
            <button data-key="4" class="btn-dark">4</button>
            <button data-key="5" class="btn-dark">5</button>
            <button data-key="6" class="btn-dark">6</button>
            <button data-key="-" class="btn-orange">-</button>
          </div>

          <div class="btn-row">
            <button data-key="1" class="btn-dark">1</button>
            <button data-key="2" class="btn-dark">2</button>
            <button data-key="3" class="btn-dark">3</button>
            <button data-key="+" class="btn-orange">+</button>
          </div>

          <div class="btn-row">
            <button data-key="0" class="btn-dark btn-zero">0</button>
            <button data-key="." class="btn-dark">.</button>
            <button data-key="=" class="btn-orange">=</button>
          </div>
        </div>
      </div>
      <p class="calc-footer">Calculator v1.0</p>
    `;

    this.container.appendChild(wrapper);
    this.displayEl = wrapper.querySelector('#calc-display');
    if (this.displayEl) {
      this.displayEl.textContent = this.display;
    }
  }

  private attachListeners(): void {
    this.clickHandler = async (e: Event) => {
      const target = e.target as HTMLElement;
      const key = target.dataset.key;
      if (key) await this.input(key);
    };
    this.container.addEventListener('click', this.clickHandler);
  }

  private updateDisplay(): void {
    if (this.displayEl) {
      this.displayEl.textContent = this.display;
    }
  }
}
