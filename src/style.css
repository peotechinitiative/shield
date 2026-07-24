export type Operator = '+' | '-' | '*' | '/';

export class Calculator {
  private display = '0';
  private expression = '';        // Full expression for display
  private firstValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForSecond = false;
  private keyLog = '';           // Tracks ALL keys for PIN unlock
  private container: HTMLElement;
  private onUnlockAttempt: (keyLog: string) => Promise<boolean>;
  private errorTimeout: ReturnType<typeof setTimeout> | null = null;
  private displayEl: HTMLElement | null = null;
  private isScientific = false;
  private clickHandler: ((e: Event) => void) | null = null;
  private isRadians = false;     // DEG by default

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

    switch (key) {
      case 'C':
        this.clear();
        return;
      case 'AC':
        this.allClear();
        return;
      case '=':
        await this.inputEquals();
        return;
      case 'SCI':
        this.toggleScientific();
        return;
      case 'DEG':
      case 'RAD':
        this.toggleAngleMode();
        return;
      case 'DEL':
        this.backspace();
        return;
      case 'INV':
        // Toggle inverse functions - would need UI update
        return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
      this.inputOperator(key as Operator);
      return;
    }

    if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'x2', 'x3', '1/x', 'pi', 'e', '%', 'pm', 'fact', '10x', 'ex', 'xy', 'abs'].includes(key)) {
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
    this.expression = '';
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.keyLog = '';
    this.updateDisplay();
  }

  allClear(): void {
    this.clear();
  }

  backspace(): void {
    if (this.display.length > 1 && this.display !== 'Error') {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
    this.updateDisplay();
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
    const normalized = this.normalizeKeyLog(this.keyLog);
    console.log('DEBUG keyLog:', JSON.stringify(this.keyLog), 'normalized:', JSON.stringify(normalized));

    try {
      const wasHandled = await this.onUnlockAttempt(normalized);
      console.log('DEBUG onUnlockAttempt returned:', wasHandled);

      if (!wasHandled && this.keyLog.length >= 12) {
        console.log('DEBUG: Wrong code, showing Error');
        this.display = 'Error';
        this.updateDisplay();
        this.errorTimeout = setTimeout(() => {
          this.keyLog = '';
          this.display = '0';
          this.updateDisplay();
        }, 800);
      }
    } catch (err) {
      console.error('DEBUG checkUnlock error:', err);
    }
  }

  private normalizeKeyLog(keyLog: string): string {
    // Remove duplicate operators
    return keyLog.replace(/([+\-*/=])\1+/g, '$1');
  }

  // INPUT HANDLERS

  private inputDigit(d: string): void {
    if (this.waitingForSecond) {
      this.display = d;
      this.waitingForSecond = false;
    } else {
      if (d === '.' && this.display.includes('.')) return;
      this.display = (this.display === '0' && d !== '.') ? d : this.display + d;
    }

    this.keyLog += d;
    this.checkUnlock();
    this.updateDisplay();
  }

  private inputOperator(op: Operator): void {
    const current = parseFloat(this.display);

    if (this.firstValue === null) {
      this.firstValue = current;
    } else if (this.operator && !this.waitingForSecond) {
      const result = this.calculate(this.firstValue, current, this.operator);
      this.display = this.formatResult(result);
      this.firstValue = result;
    } else {
      this.firstValue = current;
    }

    this.operator = op;
    this.waitingForSecond = true;
    this.keyLog += op;
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

    this.display = this.formatResult(result);
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecond = true;
    this.keyLog += '=';
    await this.checkUnlock();
    this.updateDisplay();
  }

  private inputScientific(func: string): void {
    const current = parseFloat(this.display);
    let result = current;
    const toRad = (deg: number) => deg * Math.PI / 180;
    const toDeg = (rad: number) => rad * 180 / Math.PI;

    switch (func) {
      case 'sin':
        result = this.isRadians ? Math.sin(current) : Math.sin(toRad(current));
        break;
      case 'cos':
        result = this.isRadians ? Math.cos(current) : Math.cos(toRad(current));
        break;
      case 'tan':
        result = this.isRadians ? Math.tan(current) : Math.tan(toRad(current));
        break;
      case 'asin':
        result = this.isRadians ? Math.asin(current) : toDeg(Math.asin(current));
        break;
      case 'acos':
        result = this.isRadians ? Math.acos(current) : toDeg(Math.acos(current));
        break;
      case 'atan':
        result = this.isRadians ? Math.atan(current) : toDeg(Math.atan(current));
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
      case 'cbrt':
        result = Math.cbrt(current);
        break;
      case 'x2':
        result = current * current;
        break;
      case 'x3':
        result = current * current * current;
        break;
      case 'xy':
        // Would need two operands - simplified
        result = current;
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
      case 'fact':
        result = this.factorial(Math.floor(current));
        break;
      case '10x':
        result = Math.pow(10, current);
        break;
      case 'ex':
        result = Math.exp(current);
        break;
      case 'abs':
        result = Math.abs(current);
        break;
    }

    this.display = this.formatResult(result);
    this.waitingForSecond = true;
    this.updateDisplay();
  }

  private toggleScientific(): void {
    this.isScientific = !this.isScientific;
    this.render();
    this.attachListeners();
  }

  private toggleAngleMode(): void {
    this.isRadians = !this.isRadians;
    this.render();
    this.attachListeners();
  }

  // CALCULATION

  private calculate(a: number, b: number, op: Operator): number {
    switch (op) {
      case '+': return this.fixFloat(a + b);
      case '-': return this.fixFloat(a - b);
      case '*': return this.fixFloat(a * b);
      case '/': return b !== 0 ? this.fixFloat(a / b) : NaN;
      default: return b;
    }
  }

  private fixFloat(n: number): number {
    // Fix floating point precision issues
    return Math.round(n * 1e12) / 1e12;
  }

  private formatResult(n: number): string {
    if (isNaN(n)) return 'Error';
    if (!isFinite(n)) return 'Error';

    // Format to avoid long decimals
    const str = n.toString();
    if (str.length > 15) {
      return n.toPrecision(12);
    }
    return str;
  }

  private factorial(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
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

    const angleMode = this.isRadians ? 'RAD' : 'DEG';

    // Scientific buttons (pill-shaped)
    const scientificButtons = this.isScientific ? `
      <div class="sci-row">
        <button data-key="INV" class="btn-sci">INV</button>
        <button data-key="DEG" class="btn-sci btn-active">${angleMode}</button>
        <button data-key="fact" class="btn-sci">x!</button>
        <button data-key="C" class="btn-clear">C</button>
        <button data-key="%" class="btn-sci">%</button>
        <button data-key="DEL" class="btn-sci">⌫</button>
        <button data-key="/" class="btn-op">÷</button>
      </div>
      <div class="sci-row">
        <button data-key="sin" class="btn-sci">sin</button>
        <button data-key="cos" class="btn-sci">cos</button>
        <button data-key="tan" class="btn-sci">tan</button>
        <button data-key="7" class="btn-num">7</button>
        <button data-key="8" class="btn-num">8</button>
        <button data-key="9" class="btn-num">9</button>
        <button data-key="*" class="btn-op">×</button>
      </div>
      <div class="sci-row">
        <button data-key="ln" class="btn-sci">ln</button>
        <button data-key="log" class="btn-sci">log</button>
        <button data-key="xy" class="btn-sci">xʸ</button>
        <button data-key="4" class="btn-num">4</button>
        <button data-key="5" class="btn-num">5</button>
        <button data-key="6" class="btn-num">6</button>
        <button data-key="-" class="btn-op">−</button>
      </div>
      <div class="sci-row">
        <button data-key="pi" class="btn-sci">π</button>
        <button data-key="e" class="btn-sci">e</button>
        <button data-key="sqrt" class="btn-sci">√</button>
        <button data-key="1" class="btn-num">1</button>
        <button data-key="2" class="btn-num">2</button>
        <button data-key="3" class="btn-num">3</button>
        <button data-key="+" class="btn-op">+</button>
      </div>
      <div class="sci-row">
        <button data-key="10x" class="btn-sci">10ˣ</button>
        <button data-key="ex" class="btn-sci">eˣ</button>
        <button data-key="x2" class="btn-sci">x²</button>
        <button data-key="pm" class="btn-sci">+/-</button>
        <button data-key="0" class="btn-num">0</button>
        <button data-key="." class="btn-num">.</button>
        <button data-key="=" class="btn-equals">=</button>
      </div>
    ` : `
      <div class="btn-row">
        <button data-key="C" class="btn-clear">C</button>
        <button data-key="%" class="btn-sci">%</button>
        <button data-key="DEL" class="btn-sci">⌫</button>
        <button data-key="/" class="btn-op">÷</button>
      </div>
      <div class="btn-row">
        <button data-key="7" class="btn-num">7</button>
        <button data-key="8" class="btn-num">8</button>
        <button data-key="9" class="btn-num">9</button>
        <button data-key="*" class="btn-op">×</button>
      </div>
      <div class="btn-row">
        <button data-key="4" class="btn-num">4</button>
        <button data-key="5" class="btn-num">5</button>
        <button data-key="6" class="btn-num">6</button>
        <button data-key="-" class="btn-op">−</button>
      </div>
      <div class="btn-row">
        <button data-key="1" class="btn-num">1</button>
        <button data-key="2" class="btn-num">2</button>
        <button data-key="3" class="btn-num">3</button>
        <button data-key="+" class="btn-op">+</button>
      </div>
      <div class="btn-row">
        <button data-key="pm" class="btn-sci">+/-</button>
        <button data-key="0" class="btn-num">0</button>
        <button data-key="." class="btn-num">.</button>
        <button data-key="=" class="btn-equals">=</button>
      </div>
    `;

    wrapper.innerHTML = `
      <div class="calculator-body">
        <div class="calc-header">
          <button data-key="SCI" class="btn-toggle">${this.isScientific ? 'BASIC' : 'SCI'}</button>
          <div class="calc-icons">
            <span class="icon">🕐</span>
            <span class="icon">$</span>
            <span class="icon">📏</span>
          </div>
        </div>
        <div class="calc-display" id="calc-display">${this.display}</div>
        <div class="calc-buttons ${this.isScientific ? 'scientific' : ''}">
          ${scientificButtons}
        </div>
      </div>
    `;

    this.container.appendChild(wrapper);
    this.displayEl = wrapper.querySelector('#calc-display');
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