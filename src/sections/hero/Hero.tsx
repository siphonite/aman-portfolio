import SocialLinks from "./SocialLinks";
import VideoCard from "./VideoCard";
import ContributionGraph from "./ContributionGraph";

export default function Hero() {
    return (
        <section
            style={{
                minHeight: "70vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
                alignItems: "center",
            }}
        >
            {/* Left: Text */}
            <div style={{ maxWidth: "720px" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                    Hi, I’m Aman.
                </h1>

                <p style={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
                    Former sales and operations professional, now building in tech,
                    blockchain, and decentralized systems. I focus on bridging business
                    understanding with technical execution.
                </p>

                <SocialLinks />
                <ContributionGraph />
            </div>

            {/* Right: Video */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <VideoCard />
            </div>
        </section>
    );
}
