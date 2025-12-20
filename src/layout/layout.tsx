import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div style={{ display: "flex" }}>
            <Navbar />
            <main style={{ marginLeft: "80px", padding: "24px", width: "100%" }}>
                {children}
            </main>
        </div>
    );
}
