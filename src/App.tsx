import { Hero } from "@/components/Hero";
import { Tabs } from "@/components/Tabs";
import { Footer } from "@/components/Footer";

const App = () => (
  <div
    className="w-full min-h-screen flex flex-col items-center"
    style={{ background: "#06070a" }}
  >
    {/* Ambient background orbs */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[300px] h-[300px]"
        style={{
          background:
            "radial-gradient(ellipse at 100% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />
    </div>

    {/* Content */}
    <div className="relative z-10 w-full max-w-[480px] flex flex-col flex-1">
      <Hero />
      <Tabs />
      <div className="flex-1" />
      <Footer />
    </div>
  </div>
);

export default App;
