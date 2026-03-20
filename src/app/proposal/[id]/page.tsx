import type { ReactElement } from "react";

import ProposalDetailScreen from "@/components/proposal-detail-screen";

interface ProposalDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProposalDetailPage({ params }: ProposalDetailPageProps): Promise<ReactElement> {
  const { id } = await params;

  return <ProposalDetailScreen proposalId={id} />;
}
