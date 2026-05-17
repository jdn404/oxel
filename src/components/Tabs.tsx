import { useState, useRef } from "react";
import { Phone, QrCode } from "lucide-react";
import { PairPanel } from "./PairPanel";
import { QRPanel } from "./QRPanel";
import { Reveal } from "./Reveal";

type Tab = "pair" | "qr";

export const Tabs = () => {
  const [active, setActive] = useState<Tab>("pair");

  // Touch swipe support
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);

  const switchTab = (tab: Tab) => setActive(tab);

  return (
    <div className="w-full">
      {/* Tab track */}
      <Reveal delay={100}>
        <div className="px-6 pt-6">
          <div
            className="relative grid grid-cols-2 p-1 overflow-hidden"
            style={{
              background: "#0d0f14",
              border: "1px solid #1c2235",
              borderRadius: "14px",
            }}
          >
            {/* Sliding pill */}
            <div
              className="absolute top-1 bottom-1 transition-transform duration-300"
              style={{
                left: "4px",
                width: "calc(50% - 4px)",
                background: "#1e2330",
                border: "1px solid #232a3d",
                borderRadius: "10px",
                transform: active === "qr" ? "translateX(100%)" : "translateX(0)",
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: "none",
              }}
            />

            {(["pair", "qr"] as Tab[]).map((tab) => {
              const Icon = tab === "pair" ? Phone : QrCode;
              const label = tab === "pair" ? "Pair Code" : "QR Code";
              return (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className="relative z-10 flex items-center justify-center gap-[7px] py-[11px] transition-colors duration-200"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: active === tab ? "#f0f4ff" : "#4a5570",
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Sliding panels */}
      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          swipeStartX.current = e.touches[0].clientX;
          swipeStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - swipeStartX.current;
          const dy = e.changedTouches[0].clientY - swipeStartY.current;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
            if (dx < 0 && active === "pair") switchTab("qr");
            if (dx > 0 && active === "qr") switchTab("pair");
          }
        }}
      >
        <div
          className="flex"
          style={{
            width: "200%",
            transform: active === "qr" ? "translateX(-50%)" : "translateX(0)",
            transition: "transform 0.34s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ width: "50%" }}>
            <PairPanel />
          </div>
          <div style={{ width: "50%" }}>
            <QRPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
