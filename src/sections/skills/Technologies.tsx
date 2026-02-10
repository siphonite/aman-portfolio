import { TECHNOLOGIES } from "../../data/technologies";

function TechCard({ name, icon: Icon, color }: { name: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string }) {
    return (
        <div
            className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl 
                       bg-white/[0.02] border border-white/5 
                       hover:bg-white/[0.04] hover:border-white/10 
                       transition-all duration-300 ease-out
                       hover:scale-[1.02] min-w-[100px] md:min-w-[120px]"
            style={{
                boxShadow: `0 0 0 0 ${color}00`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px 0 ${color}15`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${color}00`;
            }}
        >
            <div style={{ color }} className="transition-transform duration-300 group-hover:scale-110">
                <Icon size={28} />
            </div>
            <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 text-center whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

interface MarqueeRowProps {
    technologies: typeof TECHNOLOGIES;
    direction: 'left' | 'right';
    speed?: number;
}

function MarqueeRow({ technologies, direction, speed = 30 }: MarqueeRowProps) {
    // Duplicate the items to create seamless loop
    const items = [...technologies, ...technologies];

    return (
        <div className="relative overflow-hidden w-full">
            {/* Gradient masks for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

            <div
                className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {items.map((tech, index) => (
                    <TechCard
                        key={`${tech.name}-${index}`}
                        name={tech.name}
                        icon={tech.icon}
                        color={tech.color}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Technologies() {
    // Split technologies into two groups for the two rows
    const midpoint = Math.ceil(TECHNOLOGIES.length / 2);
    const firstRow = TECHNOLOGIES.slice(0, midpoint);
    const secondRow = TECHNOLOGIES.slice(midpoint);

    return (
        <section className="pt-2 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-12">
                    Technologies & Tools
                </h2>

                {/* Animated Marquee Rows */}
                <div className="flex flex-col gap-4">
                    {/* First row: moves left to right */}
                    <MarqueeRow technologies={firstRow} direction="right" speed={35} />

                    {/* Second row: moves right to left */}
                    <MarqueeRow technologies={secondRow} direction="left" speed={40} />
                </div>
            </div>
        </section>
    );
}
