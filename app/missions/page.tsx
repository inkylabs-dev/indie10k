import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import MissionsClient from "./MissionsClient";

export default async function MissionsPage() {
  return (
    <ProtectedLayout>
      <MissionsClient />
    </ProtectedLayout>
  );
}