import { useEffect, useState } from "react";

function getOrdinalSuffix(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export default function VisitorCounter() {
    const [visitorNumber, setVisitorNumber] = useState<number | null>(null);

    useEffect(() => {
        // Get or generate visitor number from localStorage
        const storedNumber = localStorage.getItem("visitorNumber");
        if (storedNumber) {
            setVisitorNumber(parseInt(storedNumber, 10));
        } else {
            // Generate a random number between 450-550 for demo purposes
            const newNumber = Math.floor(Math.random() * 100) + 450;
            localStorage.setItem("visitorNumber", newNumber.toString());
            setVisitorNumber(newNumber);
        }
    }, []);

    if (visitorNumber === null) return null;

    return (
        <div className="text-center py-8">
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
