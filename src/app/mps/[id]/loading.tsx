import type { ReactElement } from "react";

import PageSkeleton from "@/components/page-skeleton";

export default function MpProfileLoading(): ReactElement {
  return <PageSkeleton rows={3} />;
}
