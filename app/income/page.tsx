import { ProtectedLayout } from "@/components/layout/ProtectedLayout";
import IncomeClient from "./IncomeClient";

export default async function IncomePage() {
  return (
    <ProtectedLayout>
      <IncomeClient />
    </ProtectedLayout>
  );
}