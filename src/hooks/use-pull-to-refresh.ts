"use client";

import { useEffect, useRef, useState } from "react";

interface UsePullToRefreshOptions {
  enabled?: boolean;
  onRefresh: () => void | Promise<void>;
  threshold?: number;
  delayMs?: number;
}

interface UsePullToRefreshResult {
  isRefreshing: boolean;
  pullDistance: number;
}

export const usePullToRefresh = ({
  enabled = true,
  onRefresh,
  threshold = 60,
  delayMs = 180
}: UsePullToRefreshOptions): UsePullToRefreshResult => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const refreshingRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleTouchStart = (event: TouchEvent): void => {
      if (window.scrollY > 0) {
        touchStartY.current = null;
        setPullDistance(0);
        return;
      }

      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent): void => {
      const startY = touchStartY.current;

      if (startY === null || window.scrollY > 0) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (currentY === undefined) {
        return;
      }

      setPullDistance(Math.max(0, currentY - startY));
    };

    const handleTouchEnd = (event: TouchEvent): void => {
      const startY = touchStartY.current;
      const endY = event.changedTouches[0]?.clientY;

      touchStartY.current = null;

      if (
        startY === null ||
        endY === undefined ||
        refreshingRef.current ||
        endY - startY < threshold
      ) {
        setPullDistance(0);
        return;
      }

      refreshingRef.current = true;
      setIsRefreshing(true);
      setPullDistance(threshold);

      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          void Promise.resolve(onRefresh()).finally(() => {
            refreshingRef.current = false;
            setIsRefreshing(false);
            setPullDistance(0);
          });
        }, delayMs);
      });
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: true
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [delayMs, enabled, onRefresh, threshold]);

  return { isRefreshing, pullDistance };
};
