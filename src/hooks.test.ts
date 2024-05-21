import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounce } from './hooks';

describe('hooks tests', () => {
  describe('useDebounce tests', () => {
    it('should not callback immediately', () => {
      const mockFn = vi.fn();
      vi.useFakeTimers();
      const { result } = renderHook(() => useDebounce(mockFn, 500, []));
      result.current();
      expect(mockFn).not.toHaveBeenCalled();
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
