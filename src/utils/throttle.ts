export class ThrottleManager {
  private isThrottled = false;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private throttleDelayMs: number) {}

  public create<T extends (...args: any[]) => void>(fn: T) {
    return (...args: Parameters<T>): void => {
      if (this.isThrottled) return;

      this.isThrottled = true;
      fn(...args);

      setTimeout(() => {
        this.isThrottled = false;
      }, this.throttleDelayMs);
    };
  }

  public debounce<T extends (...args: any[]) => void>(fn: T, delayMs: number) {
    return (...args: Parameters<T>): void => {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {
        fn(...args);
      }, delayMs);
    };
  }
}
