import { useRef, useState } from "react";
import { Phone, Copy, Check } from "lucide-react";
import { StepsCarousel } from "./StepsCarousel";
import { Reveal } from "./Reveal";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const STEPS = [
  { n: "01", text: "Enter your full number with country code — no + or spaces." },
  { n: "02", text: "Open WhatsApp → Linked Devices → Link with phone number." },
  { n: "03", text: "Type the 8-digit code shown. Session ID gets sent to you." },
];

type StatusType = "ok" | "err" | "info" | null;

export const PairPanel = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [status, setStatus] = useState<{ msg: string; type: StatusType }>({ msg: "", type: null });
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRequest = async () => {
    const raw = inputRef.current?.value.replace(/\D/g, "").trim() ?? "";
    if (!raw) {
      setStatus({ msg: "Enter your phone number first.", type: "err" });
      return;
    }

    setLoading(true);
    setCode(null);
    setStatus({ msg: "", type: null });

    try {
      const res = await fetch(`${API_URL}/code?number=${encodeURIComponent(raw)}`);
      const data = await res.json();

      if (data.code) {
        setCode(data.code);
        setStatus({ msg: "Enter this code in WhatsApp → Linked Devices → Link with phone number.", type: "info" });
      } else {
        setStatus({ msg: data.error ?? "Something went wrong. Try again.", type: "err" });
      }
    } catch {
      setStatus({ msg: "Connection error. Check your network and try again.", type: "err" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const statusClass =
    status.type === "ok"
      ? "status-ok"
      : status.type === "err"
      ? "status-err"
      : "status-info";

  return (
    <div className="p-6 pb-8 flex flex-col gap-0">
      <Reveal>
        <StepsCarousel steps={STEPS} />
      </Reveal>

      <Reveal delay={60}>
        <div className="glass-card p-5 flex flex-col gap-4">
          {/* Phone input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phoneInput"
              className="text-[10px] font-[700] tracking-[1px] uppercase text-text3"
            >
              Phone Number
            </label>
            <div className="phone-input-wrap">
              <span
                className="mono text-[14px] font-[500] text-accent-bright px-4 border-r shrink-0 flex items-center h-[50px]"
                style={{ borderColor: "#1c2235", userSelect: "none" }}
              >
                +
              </span>
              <input
                ref={inputRef}
                id="phoneInput"
                type="tel"
                inputMode="numeric"
                placeholder="27712345678"
                maxLength={20}
                className="flex-1 h-[50px] bg-transparent border-none outline-none mono text-[14px] font-[500] text-text1 px-4"
                style={{ letterSpacing: "0.5px" }}
                onKeyDown={(e) => e.key === "Enter" && handleRequest()}
              />
            </div>
          </div>

          {/* Action button */}
          <button
            className="btn-primary"
            disabled={loading}
            onClick={handleRequest}
          >
            {loading ? (
              <span className="spinner" style={{ borderTopColor: "#fff" }} />
            ) : (
              <>
                <Phone size={15} />
                Get Pair Code
              </>
            )}
          </button>

          {/* Code result */}
          {code && (
            <div
              className="flex flex-col gap-3 p-4 rounded-[13px]"
              style={{ background: "#0d0f14", border: "1px solid #1c2235" }}
            >
              <span className="text-[9px] font-[700] tracking-[1.5px] uppercase text-text3">
                Your Pairing Code
              </span>
              <div
                className="mono text-[32px] font-[600] text-accent-bright text-center py-2"
                style={{ letterSpacing: "6px" }}
              >
                {code}
              </div>
              <button className="btn-secondary" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check size={12} style={{ color: "#10b981" }} />
                    <span style={{ color: "#10b981" }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          )}

          {/* Status message */}
          {status.msg && (
            <div
              className={`${statusClass} text-[11px] font-[600] text-center px-4 py-[10px] rounded-[9px]`}
            >
              {status.msg}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};
