import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function MpsLoading(): ReactElement {
  return <PageSkeleton rows={3} />;
}
