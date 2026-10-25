import { notFound } from "next/navigation";
import { isCurrentUserAdmin } from "@/lib/dealers/portal";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isCurrentUserAdmin())) notFound();
  return <>{children}</>;
}
