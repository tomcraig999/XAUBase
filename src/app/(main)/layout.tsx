import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUser } from "@/lib/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user ? { id: user.id, email: user.email } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
