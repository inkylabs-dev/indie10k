import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { stackServerApp } from "@/lib/stack"
import { isUserSystemEnabled } from "@/lib/user-system"
import { redirect } from "next/navigation"

export default async function HomePage() {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      redirect("/login");
    }
  } catch (error) {
    console.error("Auth error in HomePage:", error);
    redirect("/login");
  }
  return <DashboardLayout />
}

