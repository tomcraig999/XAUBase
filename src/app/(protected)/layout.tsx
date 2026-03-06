import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={{ id: user.id, email: user.email }} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
