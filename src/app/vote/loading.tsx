import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function VoteLoading(): ReactElement {
  return (
    <div className="px-5 pt-4">
      <div className="mb-4 h-11 rounded-xl bg-[#F3F4F6]" />
      <PageSkeleton cards={3} lines={3} />
    </div>
  );
}
