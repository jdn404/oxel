import { Github, Send, MessageCircle, Youtube } from "lucide-react";
import { Reveal } from "./Reveal";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/OxelLabs",
    Icon: Github,
    color: "#f0f4ff",
  },
  {
    label: "Telegram",
    href: "https://t.me/mr_afrix",
    Icon: Send,
    color: "#26a5e4",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbDJ0yX6xCSOxzb6vA29",
    Icon: MessageCircle,
    color: "#25d366",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mr-afrixx",
    Icon: Youtube,
    color: "#ff0000",
  },
];

export const Hero = () => (
  <section className="relative w-full">
    {/* Banner */}
    <div className="relative h-[200px] w-full overflow-hidden">
      <img
        src="https://files.catbox.moe/gxtkgb.jpg"
        alt="OXEL M1 Banner"
        className="w-full h-full object-cover object-top"
        style={{ filter: "brightness(0.5) saturate(0.65)" }}
        draggable={false}
        referrerPolicy="no-referrer"
        loading="eager"
      />
      {/* Gradient fade to bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,7,10,0.15) 40%, rgba(6,7,10,0.82) 72%, #06070a 100%)",
        }}
      />
      {/* Top-right badge */}
      <div className="absolute top-4 right-4 badge">OxelLabs Pair</div>

      {/* Subtle blue orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />
    </div>

    {/* Identity row — overlaps banner */}
    <div className="relative px-6 -mt-14 z-10">
      <Reveal>
        <div className="flex items-end gap-4">
          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div
              className="absolute -inset-[2px] rounded-[22px] animate-glow-pulse"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6, #60a5fa)",
                borderRadius: "22px",
              }}
            />
            <div
              className="relative w-[84px] h-[84px] overflow-hidden"
              style={{ borderRadius: "20px", border: "2px solid #06070a" }}
            >
              <img
                src="https://files.catbox.moe/xcwgz9.png"
                alt="OXEL M1"
                className="w-full h-full object-cover"
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Name + sub */}
          <div className="pb-1 min-w-0">
            <h1 className="text-[22px] font-[800] tracking-tight leading-none glow-text text-text1">
              OXEL M1
            </h1>
            <p className="mt-[6px] text-[11px] font-[600] text-text3 tracking-[0.5px] uppercase">
              Session Generator · by OxelLabs
            </p>
          </div>
        </div>
      </Reveal>

      {/* Socials row */}
      <Reveal delay={80}>
        <div className="mt-5 flex gap-2">
          {SOCIALS.map(({ label, href, Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex-1 flex items-center justify-center gap-[5px] glass-card-sm py-[9px] px-2 text-text2 text-[10.5px] font-[600] tracking-[0.2px] whitespace-nowrap transition-all duration-200 hover:-translate-y-[2px] hover:text-text1 hover:border-border2 active:scale-95"
              style={{ borderRadius: "10px" }}
            >
              <Icon size={13} style={{ color, flexShrink: 0 }} />
              {label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>

    {/* Separator */}
    <Reveal delay={120}>
      <div
        className="mx-6 mt-6"
        style={{ height: "1px", background: "#1c2235" }}
      />
    </Reveal>
  </section>
);
