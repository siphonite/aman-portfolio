import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function getOrdinalSuffix(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export default function VisitorCounter() {
    const [visitorNumber, setVisitorNumber] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const incrementVisitor = async () => {
            try {
                // Check if already counted in this session
                const sessionKey = "aman-portfolio-session";
                const alreadyCounted = sessionStorage.getItem(sessionKey);

                if (alreadyCounted) {
                    // Just fetch current count without incrementing
                    const { data } = await supabase
                        .from("visitor_counter")
                        .select("count")
                        .eq("id", 1)
                        .single();

                    if (data) {
                        setVisitorNumber(data.count);
                    }
                } else {
                    // Increment and get new count
                    const { data: currentData } = await supabase
                        .from("visitor_counter")
                        .select("count")
                        .eq("id", 1)
                        .single();

                    if (currentData) {
                        const newCount = currentData.count + 1;

                        await supabase
                            .from("visitor_counter")
                            .update({ count: newCount })
                            .eq("id", 1);

                        setVisitorNumber(newCount);
                        sessionStorage.setItem(sessionKey, "true");
                    }
                }
            } catch (error) {
                console.error("Error updating visitor count:", error);
            } finally {
                setIsLoading(false);
            }
        };

        incrementVisitor();
    }, []);

    if (isLoading) {
        return (
            <div className="text-center pt-6 pb-2">
                <p className="text-zinc-500 text-sm tracking-wide">
                    Loading visitor count...
                </p>
            </div>
        );
    }

    if (visitorNumber === null) {
        return null;
    }

    return (
        <div className="text-center pt-6 pb-2">
            <p className="text-zinc-400 text-sm tracking-wide">
                You are the{" "}
                <span className="text-cyan-400 font-semibold">
                    {visitorNumber.toLocaleString()}
                    {getOrdinalSuffix(visitorNumber)}
                </span>{" "}
                visitor
            </p>
        </div>
    );
}
