import { Reveal } from "./Reveal";

export const Footer = () => (
  <Reveal>
    <footer className="px-6 pb-10 pt-2 flex flex-col items-center gap-1">
      <p className="text-[10px] text-text3 font-[500] tracking-[0.3px]">
        Built by{" "}
        <a
          href="https://github.com/OxelLabs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-bright hover:underline"
        >
          OxelLabs
        </a>
      </p>
      <p className="text-[9px] text-text3 opacity-50 font-[500]">
        OXEL M1 · Session Generator
      </p>
    </footer>
  </Reveal>
);
