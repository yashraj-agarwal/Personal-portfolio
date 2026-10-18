import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useLenis } from "lenis/react";
import works from "../data/designWorks.json";
import "../styles/design.css";

const categories = ["All work", "Mockups", "Interfaces", "Posters"];

export default function Design() {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const galleryRef = useRef(null);
  const lenis = useLenis();
  const visible =
    category === "All work"
      ? works
      : works.filter((work) => work.category === category);
  const selectedIndex = visible.findIndex((work) => work.id === selected);
  const active = visible[selectedIndex];
  const isOpen = Boolean(active);

  useEffect(() => {
    const nodes = galleryRef.current?.querySelectorAll(".design-work");
    if (!nodes || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06 },
    );
    nodes.forEach((node) => {
      node.classList.add("will-reveal");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [category]);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const step = (direction) => {
    setSelected(
      visible[(selectedIndex + direction + visible.length) % visible.length].id,
    );
  };

  return (
    <section className="design-page">
      <div className="design-shell">
        <header className="design-intro">
          <div className="design-eyebrow">
            <span className="design-status-dot" /> VISUAL PLAYGROUND{" "}
            <span className="design-edition">VOL. 01 / SELECTED WORK</span>
          </div>
          <div className="design-heading-row">
            <h1>
              Ideas take
              <br />
              <span>shape.</span>
              <sup>({String(works.length).padStart(2, "0")})</sup>
            </h1>
            <div className="design-intro-note">
              <span className="design-note-cross" aria-hidden="true">
                +
              </span>
              <p>
                Interfaces, posters &amp; things
                <br /> that started with <em>what if.</em>
              </p>
              <a
                href="#design-work"
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("design-work")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="design-explore"
              >
                EXPLORE THE COLLECTION <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </header>

        <div className="design-collection-bar" id="design-work">
          <div
            className="design-filters"
            role="group"
            aria-label="Filter design work"
          >
            {categories.map((name) => (
              <button
                type="button"
                key={name}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
                <span>
                  {String(
                    name === "All work"
                      ? works.length
                      : works.filter((work) => work.category === name).length,
                  ).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <span className="design-view-note" aria-live="polite">
            {String(visible.length).padStart(2, "0")} PIECES / CLICK TO OPEN{" "}
            <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="design-masonry" ref={galleryRef}>
          {visible.map((work, index) => (
            <article key={work.id} className="design-work">
              <button
                type="button"
                className={`design-image-button ${work.category === "Mockups" ? "is-mockup" : ""}`}
                onClick={() => setSelected(work.id)}
                aria-label={`View ${work.title}`}
              >
                <img
                  src={work.src}
                  srcSet={work.srcSet}
                  sizes="(min-width: 1600px) 480px, (min-width: 1024px) 31vw, (min-width: 600px) 46vw, 92vw"
                  width={work.width}
                  height={work.height}
                  alt={work.description}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="design-image-overlay" aria-hidden="true">
                  <span>VIEW PIECE</span>
                  <ArrowUpRight size={20} />
                </span>
              </button>
              <div className="design-work-caption">
                <div>
                  <span className="design-work-category">{work.category}</span>
                  <h2>{work.title}</h2>
                </div>
                <span className="design-work-index">/{work.id}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="design-endnote">
          <span>ALWAYS A WORK IN PROGRESS.</span>
          <span>
            MORE IDEAS ON THE WAY <span className="design-status-dot" />
          </span>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="design-viewer"
        aria-labelledby="design-viewer-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        data-lenis-prevent
      >
        {active && (
          <div className="design-viewer-inner">
            <div className="design-viewer-top">
              <span>
                {active.category} / {active.id}
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setSelected(null)}
                aria-label="Close image"
              >
                <X size={22} />
              </button>
            </div>
            <div className="design-viewer-image">
              <img
                src={active.full}
                width={active.width}
                height={active.height}
                alt={active.description}
              />
            </div>
            <div className="design-viewer-bottom">
              <div>
                <h2 id="design-viewer-title">{active.title}</h2>
                <p>{active.description}</p>
              </div>
              <div className="design-viewer-controls">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <span>
                  {selectedIndex + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
