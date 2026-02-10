// Technologies data for grid display
import type { IconType } from "react-icons";
import {
    SiTypescript,
    SiRust,
    SiSolana,
    SiPython,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
    SiNodedotjs,
    SiReact,
    SiPostgresql,
    SiSupabase,
    SiDocker,
    SiPostman,
    SiLinux,
    SiGithub,
    SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaAnchor } from "react-icons/fa";
import { TbSql } from "react-icons/tb";
import { ClaudeLogo } from "../components/icons/ClaudeLogo";

export interface Technology {
    name: string;
    icon: IconType | React.ComponentType<{ size?: number; className?: string }>;
    color: string;
}

export const TECHNOLOGIES: Technology[] = [
    // Technical Stack
    { name: "Rust", icon: SiRust, color: "#DEA584" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "SQL", icon: TbSql, color: "#F29111" },
    { name: "Axum", icon: SiRust, color: "#DEA584" }, // Axum uses Rust icon
    { name: "Anchor", icon: FaAnchor, color: "#5FC4E7" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Solana", icon: SiSolana, color: "#9945FF" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "VS Code", icon: VscVscode, color: "#007ACC" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Claude Code", icon: ClaudeLogo, color: "#D97757" }, // Using Anthropic icon and color
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", icon: SiCss3, color: "#1572B6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
];
