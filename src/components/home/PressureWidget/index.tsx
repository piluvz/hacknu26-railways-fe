import ProgressBar from "./ProgressBar"

const metrics = [
  {
    label: "Metric",
    value: 80,
    unit: "бар",
    status: "normal"
  },
  {
    label: "Metric",
    value: 20,
    unit: "бар",
    status: "critical"
  },
  {
    label: "Metric",
    value: 60,
    unit: "бар",
    status: "warning"
  },
  {
    label: "Metric",
    value: 80,
    unit: "бар",
    status: "normal"
  }
]

export default function PressureWidget() { 
    return (
        <div className="p-[20px] bg-[#171719] border-1 border-[#222223] rounded-[16px] h-[340px]">
            <div className="text-sm mb-[10px] uppercase text-[#696969] tracking-[0.08em]">Давление</div>
            
            { metrics.map(metric => 
              <div className="mb-[24px] text-[#fff]">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                  <span>{ metric.label }</span>
                  <span style={{ 
                      color: metric.status === "normal" 
                      ? "#49C86E"
                      : metric.status === "critical" 
                      ? "#E23F3F"
                      : "#EABD52"
                   }}>{ metric.value } { metric.unit }</span>
                </div>
                
                <ProgressBar 
                  value={metric.value}
                  status={metric.status}
                />
              </div>
            )}
        </div>
    )
}