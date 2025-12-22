import { useEffect, useState, useRef } from "react";

type ContributionDay = {
    date: string;
    count: number;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// GitHub-style green palette
function getColor(count: number): string {
    if (count >= 15) return "#39d353";
    if (count >= 10) return "#26a641";
    if (count >= 5) return "#006d32";
    if (count >= 3) return "#0e4429";
    if (count >= 1) return "#0e4429";
    return "#161b22";
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

const TOTAL_WEEKS = 53;
const DAY_LABEL_WIDTH = 32;

export default function ContributionGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
    const [monthLabels, setMonthLabels] = useState<{ month: string; weekIndex: number }[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cellSize, setCellSize] = useState(12);
    const [gap, setGap] = useState(3);

    // Calculate responsive cell size based on container width
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const availableWidth = containerWidth - DAY_LABEL_WIDTH;
                // Calculate optimal cell size to fit all weeks with gaps
                const maxCellAndGap = availableWidth / TOTAL_WEEKS;
                const newGap = Math.max(2, Math.min(4, Math.floor(maxCellAndGap * 0.2)));
                const newCellSize = Math.max(10, Math.min(14, Math.floor(maxCellAndGap - newGap)));
                setCellSize(newCellSize);
                setGap(newGap);
            }
        };

        // Initial size
        const timer = setTimeout(updateSize, 50);
        window.addEventListener("resize", updateSize);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    useEffect(() => {
        const year = new Date().getFullYear();
        const jan1 = new Date(`${year}-01-01`);

        fetch(`https://github-contributions-api.jogruber.de/v4/Siphonite?y=${year}`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data.contributions)) {
                    setIsLoading(false);
                    return;
                }

                const yearData: ContributionDay[] = data.contributions
                    .filter((d: ContributionDay) => d.date.startsWith(year.toString()))
                    .sort(
                        (a: ContributionDay, b: ContributionDay) =>
                            new Date(a.date).getTime() - new Date(b.date).getTime()
                    );

                const organizedWeeks: ContributionDay[][] = [];
                const labels: { month: string; weekIndex: number }[] = [];
                const seenMonths = new Set<number>();

                let currentWeek: ContributionDay[] = [];
                const startDay = jan1.getDay();

                for (let i = 0; i < startDay; i++) {
                    currentWeek.push({ date: "", count: -1 });
                }

                yearData.forEach((day) => {
                    const date = new Date(day.date);
                    const month = date.getMonth();
                    const weekIndex = Math.floor(
                        (date.getTime() - jan1.getTime() + startDay * 24 * 60 * 60 * 1000) /
                        (7 * 24 * 60 * 60 * 1000)
                    );

                    if (!seenMonths.has(month)) {
                        labels.push({ month: MONTHS[month], weekIndex });
                        seenMonths.add(month);
                    }

                    currentWeek.push(day);
                    if (currentWeek.length === 7) {
                        organizedWeeks.push(currentWeek);
                        currentWeek = [];
                    }
                });

                if (currentWeek.length > 0) {
                    organizedWeeks.push(currentWeek);
                }

                setWeeks(organizedWeeks);
                setMonthLabels(labels);
                setTotalContributions(yearData.reduce((sum, d) => sum + d.count, 0));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    const weekWidth = cellSize + gap;

    return (
        <div className="mt-16 w-full" ref={containerRef}>
            {/* Header */}
            <div className="mb-3">
                <span className="text-sm font-medium text-zinc-300">
                    {totalContributions.toLocaleString()} contributions in {new Date().getFullYear()}
                </span>
            </div>

            {/* Graph Container */}
            <div className="relative w-full">
                {/* Month labels */}
                <div
                    className="relative h-5 mb-2"
                    style={{ marginLeft: `${DAY_LABEL_WIDTH}px` }}
                >
                    {!isLoading && monthLabels.map((label, i) => (
                        <span
                            key={i}
                            className="absolute text-[11px] text-zinc-400"
                            style={{ left: `${label.weekIndex * weekWidth}px` }}
                        >
                            {label.month}
                        </span>
                    ))}
                </div>

                {/* Graph with day labels */}
                <div className="flex w-full">
                    {/* Day labels */}
                    <div
                        className="flex-shrink-0 flex flex-col text-[11px] text-zinc-500"
                        style={{ width: `${DAY_LABEL_WIDTH}px`, gap: `${gap}px` }}
                    >
                        <span style={{ height: `${cellSize}px` }}></span>
                        <span style={{ height: `${cellSize}px`, lineHeight: `${cellSize}px` }}>Mon</span>
                        <span style={{ height: `${cellSize}px` }}></span>
                        <span style={{ height: `${cellSize}px`, lineHeight: `${cellSize}px` }}>Wed</span>
                        <span style={{ height: `${cellSize}px` }}></span>
                        <span style={{ height: `${cellSize}px`, lineHeight: `${cellSize}px` }}>Fri</span>
                        <span style={{ height: `${cellSize}px` }}></span>
                    </div>

                    {/* Contribution grid */}
                    <div className="flex-1 overflow-hidden">
                        <div className="flex" style={{ gap: `${gap}px` }}>
                            {isLoading
                                ? Array.from({ length: TOTAL_WEEKS }).map((_, w) => (
                                    <div key={w} className="flex flex-col" style={{ gap: `${gap}px` }}>
                                        {Array.from({ length: 7 }).map((_, d) => (
                                            <div
                                                key={d}
                                                className="rounded-sm bg-zinc-800/50 animate-pulse"
                                                style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                                            />
                                        ))}
                                    </div>
                                ))
                                : weeks.map((week, wi) => (
                                    <div key={wi} className="flex flex-col" style={{ gap: `${gap}px` }}>
                                        {week.map((day, di) => (
                                            <div
                                                key={di}
                                                className={`rounded-sm transition-transform ${day.count >= 0 ? "hover:scale-110 hover:ring-1 hover:ring-white/50 cursor-pointer" : ""
                                                    }`}
                                                style={{
                                                    width: `${cellSize}px`,
                                                    height: `${cellSize}px`,
                                                    backgroundColor: day.count === -1 ? "transparent" : getColor(day.count),
                                                }}
                                                onMouseEnter={() => day.count >= 0 && setHoveredDay(day)}
                                                onMouseLeave={() => setHoveredDay(null)}
                                            />
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Tooltip */}
                {hoveredDay && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-600 rounded-md px-3 py-1.5 shadow-lg z-20 pointer-events-none">
                        <p className="text-xs text-white whitespace-nowrap">
                            {hoveredDay.count === 0
                                ? "No contributions"
                                : `${hoveredDay.count} contribution${hoveredDay.count !== 1 ? "s" : ""}`}
                            {" on "}{formatDate(hoveredDay.date)}
                        </p>
                    </div>
                )}

                {/* Legend */}
                <div className="flex items-center gap-2 mt-3 justify-end">
                    <span className="text-[11px] text-zinc-500">Less</span>
                    <div className="flex" style={{ gap: `${gap}px` }}>
                        {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((color, i) => (
                            <div
                                key={i}
                                className="rounded-sm"
                                style={{ width: `${cellSize}px`, height: `${cellSize}px`, backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] text-zinc-500">More</span>
                </div>
            </div>
        </div>
    );
}
