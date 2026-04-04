import ReactECharts from "echarts-for-react";

export default function HealthIndex() {  
    const value = 89;
    const total = 100;

    const option = {
        series: [
            {
                type: "pie",
                radius: ["70%", "90%"], // inner & outer radius → creates the hole
                avoidLabelOverlap: false,
                label: { show: false },
                data: [
                    { value: value, name: "Completed" },
                    { value: total - value, name: "Remaining" },
                ],
                color: ["#49C86E", "transparent"],
            },
        ],
        // graphic: 

        //     {
        //     type: "text",
        //     left: "center",
        //     top: "center",
        //     style: {
        //         text: `${value}/${total}`,
        //         textAlign: "center",
        //         fill: "#44BD681A",
        //         fontSize: 24,
        //         fontWeight: "bold",
        //     },
        // },

        graphic: {
      type: "group",
      left: "center",
      top: "center",
      children: [
        // Background circle (optional)
        {
          type: "circle",
          shape: {
            r: 61.5,
          },
          style: {
            fill: "#44BD681A", // background color
          },
          left: "center",
          top: "center",
        },

        // Big number (89)
        {
          type: "text",
          style: {
            text: `${value}`,
            fontSize: 48,
            fontWeight: 600,
            fill: "#fff",
          },
          left: "center",
          top: "center"
        },

        // Smaller "/100"
        {
          type: "text",
          style: {
            text: `/${total}`,
            fontSize: 14,
            fontWeight: 400,
            fill: "#FFFFFF4D",
          },
          left: 0,
          top: 20
        },
      ],
    },
    };


    return (
        <div style={{
            // display: "flex",
            // alignItems: "center",
            // gap: 24,
            padding: "26px 30px",
            height: "100%",
            backgroundColor: "#171719",
            // fontSize: 14,
            color: "#fff",
            borderRight: "1px solid #222223"
        }}>
            <div style={{ marginBottom: 30, fontWeight: 400, textTransform: "uppercase" }}>Индекс здоровья</div>


            <ReactECharts option={option} style={{ height: 300 }} />
        </div>
    )
}