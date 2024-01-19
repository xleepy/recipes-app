import { renderHook } from '@testing-library/preact';
import { describe, expect, it, vi } from 'vitest';
import { useDebounceCallback } from './hooks';

describe('hooks tests', () => {
  describe('useDebounce tests', () => {
    it('should not callback immediately', () => {
      const mockFn = vi.fn();
      vi.useFakeTimers();
      const { result } = renderHook(() => useDebounceCallback(mockFn, 500, []));
      result.current();
      expect(mockFn).not.toHaveBeenCalled();
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
