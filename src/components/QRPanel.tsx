import { useState } from "react";
import { RefreshCw, QrCode } from "lucide-react";
import { StepsCarousel } from "./StepsCarousel";
import { Reveal } from "./Reveal";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const STEPS = [
  { n: "01", text: "Tap Generate QR Code below to get your code." },
  { n: "02", text: "Open WhatsApp → Linked Devices → Link a Device." },
  { n: "03", text: "Scan the QR code. Session ID gets delivered to you." },
];

type StatusType = "ok" | "err" | "info" | null;

export const QRPanel = () => {
  const [loading, setLoading] = useState(false);
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<{ msg: string; type: StatusType }>({ msg: "", type: null });

  const handleGenerate = async () => {
    setLoading(true);
    setQrSrc(null);
    setStatus({ msg: "", type: null });

    try {
      const res = await fetch(`${API_URL}/qr`);
      const data = await res.json();

      if (data.qr) {
        setQrSrc(data.qr);
        setStatus({ msg: "Scan with WhatsApp → Linked Devices → Link a Device.", type: "info" });
      } else {
        setStatus({ msg: data.error ?? "Failed to generate QR. Try again.", type: "err" });
      }
    } catch {
      setStatus({ msg: "Connection error. Check your network and try again.", type: "err" });
    } finally {
      setLoading(false);
    }
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
          {/* QR display box */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-[196px] h-[196px] flex items-center justify-center overflow-hidden"
              style={{
                background: "#0d0f14",
                border: "1px solid #1c2235",
                borderRadius: "16px",
              }}
            >
              {loading ? (
                <div
                  className="spinner"
                  style={{ width: 28, height: 28, borderWidth: 3, borderTopColor: "#3b82f6" }}
                />
              ) : qrSrc ? (
                <img
                  src={qrSrc}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                  style={{ borderRadius: "14px" }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2.5">
                  <QrCode size={40} color="#4a5570" />
                  <span className="text-[10px] text-text3 font-[500] tracking-[0.3px]">
                    QR will appear here
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Generate button */}
          <button
            className="btn-primary"
            disabled={loading}
            onClick={handleGenerate}
          >
            {loading ? (
              <span className="spinner" style={{ borderTopColor: "#fff" }} />
            ) : (
              <>
                <RefreshCw size={15} />
                Generate QR Code
              </>
            )}
          </button>

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
