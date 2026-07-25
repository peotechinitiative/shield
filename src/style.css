/* ========== RESET & BASE ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

html, body {
  height: 100%;
  background: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.hidden { display: none !important; }

/* ========== CALCULATOR - AUTO FITS ANY SCREEN ========== */
.calculator-container {
  height: 100dvh;
  width: 100vw;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom, 0px));
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #fff;
  overflow: hidden;
}

.calculator-body {
  width: 100%;
  max-width: 430px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.calc-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 0 4px;
  flex-shrink: 0;
}

.btn-toggle {
  background: transparent;
  border: 1px solid #333;
  color: #4ade80;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

.calc-display {
  color: #fff;
  font-size: clamp(32px, 12vw, 64px);
  font-weight: 300;
  text-align: right;
  padding: 4px 8px;
  margin-bottom: 4px;
  min-height: 44px;
  word-break: break-all;
  line-height: 1.1;
  flex-shrink: 0;
}

.calc-buttons {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 1.2vh, 10px);
  flex: 1;
  min-height: 0;
  justify-content: flex-end;
}

.btn-row, .sci-row {
  display: flex;
  gap: clamp(4px, 1.2vh, 10px);
  justify-content: space-between;
  flex: 1;
  min-height: 0;
}

.sci-row {
  flex: 0.75;
}

