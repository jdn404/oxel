import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Step {
  n: string;
  text: string;
}

interface StepsCarouselProps {
  steps: Step[];
}

export const StepsCarousel = ({ steps }: StepsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-5">
      {/* Header row with arrows */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-[700] tracking-[1.2px] uppercase text-text3"
        >
          How it works
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-7 h-7 flex items-center justify-center rounded-[8px] border border-border text-text3 hover:text-text1 hover:border-border2 hover:bg-surface2 transition"
            aria-label="Previous step"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-7 h-7 flex items-center justify-center rounded-[8px] border border-border text-text3 hover:text-text1 hover:border-border2 hover:bg-surface2 transition"
            aria-label="Next step"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden -mx-1 px-1" ref={emblaRef}>
        <div className="flex gap-2.5">
          {steps.map((step) => (
            <div
              key={step.n}
              className="shrink-0 w-[82%] glass-card-sm p-3.5 flex items-start gap-3"
            >
              {/* Step number badge */}
              <div
                className="shrink-0 w-[22px] h-[22px] flex items-center justify-center rounded-[6px] mono text-[9px] font-[800] text-accent-bright"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                }}
              >
                {step.n}
              </div>
              <p className="text-[11.5px] text-text2 font-[500] leading-[1.55]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`dot ${i === selected ? "active" : ""}`}
            style={{ width: i === selected ? 24 : 6 }}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
