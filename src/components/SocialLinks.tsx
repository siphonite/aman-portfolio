import { SOCIAL_LINKS } from "../data/social";

export default function SocialLinks() {
    return (
        <div className="mt-12 flex gap-8">
            {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                    >
                        <Icon
                            size={24}
                            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                        />
                    </a>
                );
            })}
        </div>
    );
}
