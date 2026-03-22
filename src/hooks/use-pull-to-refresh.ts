"use client";

import { useEffect, useRef } from "react";

interface UsePullToRefreshOptions {
  enabled?: boolean;
  onRefresh: () => void | Promise<void>;
  threshold?: number;
}

export const usePullToRefresh = ({
  enabled = true,
  onRefresh,
  threshold = 60
}: UsePullToRefreshOptions): void => {
  const touchStartY = useRef<number | null>(null);
  const refreshingRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleTouchStart = (event: TouchEvent): void => {
      if (window.scrollY > 0) {
        touchStartY.current = null;
        return;
      }

      touchStartY.current = event.touches[0]?.clientY ?? null;
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
        return;
      }

      refreshingRef.current = true;

      void Promise.resolve(onRefresh()).finally(() => {
        refreshingRef.current = false;
      });
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true
    });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [enabled, onRefresh, threshold]);
};
