import { Header } from "@/components/layout/Header";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <ScrollReveal>{children}</ScrollReveal>
      </main>
    </>
  );
}
