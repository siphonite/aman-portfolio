import SocialLinks from "../../components/SocialLinks";
import MusicPlayer from "../../components/MusicPlayer";

export default function Hero() {
    return (
        <section className="min-h-[40vh] md:min-h-[50vh] pb-8 md:pb-0">
            {/* Main 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
                <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-2 md:mb-4 leading-[0.9]">
                        Aman Kumar
                    </h1>

                    <h2 className="text-xl md:text-2xl font-medium text-zinc-300 mb-6 tracking-tight">
                        Learning and Building
                    </h2>

                    <p className="text-base md:text-lg text-zinc-500 max-w-lg leading-relaxed font-light mb-8">
                        I have 3+ years of experience in sales, operations, and technical support, and I’m now learning, building, and shipping projects across backend, systems, and data-focused domains.
                    </p>
                    <SocialLinks />
                </div>

                <div className="flex justify-center lg:justify-end opacity-80 hover:opacity-100 transition-opacity duration-500 scale-95 origin-center lg:origin-bottom-right">
                    <MusicPlayer />
                </div>
            </div>
        </section>
    );
}
