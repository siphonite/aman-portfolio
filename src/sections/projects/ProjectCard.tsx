import { Github, ExternalLink } from "lucide-react";
import type { Project } from "../../types";

type Props = {
    project: Project;
};

export default function ProjectCard({ project }: Props) {
    // Use project image or fallback to placeholder
    const projectImage = project.image || `https://picsum.photos/seed/${project.id}/800/450`;

    return (
        <div
            className="group p-6 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-300 flex flex-col h-full"
        >
            {/* Project Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-zinc-800/50 border border-zinc-700/50">
                <img
                    src={projectImage}
                    alt={`${project.name} preview`}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Header with title and links */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.name}
                </h3>
                <div className="flex gap-2">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-colors duration-200"
                            title="View GitHub Repository"
                        >
                            <Github
                                size={18}
                                className="text-zinc-400 hover:text-white transition-colors"
                            />
                        </a>
                    )}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-zinc-800/50 hover:bg-cyan-500/20 transition-colors duration-200"
                            title="View Live Preview"
                        >
                            <ExternalLink
                                size={18}
                                className="text-zinc-400 hover:text-cyan-400 transition-colors"
                            />
                        </a>
                    )}
                </div>
            </div>

            {/* Tech stack tags */}
            <div className="flex gap-2 flex-wrap mb-4">
                {project.tech.map((t, i) => (
                    <span
                        key={i}
                        className="text-[10px] mono uppercase px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                    >
                        {t}
                    </span>
                ))}
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed flex-grow">
                {project.description}
            </p>
        </div>
    );
}
