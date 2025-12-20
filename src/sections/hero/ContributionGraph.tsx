const WEEKS = 24;
const DAYS = 7;

function getIntensity(week: number, day: number) {
    // Simple deterministic pattern (not random)
    return (week * day) % 5;
}

export default function ContributionGraph() {
    return (
        <div style={{ marginTop: "2.5rem" }}>
            <div
                style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                    marginBottom: "0.75rem",
                }}
            >
                Consistency
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
                {Array.from({ length: WEEKS }).map((_, week) => (
                    <div
                        key={week}
                        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                    >
                        {Array.from({ length: DAYS }).map((_, day) => {
                            const intensity = getIntensity(week, day);
                            const colors = [
                                "#1f2933",
                                "#083344",
                                "#0e7490",
                                "#22d3ee",
                                "#67e8f9",
                            ];

                            return (
                                <div
                                    key={day}
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "2px",
                                        backgroundColor: colors[intensity],
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
