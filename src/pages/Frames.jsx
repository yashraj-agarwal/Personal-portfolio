import InfiniteGallery from "../components/ui/3d-gallery-photography";
import { useMemo } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import images from "../data/framesImages.json";

export default function Frames() {
  const compact = useMediaQuery("(max-width: 767px)");
  const galleryImages = useMemo(
    () =>
      compact
        ? images.map((image) => ({ ...image, src: image.mobile }))
        : images,
    [compact],
  );
  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-[#050505]"
      aria-label="Frames photography gallery"
      data-lenis-prevent
    >
      <InfiniteGallery
        images={galleryImages}
        speed={1}
        visibleCount={compact ? 6 : 8}
        className="absolute inset-0 h-full w-full touch-none"
        fadeSettings={{
          fadeIn: { start: 0.04, end: 0.2 },
          fadeOut: { start: 0.8, end: 0.98 },
        }}
        blurSettings={{
          blurIn: { start: 0, end: 0.12 },
          blurOut: { start: 0.88, end: 1 },
          maxBlur: 2,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-14 flex justify-center mix-blend-exclusion md:top-16">
        <h1 className="font-syncopate text-[clamp(0.9rem,2vw,2rem)] font-bold uppercase tracking-[-0.06em] text-white">
          Archive<span className="text-[#39ff14]">.</span>
        </h1>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-28 px-5 text-center font-spacemono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/55 md:bottom-32">
        <p>Scroll, swipe or use arrow keys to explore</p>
        <p className="mt-1 text-white/30">
          A collection of perspectives · {images.length} frames
        </p>
      </div>
    </section>
  );
}
