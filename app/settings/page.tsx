import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  return (
    <ProtectedLayout>
      <SettingsClient />
    </ProtectedLayout>
  );
}