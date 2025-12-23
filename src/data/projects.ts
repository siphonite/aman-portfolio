import type { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: 1,
        name: "What's Next?",
        description:
            "Decentralized candlestick prediction market built on Solana with on-chain market logic and real-time charts.",
        tech: ["Rust", "Solana", "Anchor", "React", "TypeScript"],
        github: "https://github.com/Siphonite/whatsnext",
        link: "https://whatsnext-black.vercel.app/",
        image: "/whatsnext-preview.png",
    },
    {
        id: 2,
        name: "Reddit StartUp Idea Generator",
        description:
            "StartUp Idea Generator which uses Reddit links to generate ideas using Gemini API.",
        tech: ["Rust", "React", "TypeScript"],
        github: "https://github.com/Siphonite/Reddit_StartUp_Idea_Generator",
        link: "https://reddit-ideas-five.vercel.app/",
        image: "/reddit-ideas-preview.png",
    },
];
