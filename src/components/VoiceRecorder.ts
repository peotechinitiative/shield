import { toast } from '../utils/toast';

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private audioUrl: string | null = null;
  private startTime = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private stream: MediaStream | null = null;

  render(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'voice-recorder';
    el.innerHTML = `
      <div class="recorder-card">
        <div class="recorder-visualizer" id="visualizer">
          <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
          <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
          <div class="viz-bar"></div><div class="viz-bar"></div><div class="viz-bar"></div>
          <div class="viz-bar"></div>
        </div>
        <div class="recorder-timer" id="timer">00:00</div>
        <div class="recorder-status" id="recStatus">Ready to record</div>
        <div class="recorder-buttons">
          <button class="btn btn-primary" id="recRecord">● Record</button>
          <button class="btn btn-ghost hidden" id="recStop">■ Stop</button>
          <button class="btn btn-primary hidden" id="recPlay">▶ Play</button>
          <button class="btn btn-primary hidden" id="recSave">💾 Save</button>
          <button class="btn btn-ghost hidden" id="recDiscard">🗑️ Discard</button>
        </div>
        <audio id="recAudio" controls class="hidden" style="width:100%;margin-top:12px;"></audio>
      </div>
    `;

    el.querySelector<HTMLButtonElement>('#recRecord')!.addEventListener('click', () => this.startRecording(el));
    el.querySelector<HTMLButtonElement>('#recStop')!.addEventListener('click', () => this.stopRecording(el));
    el.querySelector<HTMLButtonElement>('#recPlay')!.addEventListener('click', () => this.playRecording(el));
    el.querySelector<HTMLButtonElement>('#recSave')!.addEventListener('click', () => this.saveRecording(el));
    el.querySelector<HTMLButtonElement>('#recDiscard')!.addEventListener('click', () => this.discardRecording(el));

    return el;
  }

  private async startRecording(el: HTMLElement): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.chunks = [];
      
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.chunks.push(e.data);
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(blob);
        const audio = el.querySelector<HTMLAudioElement>('#recAudio')!;
        audio.src = this.audioUrl;
      };

      this.mediaRecorder.start();
      this.startTime = Date.now();

      // Visualizer animation
      this.startVisualizer(this.stream, el);

      // Timer
      this.timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        el.querySelector<HTMLElement>('#timer')!.textContent = `${mins}:${secs}`;
      }, 1000);

      // UI updates
      el.querySelector('#recRecord')!.classList.add('hidden');
      el.querySelector('#recStop')!.classList.remove('hidden');
      el.querySelector<HTMLElement>('#recStatus')!.textContent = '🔴 Recording...';
      el.querySelector<HTMLElement>('#recStatus')!.style.color = '#a8412f';

    } catch (err) {
      toast('Microphone access denied');
      console.error(err);
    }
  }

  private stopRecording(el: HTMLElement): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    this.stream?.getTracks().forEach(t => t.stop());
    
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.stopVisualizer(el);

    el.querySelector('#recStop')!.classList.add('hidden');
    el.querySelector('#recPlay')!.classList.remove('hidden');
    el.querySelector('#recSave')!.classList.remove('hidden');
    el.querySelector('#recDiscard')!.classList.remove('hidden');
    el.querySelector<HTMLAudioElement>('#recAudio')!.classList.remove('hidden');
    el.querySelector<HTMLElement>('#recStatus')!.textContent = 'Recording stopped';
    el.querySelector<HTMLElement>('#recStatus')!.style.color = '';
  }

  private playRecording(el: HTMLElement): void {
    const audio = el.querySelector<HTMLAudioElement>('#recAudio')!;
    if (audio.paused) {
      audio.play();
      el.querySelector<HTMLButtonElement>('#recPlay')!.textContent = '⏸ Pause';
    } else {
      audio.pause();
      el.querySelector<HTMLButtonElement>('#recPlay')!.textContent = '▶ Play';
    }
  }

  private saveRecording(el: HTMLElement): void {
    if (!this.audioUrl) return;
    
    // Convert to base64 for storage
    fetch(this.audioUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          
          // Dispatch event for VaultView to catch
          window.dispatchEvent(new CustomEvent('vault-voice-saved', {
            detail: {
              type: 'voice',
              content: base64,
              duration: Math.floor((Date.now() - this.startTime) / 1000),
              createdAt: Date.now(),
            }
          }));
          
          toast('Voice note saved to vault!');
          this.discardRecording(el);
        };
        reader.readAsDataURL(blob);
      });
  }

  private discardRecording(el: HTMLElement): void {
    this.audioUrl = null;
    this.chunks = [];
    this.startTime = 0;
    
    if (this.timerInterval) clearInterval(this.timerInterval);
    
    const audio = el.querySelector<HTMLAudioElement>('#recAudio')!;
    audio.src = '';
    audio.classList.add('hidden');
    
    el.querySelector<HTMLElement>('#timer')!.textContent = '00:00';
    el.querySelector('#recRecord')!.classList.remove('hidden');
    el.querySelector('#recPlay')!.classList.add('hidden');
    el.querySelector('#recSave')!.classList.add('hidden');
    el.querySelector('#recDiscard')!.classList.add('hidden');
    el.querySelector<HTMLElement>('#recStatus')!.textContent = 'Ready to record';
    el.querySelector<HTMLButtonElement>('#recPlay')!.textContent = '▶ Play';
  }

  private startVisualizer(stream: MediaStream, el: HTMLElement): void {
    const bars = el.querySelectorAll<HTMLElement>('.viz-bar');
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32;
    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);
    
    const animate = () => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') return;
      analyser.getByteFrequencyData(data);
      bars.forEach((bar, i) => {
        const h = Math.max(4, (data[i % data.length] / 255) * 40);
        bar.style.height = `${h}px`;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }

  private stopVisualizer(el: HTMLElement): void {
    const bars = el.querySelectorAll<HTMLElement>('.viz-bar');
    bars.forEach(bar => bar.style.height = '4px');
  }
}