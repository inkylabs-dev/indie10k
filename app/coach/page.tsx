import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import CoachClient from "./CoachClient";

export default async function CoachPage() {
  return (
    <ProtectedLayout>
      <CoachClient />
    </ProtectedLayout>
  );
}