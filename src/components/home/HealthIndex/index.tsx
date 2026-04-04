import ProgressBar from "./ProgressBar";
import PieChart from "./PieChart";

const metrics = [
  {
    label: "Metric",
    value: 80,
    status: "normal"
  },
  {
    label: "Metric",
    value: 20,
    status: "critical"
  },
  {
    label: "Metric",
    value: 60,
    status: "warning"
  },
]

export default function HealthIndex() {  
    return (
        <div style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            // gap: 24,
            padding: "26px 30px",
            height: "100%",
            backgroundColor: "#171719",
            fontSize: 14,
            color: "#fff",
            borderRight: "1px solid #222223"
        }}>
            <div style={{ marginBottom: 30, fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em" }}>Индекс здоровья</div>

            <PieChart />

            <span style={{
              marginBottom: 45,
              padding: "6px 20px",
              borderRadius: 40,
              backgroundColor: "#49C86E1A",
              border: "1px solid #49C86E",
              color: "#49C86E",
              textAlign: "center"
            }}>
              Норма
            </span>

            { metrics.map(metic => 
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400 }}>
                    <span>{ metic.label }</span>
                    <span>{ metic.value }%</span>
                  </div>
                  <ProgressBar 
                    value={metic.value}
                    status={metic.status}
                  />
                </div>
            )}
        </div>
    )
}