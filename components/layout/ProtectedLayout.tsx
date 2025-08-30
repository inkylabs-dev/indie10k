import { stackServerApp } from "@/lib/stack";
import { isUserSystemEnabled } from "@/lib/user-system";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      redirect("/login");
    }
    return <>{children}</>;
  } catch (error) {
    console.error("Auth error in ProtectedLayout:", error);
    redirect("/login");
  }
}