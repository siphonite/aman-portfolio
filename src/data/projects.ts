import type { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: 1,
        name: "FIRST",
        description:
            "Deterministic crash-consistency testing framework for storage and WAL-based systems. Enables reproducible crash/restart cycles and invariant-based recovery validation. Focused on reliability testing, failure reproduction, and correctness guarantees.",
        tech: ["Rust", "Filesystems", "Testing", "Crash Consistency"],
        github: "https://github.com/siphonite/first",
        link: "https://crates.io/crates/first",
        image: "/first-preview.jpeg",
    },
    {
        id: 2,
        name: "What's Next?",
        description:
            "Solana-Based Candlestick Prediction Market. Delivered an end-to-end product with backend, frontend, and system integration. Implemented secure workflows, real-time data display, and user interactions.",
        tech: ["Rust", "Solana", "Anchor", "React", "TypeScript"],
        github: "https://github.com/siphonite/whatsnext",
        link: "https://whatsnext-black.vercel.app/",
        image: "/whatsnext-preview.png",
    },
];
