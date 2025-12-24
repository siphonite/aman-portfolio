import { FaGithub, FaLinkedin, FaDiscord, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { SocialLink } from "../types";

export const CONTACT_SOCIAL_LINKS: SocialLink[] = [
    { icon: FaGithub, label: "GitHub", url: "https://github.com/Siphonite" },
    { icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/siphonite/" },
    { icon: FaXTwitter, label: "X", url: "https://x.com/siphonitee" },
    { icon: FaMedium, label: "Medium", url: "https://medium.com/@amansinha327" },
    { icon: FaDiscord, label: "Discord", url: "https://discord.com/users/siphonite" },
];
