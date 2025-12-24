function getOrdinalSuffix(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export default function VisitorCounter() {
    // Start at 0 - will be replaced with actual count when deployed
    const visitorNumber = 0;

    return (
        <div className="text-center pt-6 pb-2">
            <p className="text-zinc-400 text-sm tracking-wide">
                You are the{" "}
                <span className="text-cyan-400 font-semibold">
                    {visitorNumber}
                    {getOrdinalSuffix(visitorNumber)}
                </span>{" "}
                visitor
            </p>
        </div>
    );
}
