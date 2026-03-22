"use client";

import { useCallback, useMemo, useRef, useState, type TouchEvent } from "react";

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  enabled?: boolean;
}

export interface PullToRefreshBindings {
  isPulling: boolean;
  pullDistance: number;
  handlers: {
    onTouchStart: (event: TouchEvent<HTMLElement>) => void;
    onTouchMove: (event: TouchEvent<HTMLElement>) => void;
    onTouchEnd: () => void;
  };
}

const MAX_PULL_DISTANCE = 96;

export const usePullToRefresh = ({
  onRefresh,
  threshold = 72,
  enabled = true
}: UsePullToRefreshOptions): PullToRefreshBindings => {
  const startY = useRef<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const reset = useCallback(() => {
    startY.current = null;
    setPullDistance(0);
    setIsPulling(false);
  }, []);

  const onTouchStart = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      if (!enabled || window.scrollY > 0) {
        return;
      }

      startY.current = event.touches[0]?.clientY ?? null;
      setIsPulling(false);
      setPullDistance(0);
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      if (!enabled || startY.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? startY.current;
      const distance = currentY - startY.current;

      if (distance <= 0 || window.scrollY > 0) {
        return;
      }

      const nextDistance = Math.min(distance, MAX_PULL_DISTANCE);

      setIsPulling(true);
      setPullDistance(nextDistance);

      if (nextDistance > 0) {
        event.preventDefault();
      }
    },
    [enabled]
  );

  const onTouchEnd = useCallback(async () => {
    if (!enabled) {
      reset();
      return;
    }

    const shouldRefresh = pullDistance >= threshold;
    const nextRefresh = shouldRefresh
      ? Promise.resolve(onRefresh())
      : Promise.resolve();

    reset();

    if (shouldRefresh) {
      await nextRefresh;
    }
  }, [enabled, onRefresh, pullDistance, reset, threshold]);

  return useMemo(
    () => ({
      isPulling,
      pullDistance,
      handlers: {
        onTouchStart,
        onTouchMove,
        onTouchEnd
      }
    }),
    [isPulling, onTouchEnd, onTouchMove, onTouchStart, pullDistance]
  );
};
