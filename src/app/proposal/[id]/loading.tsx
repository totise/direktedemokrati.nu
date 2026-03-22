import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function ProposalLoading(): ReactElement {
  return <PageSkeleton rows={2} />;
}
