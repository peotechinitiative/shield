import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PanicView } from './PanicView';

const { triggerPanicMock, toastMock } = vi.hoisted(() => ({
  triggerPanicMock: vi.fn(),
  toastMock: vi.fn(),
}));

vi.mock('../services/supabase', () => ({
  triggerPanic: triggerPanicMock,
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'user-1' } } }),
    },
    functions: {
      invoke: vi.fn(),
    },
  },
}));

vi.mock('../utils/router', () => ({
  router: {
    navigate: vi.fn(),
  },
}));

vi.mock('../utils/toast', () => ({
  toast: toastMock,
}));

vi.mock('../services/location', () => ({
  getCurrentPosition: vi.fn().mockResolvedValue({
    lat: 1,
    lng: 2,
    accuracy: 5,
    timestamp: Date.now(),
  }),
}));

describe('PanicView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('keeps the confirm view visible when panic submission fails', async () => {
    triggerPanicMock.mockRejectedValueOnce(new Error('network error'));

    const view = new PanicView();
    const el = view.render();
    const sendButton = el.querySelector<HTMLButtonElement>('#sendPanic')!;

    sendButton.click();
    await Promise.resolve();
    await Promise.resolve();

    const confirm = el.querySelector<HTMLElement>('#panicConfirm')!;
    const sent = el.querySelector<HTMLElement>('#panicSent')!;

    expect(confirm.classList.contains('hidden')).toBe(false);
    expect(sent.classList.contains('hidden')).toBe(true);
    expect(toastMock).toHaveBeenCalledWith('Alert failed — try calling emergency services directly');
  });
});
