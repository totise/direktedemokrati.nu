import type { ReactElement } from "react";

interface PageSkeletonProps {
  lines?: number;
  cards?: number;
}

export default function PageSkeleton({
  lines = 3,
  cards = 2
}: PageSkeletonProps): ReactElement {
  return (
    <div className="space-y-4">
      {Array.from({ length: cards }).map((_, cardIndex) => (
        <div
          className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
          key={cardIndex}
        >
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#F3F4F6]" />
          <div className="mt-3 space-y-2">
            {Array.from({ length: lines }).map((__, lineIndex) => (
              <div
                className="h-3 w-full animate-pulse rounded-full bg-[#F3F4F6]"
                key={lineIndex}
                style={{ width: `${100 - lineIndex * 12}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
