import Hero from "@/components/sections/Hero";
import LayoutsPreview from "@/components/sections/LayoutsPreview";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LayoutsPreview />
    </main>
  );
}
