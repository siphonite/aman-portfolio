import { CONTACT_SOCIAL_LINKS } from "../../data/contactSocial";
import ContactForm from "./ContactForm";
import VisitorCounter from "./VisitorCounter";

export default function ContactSection() {
    return (
        <section className="py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Left Column - Contact Info */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                        If you have any inquiries, please feel free to reach out. You can
                        contact me via email at{" "}
                        <a
                            href="mailto:amansinha327@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
                        >
                            amansinha327@gmail.com
                        </a>
                    </p>

                    <div>
                        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-6">
                            Follow me:
                        </p>
                        <div className="flex gap-6">
                            {CONTACT_SOCIAL_LINKS.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg
                                                 hover:border-cyan-500/50 hover:bg-zinc-800/50
                                                 transition-all duration-200 group"
                                    >
                                        <Icon
                                            size={22}
                                            className="text-zinc-400 group-hover:text-cyan-400 transition-colors"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
                    <ContactForm />
                </div>
            </div>

            {/* Visitor Counter */}
            <VisitorCounter />
        </section>
    );
}
