import Header from "../../components/home/Header";
import HealthIndex from "../../components/home/HealthIndex";

export default function HomePage() { 
    return (
        <div style={{
            height: "100vh",
            backgroundColor: "#111112"
        }}>
            <Header />

            <div style={{
                display: "flex",
                height: "calc(100%-68px)",
            }}>
                <HealthIndex />
            </div>
        </div>
    )   
};