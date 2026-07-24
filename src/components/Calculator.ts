export type Operator = '+' | '-' | '*' | '/';

export class Calculator {
  private container: HTMLElement;
  private display: string = '0';
  private firstValue: number | null = null;
  private operator: Operator | null = null;
  private waitingForSecond: boolean = false;
  private keyLog: string = '';
  private isScientific: boolean = false;
  private isRadians: boolean = false;
  private displayEl: HTMLElement | null = null;
  private clickHandler: ((e: Event) => void) | null = null;
  private errorTimeout: number | null = null;
  private onUnlockAttempt: (keyLog: string) => Promise<boolean>;

  constructor(
    container: HTMLElement,
    onUnlockAttempt: (keyLog: string) => Promise<boolean>
  ) {
    this.container = container;
    this.onUnlockAttempt = onUnlockAttempt;
    this.render();
    this.attachListeners();
  }

  async input(key: string): Promise<void> {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }

    if (['+', '-', '*', '/'].includes(key)) {
      this.inputOperator(key as Operator);
    } else if (key === '=') {
      await this.inputEquals();
    } else if (key === 'C' || key === 'AC') {
      this.clear();
    } else if (key === 'DEL' || key === 'Backspace') {
      this.backspace();
    } else if (key === 'SCI' || key === 'BASIC') {
      this.toggleScientific();
    } else if (key === 'DEG' || key === 'RAD') {
      this.toggleAngleMode();
    } else if (['sin','cos','tan','asin','acos','atan','log','ln','sqrt','cbrt','x2','x3','xy','1/x','pi','e','%','pm','fact','10x','ex','abs'].includes(key)) {
      this.inputScientific(key);
    } else {
      this.inputDigit(key);
    }
  }

  clear(): void {
    this.display = '0';
    this.firstValue = null;
    this.operator = null;
    this.waitingForSecond = false;
    this.keyLog = '';
    this.updateDisplay();
  }

  backspace(): void {
    if (this.waitingForSecond) return;
    if (this.display.length > 1) {
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

  /* UNLOCK LOGIC (SECURITY) */
  private async checkUnlock(): Promise<void> {
    const normalized = this.normalizeKeyLog(this.keyLog);
    try {
      const wasHandled = await this.onUnlockAttempt(normalized);
      if (!wasHandled && this.keyLog.length >= 12) {
        this.display = 'Error';
        this.updateDisplay();
        this.errorTimeout = window.setTimeout(() => {
          this.clear();
        }, 1500);
      }
    } catch (err) {
      console.error('Unlock check error:', err);
    }
  }

  private normalizeKeyLog(keyLog: string): string {
    return keyLog.replace(/([+\-*/=])+/g, '$1');
  }

  /* INPUT HANDLERS */
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
      case 'sin': result = Math.sin(this.isRadians ? current : toRad(current)); break;
      case 'cos': result = Math.cos(this.isRadians ? current : toRad(current)); break;
      case 'tan': result = Math.tan(this.isRadians ? current : toRad(current)); break;
      case 'asin': result = this.isRadians ? Math.asin(current) : toDeg(Math.asin(current)); break;
      case 'acos': result = this.isRadians ? Math.acos(current) : toDeg(Math.acos(current)); break;
      case 'atan': result = this.isRadians ? Math.atan(current) : toDeg(Math.atan(current)); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case 'sqrt': result = Math.sqrt(current); break;
      case 'cbrt': result = Math.cbrt(current); break;
      case 'x2': result = current * current; break;
      case 'x3': result = current * current * current; break;
      case 'xy': result = current; break;
      case '1/x': result = 1 / current; break;
      case 'pi': result = Math.PI; break;
      case 'e': result = Math.E; break;
      case '%': result = current / 100; break;
      case 'pm': result = -current; break;
      case 'fact': result = this.factorial(current); break;
      case '10x': result = Math.pow(10, current); break;
      case 'ex': result = Math.exp(current); break;
      case 'abs': result = Math.abs(current); break;
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

  /* CALCULATION */
  private calculate(a: number, b: number, op: Operator): number {
    switch (op) {
      case '+': return this.fixFloat(a + b);
      case '-': return this.fixFloat(a - b);
      case '*': return this.fixFloat(a * b);
      case '/': return b !== 0 ? this.fixFloat(a / b) : NaN;
    }
  }

  private fixFloat(n: number): number {
    return parseFloat(n.toPrecision(12));
  }

  private formatResult(n: number): string {
    if (isNaN(n)) return 'Error';
    if (!isFinite(n)) return 'Error';
    let str = String(n);
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

  /* RENDERING */
  private render(): void {
    if (this.clickHandler) {
      this.container.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
    }
    this.container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'calculator-container';

    const angleMode = this.isRadians ? 'RAD' : 'DEG';

    const scientificButtons = this.isScientific ? `
      <div class="sci-row">
        <button data-key="DEG" class="btn-sci btn-active">${angleMode}</button>
        <button data-key="sin" class="btn-sci">sin</button>
        <button data-key="cos" class="btn-sci">cos</button>
        <button data-key="tan" class="btn-sci">tan</button>
      </div>
      <div class="sci-row">
        <button data-key="ln" class="btn-sci">ln</button>
        <button data-key="log" class="btn-sci">log</button>
        <button data-key="sqrt" class="btn-sci">√</button>
        <button data-key="x2" class="btn-sci">x²</button>
      </div>
      <div class="sci-row">
        <button data-key="pi" class="btn-sci">π</button>
        <button data-key="e" class="btn-sci">e</button>
        <button data-key="1/x" class="btn-sci">1/x</button>
        <button data-key="%" class="btn-sci">%</button>
      </div>
      <div class="sci-row">
        <button data-key="pm" class="btn-sci">±</button>
        <button data-key="abs" class="btn-sci">|x|</button>
        <button data-key="fact" class="btn-sci">n!</button>
        <button data-key="10x" class="btn-sci">10ˣ</button>
      </div>
    ` : '';

    wrapper.innerHTML = `
      <div class="calculator-body">
        <div class="calc-header">
          <button data-key="SCI" class="btn-toggle">${this.isScientific ? 'BASIC' : 'SCI'}</button>
          <div class="calc-icons">
            <span class="icon">◷</span>
            <span class="icon">📏</span>
            <span class="icon">🕐</span>
          </div>
        </div>
        <div class="calc-display" id="calc-display">${this.display}</div>
        <div class="calc-buttons ${this.isScientific ? 'scientific' : ''}">
          ${scientificButtons}
          <div class="btn-row">
            <button data-key="C" class="btn-clear">C</button>
            <button data-key="DEL" class="btn-op">⌫</button>
            <button data-key="%" class="btn-op">%</button>
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
            <button data-key="0" class="btn-num btn-zero">0</button>
            <button data-key="." class="btn-num">.</button>
            <button data-key="=" class="btn-equals">=</button>
          </div>
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