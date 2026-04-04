export default function Header() { 
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "22px 30px",
            height: 68,
            backgroundColor: "#171719",
            fontSize: 14,
            color: "#fff",
            borderBottom: "1px solid #222223"
        }}>
            <div style={{display: "flex", alignItems: "center" }}>
                ТЕ33А 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1 13.1C12.6523 13.1 13.1 12.6523 13.1 12.1C13.1 11.5477 12.6523 11.1 12.1 11.1C11.5477 11.1 11.1 11.5477 11.1 12.1C11.1 12.6523 11.5477 13.1 12.1 13.1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                1234
            </div>

            <div style={{ marginRight: "auto", fontWeight: 600 }}>Локомотив Алматы - Астана</div>
            <div style={{ fontWeight: 600 }}>16:30:14</div>
            <div>04.04.2026</div>
        </div>
    )   
}