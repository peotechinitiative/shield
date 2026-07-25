export class Calculator {
  private container: HTMLElement;
  private onUnlock: (keyLog: string) => Promise<boolean>;
  private display: HTMLElement;
  private keyLog = '';
  private current = '0';
  private previous = '';
  private operator = '';
  private scientific = false;
  private shouldReset = false;

  constructor(container: HTMLElement, onUnlock: (keyLog: string) => Promise<boolean>) {
    this.container = container;
    this.onUnlock = onUnlock;
    this.render();
    this.display = container.querySelector('.calc-display') as HTMLElement;
    this.attachListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="calculator-page">
        <div class="calc-header">
          <button class="calc-btn-sci" id="sci-toggle">SCI</button>
        </div>
        <div class="calc-display">0</div>
        <div class="calc-buttons" id="calc-buttons">
          ${this.scientific ? this.scientificButtons() : ''}
          <button class="calc-btn calc-btn-op" data-action="clear">C</button>
          <button class="calc-btn calc-btn-op" data-action="backspace">&#x232B;</button>
          <button class="calc-btn calc-btn-op" data-action="percent">%</button>
          <button class="calc-btn calc-btn-op" data-action="operator" data-op="/">&divide;</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="7">7</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="8">8</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="9">9</button>
          <button class="calc-btn calc-btn-op" data-action="operator" data-op="*">&times;</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="4">4</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="5">5</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="6">6</button>
          <button class="calc-btn calc-btn-op" data-action="operator" data-op="-">&#x2212;</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="1">1</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="2">2</button>
          <button class="calc-btn calc-btn-number" data-action="digit" data-digit="3">3</button>
          <button class="calc-btn calc-btn-op" data-action="operator" data-op="+">+</button>
          <button class="calc-btn calc-btn-number calc-btn-wide" data-action="digit" data-digit="0">0</button>
          <button class="calc-btn calc-btn-number" data-action="decimal">.</button>
          <button class="calc-btn calc-btn-eq" data-action="equals">=</button>
        </div>
      </div>
    `;
  }

  private scientificButtons(): string {
    const sci = [
      ['sin', 'cos', 'tan', 'log'],
      ['ln', 'sqrt', 'pow', 'pi'],
      ['e', '(', ')', 'deg']
    ];
    return sci.map(row => 
      row.map(btn => `<button class="calc-btn calc-btn-sci-fn" data-action="sci" data-fn="${btn}">${btn}</button>`).join('')
    ).join('');
  }

  private attachListeners(): void {
    this.container.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleButton(e.target as HTMLElement));
    });
    this.container.querySelector('#sci-toggle')?.addEventListener('click', () => this.toggleScientific());
  }

  private handleButton(btn: HTMLElement): void {
    const action = btn.dataset.action;
    if (action === 'digit') this.inputDigit(btn.dataset.digit!);
    else if (action === 'decimal') this.inputDecimal();
    else if (action === 'operator') this.inputOperator(btn.dataset.op!);
    else if (action === 'equals') this.inputEquals();
    else if (action === 'clear') this.inputClear();
    else if (action === 'backspace') this.inputBackspace();
    else if (action === 'percent') this.inputPercent();
    else if (action === 'sci') this.inputSci(btn.dataset.fn!);
  }

  private inputDigit(digit: string): void {
    if (this.shouldReset) { this.current = digit; this.shouldReset = false; }
    else if (this.current === '0') this.current = digit;
    else this.current += digit;
    this.keyLog += digit;
    this.updateDisplay();
  }

  private inputDecimal(): void {
    if (this.shouldReset) { this.current = '0.'; this.shouldReset = false; }
    else if (!this.current.includes('.')) this.current += '.';
    this.keyLog += '.';
    this.updateDisplay();
  }

  private inputOperator(op: string): void {
    if (this.operator && !this.shouldReset) this.compute();
    this.previous = this.current;
    this.operator = op;
    this.shouldReset = true;
    this.keyLog += op === '/' ? '/' : op === '*' ? '*' : op;
    this.updateDisplay();
  }

  private inputEquals(): void {
    this.keyLog += '=';
    this.compute();
    this.checkUnlock();
  }

  private inputClear(): void {
    this.current = '0'; this.previous = ''; this.operator = ''; this.keyLog = '';
    this.updateDisplay();
  }

  private inputBackspace(): void {
    if (this.current.length > 1) this.current = this.current.slice(0, -1);
    else this.current = '0';
    this.keyLog = this.keyLog.slice(0, -1);
    this.updateDisplay();
  }

  private inputPercent(): void {
    this.current = (parseFloat(this.current) / 100).toString();
    this.updateDisplay();
  }

  private inputSci(fn: string): void {
    const val = parseFloat(this.current);
    let res = 0;
    switch (fn) {
      case 'sin': res = Math.sin(val); break;
      case 'cos': res = Math.cos(val); break;
      case 'tan': res = Math.tan(val); break;
      case 'log': res = Math.log10(val); break;
      case 'ln': res = Math.log(val); break;
      case 'sqrt': res = Math.sqrt(val); break;
      case 'pow': res = Math.pow(val, 2); break;
      case 'pi': this.current = Math.PI.toString(); this.updateDisplay(); return;
      case 'e': this.current = Math.E.toString(); this.updateDisplay(); return;
      case 'deg': res = val * (Math.PI / 180); break;
    }
    this.current = parseFloat(res.toPrecision(12)).toString();
    this.updateDisplay();
  }

  private compute(): void {
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    let res = 0;
    switch (this.operator) {
      case '+': res = prev + curr; break;
      case '-': res = prev - curr; break;
      case '*': res = prev * curr; break;
      case '/': res = curr !== 0 ? prev / curr : 0; break;
    }
    this.current = parseFloat(res.toPrecision(12)).toString();
    this.operator = '';
    this.shouldReset = true;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    if (this.display) this.display.textContent = this.current;
  }

  private toggleScientific(): void {
    this.scientific = !this.scientific;
    const btn = this.container.querySelector('#sci-toggle') as HTMLElement;
    if (btn) btn.textContent = this.scientific ? 'BASIC' : 'SCI';
    this.render();
    this.display = this.container.querySelector('.calc-display') as HTMLElement;
    this.attachListeners();
    this.updateDisplay();
  }

  private async checkUnlock(): Promise<void> {
    const unlocked = await this.onUnlock(this.keyLog);
    if (unlocked) { this.keyLog = ''; }
  }

  destroy(): void {
    this.container.innerHTML = '';
  }
}