import type { ReactElement } from "react";

import MpProfileScreen from "@/components/mp-profile-screen";

interface MpProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function MpProfilePage({
  params
}: MpProfilePageProps): Promise<ReactElement> {
  const { id } = await params;

  return <MpProfileScreen mpId={id} />;
}
