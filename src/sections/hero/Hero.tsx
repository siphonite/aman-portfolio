import SocialLinks from "./SocialLinks";

export default function Hero() {
    return (
        <section className="min-h-[40vh] md:min-h-[50vh] pb-8 md:pb-0">
            {/* Main content */}
            <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 md:mb-8 leading-[0.9]">
                    Aman Kumar
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-500 max-w-xl leading-relaxed font-light">
                    I am a results-driven sales and operations professional with years of experience in global client relations, now learning, building and shipping on-chain projects in tech, blockchain, and Web3.
                </p>
                <SocialLinks />
            </div>
        </section>
    );
}
