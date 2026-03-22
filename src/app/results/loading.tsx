import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function ResultsLoading(): ReactElement {
  return (
    <div className="px-5 pb-28 pt-6">
      <div className="mb-4 h-8 w-40 rounded-full bg-[#F3F4F6]" />
      <div className="mb-5 h-12 rounded-xl bg-[#F3F4F6]" />
      <PageSkeleton cards={3} lines={2} />
    </div>
  );
}
