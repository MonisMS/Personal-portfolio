import { Footer } from "@/components/v2/footer";
import { Navbar } from "@/components/v2/navbar";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2 flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
