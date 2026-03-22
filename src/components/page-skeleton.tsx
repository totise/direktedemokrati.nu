import type { ReactElement } from "react";

interface PageSkeletonProps {
  rows?: number;
}

export default function PageSkeleton({
  rows = 3
}: PageSkeletonProps): ReactElement {
  return (
    <div className="space-y-4 px-5 py-6">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          key={index}
        >
          <div className="skeleton-shimmer h-4 w-1/2 rounded-full" />
          <div className="skeleton-shimmer mt-3 h-3 w-4/5 rounded-full" />
          <div className="skeleton-shimmer mt-2 h-3 w-3/5 rounded-full" />
          <div className="skeleton-shimmer mt-4 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
