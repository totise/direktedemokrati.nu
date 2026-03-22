import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function MpsLoading(): ReactElement {
  return (
    <div className="px-5 pb-28 pt-6">
      <div className="mb-4 h-10 rounded-2xl bg-[#F3F4F6]" />
      <div className="mb-4 h-11 rounded-2xl bg-[#F3F4F6]" />
      <PageSkeleton cards={4} lines={1} />
    </div>
  );
}
