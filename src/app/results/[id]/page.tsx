import type { ReactElement } from "react";

import ResultsViewScreen from "@/components/results-view-screen";

interface ResultsViewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResultsViewPage({
  params
}: ResultsViewPageProps): Promise<ReactElement> {
  const { id } = await params;

  return <ResultsViewScreen proposalId={id} />;
}