.calc-buttons button {
  flex: 1;
  min-width: 0;
  height: auto;
  border-radius: 50%;
  border: none;
  font-size: clamp(18px, 5.5vw, 26px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  padding: 0;
}

.calc-buttons button:active {
  transform: scale(0.92);
  opacity: 0.8;
}

.btn-num {
  background: #333;
  color: #fff;
}

.btn-num:hover { background: #444; }

.btn-sci {
  background: #1c1c1e;
  color: #4ade80;
  font-size: clamp(11px, 3vw, 15px);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
}

.btn-sci:hover { background: #2c2c2e; }

.btn-sci.btn-active {
  background: #4ade80;
  color: #000;
}

.btn-clear {
  background: #a5a5a5;
  color: #000;
  font-size: clamp(18px, 5.5vw, 24px);
}

.btn-clear:hover { background: #b5b5b5; }

.btn-op {
  background: #ff9f0a;
  color: #fff;
  font-size: clamp(22px, 6.5vw, 30px);
}

.btn-op:hover { background: #ffb340; }

.btn-equals {
  background: #4ade80;
  color: #000;
  font-size: clamp(26px, 7.5vw, 34px);
}

.btn-equals:hover { background: #22c55e; }

.btn-zero {
  flex: 2.15;
  border-radius: 50%;
  aspect-ratio: auto;
  justify-content: flex-start;
  padding-left: clamp(20px, 7vw, 32px);
}

.calc-buttons.scientific {
  gap: clamp(3px, 1vh, 8px);
}

.calc-buttons.scientific .btn-row {
  gap: clamp(3px, 1vh, 8px);
}

.calc-buttons.scientific button {
  font-size: clamp(15px, 4.5vw, 20px);
}

/* Short screens */
@media (max-height: 700px) {
  .calc-buttons { gap: 5px; }
  .btn-row, .sci-row { gap: 5px; }
  .calc-display { font-size: clamp(28px, 10vw, 48px); min-height: 38px; }
}

/* Very short screens */
@media (max-height: 600px) {
  .calc-buttons { gap: 4px; }
  .btn-row, .sci-row { gap: 4px; }
  .calc-display { font-size: clamp(24px, 9vw, 40px); min-height: 32px; }
  .calc-header { margin-bottom: 2px; }
}

/* Wide but short screens */
@media (max-height: 500px) {
  .calc-buttons { gap: 3px; }
  .btn-row, .sci-row { gap: 3px; }
  .calc-display { font-size: clamp(20px, 8vw, 32px); min-height: 28px; }
}

/* Landscape mode on phones */
@media (max-height: 450px) and (orientation: landscape) {
  .calculator-body { max-width: 100%; flex-direction: row; gap: 12px; }
  .calc-display { flex: 1; display: flex; align-items: center; justify-content: flex-end; font-size: clamp(18px, 6vw, 28px); }
  .calc-buttons { flex: 2; }
}
/* ========== SETUP WIZARD ========== */
.setup-wizard {
  height: 100vh;
  width: 100vw;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #fff;
}

.setup-card {
  width: 100%;
  max-width: 360px;
  text-align: center;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.setup-icon {
  font-size: 56px;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.setup-card h1 {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
}

.setup-subtitle {
  color: #8e8e93;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 28px;
}

.pin-input-group {
  margin-bottom: 16px;
  text-align: left;
}

.pin-input-group label {
  display: block;
  color: #8e8e93;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.pin-input-group input {
  width: 100%;
  height: 52px;
  background: #1c1c1e;
  border: 1px solid #38383a;
  border-radius: 26px;
  color: #fff;
  font-size: 22px;
  text-align: center;
  letter-spacing: 12px;
  padding: 0 16px;
  outline: none;
  transition: border-color 0.2s;
}

.pin-input-group input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.15);
}

.pin-input-group input::placeholder {
  color: #48484a;
  letter-spacing: 12px;
}

.setup-error {
  color: #ff453a;
  font-size: 13px;
  min-height: 18px;
  margin-bottom: 14px;
}

.setup-button {
  width: 100%;
  height: 52px;
  background: #22c55e;
  color: #000;
  border: none;
  border-radius: 26px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 20px;
}

.setup-button:hover { background: #16a34a; }
.setup-button:active { transform: scale(0.98); }

.setup-hint {
  color: #8e8e93;
  font-size: 13px;
  line-height: 1.5;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 380px) {
  .home-content { padding: 12px 12px 0; }
  .hero-card { padding: 14px; }
  .actions-grid { gap: 8px; }
  .action-card { padding: 14px 10px; }
  .action-icon { font-size: 24px; }
  .calc-display { font-size: clamp(28px, 9vw, 40px); }
}

@media (min-width: 768px) {
  .home-content { max-width: 520px; }
  .actions-grid { grid-template-columns: repeat(4, 1fr); }
}


/* ========== VAULT STYLES ========== */
.vault-page {
  height: 100vh;
  width: 100vw;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #fff;
}

.vault-card {
  width: 100%;
  max-width: 360px;
  text-align: center;
  animation: fadeInUp 0.5s ease-out;
}

.vault-icon {
  font-size: 56px;
  margin-bottom: 20px;
}

.vault-sub {
  color: #8e8e93;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 28px;
}

.vault-cancel {
  width: 100%;
  height: 48px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: #8e8e93;
  border-radius: 24px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.vault-cancel:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}

.vault-view {
  background: #000;
}

.vault-grid {
  margin-bottom: 8px;
}

.vault-textarea {
  width: 100%;
  min-height: 200px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  color: #fff;
  font-size: 15px;
  padding: 16px;
  outline: none;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 16px;
}

.vault-textarea:focus {
  border-color: #22c55e;
}

.vault-textarea::placeholder {
  color: rgba(255,255,255,0.3);
}

.vault-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.vault-empty {
  text-align: center;
  color: rgba(255,255,255,0.4);
  padding: 40px 20px;
  font-size: 14px;
}

.vault-item {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
}

.vault-item-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.vault-item-info {
  flex: 1;
  min-width: 0;
}

.vault-item-name {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vault-item-date {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
}

.vault-item-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.vault-action-btn {
  padding: 6px 12px;
  border-radius: 12px;
  border: none;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.vault-action-btn.view {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.vault-action-btn.view:hover {
  background: rgba(34, 197, 94, 0.3);
}

.vault-action-btn.delete {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.vault-action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.3);
}

.vault-preview-img {
  width: 100%;
  border-radius: 16px;
  margin-bottom: 20px;
}

.vault-note-preview {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  margin-bottom: 20px;
  min-height: 150px;
}

/* ========== ANTI-THEFT STYLES ========== */
.view-antitheft {
  padding-top: 8px;
}

.setting-desc {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 10px;
  line-height: 1.4;
}

.settings-input {
  width: 100%;
  height: 50px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  color: #fff;
  font-size: 15px;
  padding: 0 16px;
  outline: none;
  margin-bottom: 10px;
}

.settings-input:focus {
  border-color: #22c55e;
}

.settings-btn.secondary {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 14px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.settings-btn.secondary:hover {
  background: rgba(255,255,255,0.1);
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  color: #fff;
  font-size: 14px;
}

.toggle-switch {
  width: 48px;
  height: 26px;
  appearance: none;
  background: rgba(255,255,255,0.15);
  border-radius: 13px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  background: #fff;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
}

.toggle-switch:checked {
  background: #22c55e;
}

.toggle-switch:checked::after {
  transform: translateX(22px);
}

.location-display {
  margin-top: 10px;
  font-size: 13px;
  color: #22c55e;
  word-break: break-all;
}

.location-display a {
  color: #22c55e;
  text-decoration: underline;
}

.native-features {
  background: rgba(255,255,255,0.03);
  border-radius: 16px;
  padding: 16px;
}

.native-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
}

.native-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
}

.native-item span {
  font-size: 14px;
}

.settings-btn.pro {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #000;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.settings-btn.pro:hover {
  opacity: 0.9;
  transform: scale(1.01);
}