import { FileDown } from "lucide-react";

const RESUME_FILENAME = "AMAN KUMAR - CV 2025.pdf";

export default function ResumePage() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-4 md:px-8 pb-20 md:pb-0">
            <div className="text-center max-w-lg">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                    <FileDown size={32} className="text-white md:hidden" />
                    <FileDown size={40} className="text-white hidden md:block" />
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    My Resume
                </h1>

                <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 md:mb-10">
                    Click the button below to download my resume and learn more about my professional experience.
                </p>

                <a
                    href={`/${RESUME_FILENAME}`}
                    download={RESUME_FILENAME}
                    className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 
                             text-white font-semibold rounded-lg text-base md:text-lg
                             hover:from-cyan-400 hover:to-cyan-500 
                             transform hover:scale-[1.02] 
                             transition-all duration-200 
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                    <FileDown size={24} />
                    Download Resume
                </a>

                <div className="mt-12">
                    <a
                        href="/"
                        className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
