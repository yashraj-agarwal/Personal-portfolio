import { useEffect, useMemo, useState, type CSSProperties } from "react";
import ContributionSkyline, {
  buildGrid,
  computeStats,
  dayMs,
  type ContributionDay,
} from "@/components/ui/contribution-skyline";

const USERNAME = "yashraj-agarwal";
const theme = {
  "--color-background": "#080808",
  "--color-foreground": "#e2e2e2",
  "--color-border": "#242424",
  "--color-muted-foreground": "#969696",
} as CSSProperties;

export default function GithubActivity() {
  const [view, setView] = useState<"2d" | "3d">("2d");
  const [data, setData] = useState<ContributionDay[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const stats = useMemo(() => {
    if (!data) return null;
    const end = Math.max(...data.map((day) => dayMs(day.date)));
    return computeStats(buildGrid(data, end).cells);
  }, [data]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    const timeout = setTimeout(() => controller.abort(), 10000);
    setError(false);
    async function load() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Could not load GitHub activity");
        const payload = await response.json();
        if (
          !Array.isArray(payload.contributions) ||
          !payload.contributions.length
        ) {
          throw new Error("Missing contribution data");
        }
        const days: ContributionDay[] = payload.contributions.map(
          (day: ContributionDay) => {
            if (
              !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
              !Number.isFinite(day.count) ||
              day.count < 0
            ) {
              throw new Error("Invalid contribution data");
            }
            return { date: day.date, count: day.count };
          },
        );
        if (!controller.signal.aborted) setData(days);
      } catch {
        if (mounted) setError(true);
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      mounted = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  // Wait for real data and a painted flat scene before listening for intent.
  useEffect(() => {
    if (!data) return;
    let frame = 0;
    const rise = () => setView("3d");
    const arm = () => {
      window.addEventListener("pointermove", rise, {
        once: true,
        passive: true,
      });
      window.addEventListener("pointerdown", rise, {
        once: true,
        passive: true,
      });
      window.addEventListener("keydown", rise, { once: true });
    };
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(arm);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", rise);
      window.removeEventListener("pointerdown", rise);
      window.removeEventListener("keydown", rise);
    };
  }, [data]);

  return (
    <div className="w-full font-sans" style={theme}>
      {data ? (
        <>
          <ContributionSkyline
            data={data}
            view={view}
            embedded
            showStats={false}
            showLegend={false}
            showToggle={false}
            footer={null}
          />
          {stats && (
            <dl
              aria-label="GitHub activity in the last year"
              className="mx-auto mt-3 flex w-fit max-w-full flex-wrap justify-center gap-x-7 gap-y-3 font-spacemono sm:gap-x-10"
            >
              {[
                {
                  label: "contributions",
                  value: stats.total.toLocaleString(),
                  suffix: " / year",
                },
                {
                  label: "longest streak",
                  value: stats.longest.days,
                  suffix: " days",
                },
                {
                  label: "current streak",
                  value: stats.current.days,
                  suffix: " days",
                },
              ].map(({ label, value, suffix }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <dd className="m-0 whitespace-nowrap text-sm tabular-nums leading-none">
                    <span className="text-[#39ff14]/70">{value}</span>
                    <span className="text-[10px] text-white/30">{suffix}</span>
                  </dd>
                  <dt className="text-[8px] uppercase tracking-[0.16em] text-white/35">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </>
      ) : (
        <div
          className="flex min-h-[260px] flex-col items-center justify-center gap-3  p-5 text-sm text-white/60"
          role="status"
        >
          <span>
            {error
              ? "GitHub activity is unavailable right now."
              : "Loading GitHub contributions…"}
          </span>
          {error && (
            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
              className="text-[#39ff14] hover:underline"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
