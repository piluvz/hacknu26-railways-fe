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
  },
  {
    label: "Metric",
    value: 65,
    unit: "бар",
    status: "warning"
  },
]

export default function PressureWidget() { 
    return (
        <div className="p-[20px] bg-[#171719] border-1 border-[#222223] rounded-[16px]">
            <div className="mb-[10px] uppercase text-[#696969]">Давление</div>
            
            { metrics.map(metic => 
              <div className="mb-[24px] text-[#fff]">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, width: "100%", fontWeight: 400, fontSize: 12 }}>
                  <span>{ metic.label }</span>
                  <span>{ metic.value } { metic.unit }</span>
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