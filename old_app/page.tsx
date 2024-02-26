import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <>
      <Toaster
        richColors
        toastOptions={{
          classNames: {
            toast: '!bg-[#27272a] !border-[#27272a]',
          },
        }}
      />
      <Header />
      <HeroSection />
    </>
  );
}