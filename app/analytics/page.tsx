import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import AnalyticsClient from "./AnalyticsClient";

export default async function AnalyticsPage() {
  return (
    <ProtectedLayout>
      <AnalyticsClient />
    </ProtectedLayout>
  );
}
