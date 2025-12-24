import SectionHeader from "../../components/SectionHeader";
import { WORK_EXPERIENCES } from "../../data/experience";

export default function ExperienceSection() {
    return (
        <section className="py-32">
            <SectionHeader title="Work Experience" />

            <div className="space-y-16">
                {WORK_EXPERIENCES.map((exp) => (
                    <div
                        key={exp.id}
                        className="group relative"
                    >
                        {/* Company and Role Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    {/* Client Logo */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white overflow-hidden border border-zinc-700/50 group-hover:border-zinc-600 transition-colors">
                                        <img
                                            src={exp.clientLogo}
                                            alt={`${exp.client} logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-zinc-400 text-sm">
                                            {exp.company} • {exp.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 ml-[52px]">
                                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                                        Client: {exp.client}
                                    </span>
                                </div>
                            </div>
                            <div className="mono text-zinc-500 text-sm md:text-right shrink-0">
                                {exp.period}
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <ul className="space-y-3 ml-[52px]">
                            {exp.responsibilities.map((resp, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed"
                                >
                                    <span className="text-emerald-500 mt-1.5 text-xs">▸</span>
                                    <span className="group-hover:text-zinc-300 transition-colors">{resp}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Subtle divider line */}
                        {exp.id !== WORK_EXPERIENCES.length && (
                            <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
