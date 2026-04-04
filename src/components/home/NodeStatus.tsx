// TODO: Replace hardcoded nodes with data from backend
const NODES_FROM_BACKEND: NodeData[] = [
    { id: "engine",       label: "Двигатель",        status: "ok",      value: "92°C",   detail: "Температура" },
    { id: "compressor",   label: "Компрессор",        status: "ok",      value: "7.2 бар", detail: "Давление"    },
    { id: "brakes",       label: "Тормозная система", status: "warning", value: "4.2 бар", detail: "Давление"    },
    { id: "cooling",      label: "Охлаждение",        status: "ok",      value: "78°C",   detail: "Температура" },
    { id: "fuel",         label: "Топливная система", status: "ok",      value: "68%",    detail: "Уровень"     },
    { id: "electrical",   label: "Электросистема",    status: "ok",      value: "24В",    detail: "Напряжение"  },
    { id: "hydraulics",   label: "Гидравлика",        status: "error",   value: "1.1 бар", detail: "Давление"   },
    { id: "transmission", label: "Трансмиссия",       status: "ok",      value: "Normal", detail: "Статус"      },
    { id: "axle1",        label: "Ось 1",             status: "ok",      value: "55°C",   detail: "Температура" },
    { id: "axle2",        label: "Ось 2",             status: "ok",      value: "58°C",   detail: "Температура" },
    { id: "axle3",        label: "Ось 3",             status: "warning", value: "71°C",   detail: "Температура" },
    { id: "axle4",        label: "Ось 4",             status: "ok",      value: "54°C",   detail: "Температура" },
];

type NodeStatus = "ok" | "warning" | "error";

interface NodeData {
    id: string;
    label: string;
    status: NodeStatus;
    value: string;
    detail: string;
}

const STATUS_CONFIG: Record<NodeStatus, { color: string; bg: string; label: string }> = {
    ok:      { color: "#49C86E", bg: "#49C86E1A", label: "Норма"    },
    warning: { color: "#F0A500", bg: "#F0A5001A", label: "Внимание" },
    error:   { color: "#E5534B", bg: "#E5534B1A", label: "Ошибка"   },
};

function NodeCard({ node }: { node: NodeData }) {
    const cfg = STATUS_CONFIG[node.status];

    return (
        <div
            className="relative flex flex-col gap-2 rounded-lg px-4 py-[14px] bg-[#1E1E20] overflow-hidden"
            style={{ border: `1px solid ${cfg.color}33` }}
        >
            {/* Status stripe */}
            <div
                className="absolute top-0 left-0 w-[3px] h-full rounded-l-lg"
                style={{ backgroundColor: cfg.color }}
            />

            <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">{node.label}</span>
                <div
                    className="flex items-center gap-[5px] rounded px-2 py-0.5"
                    style={{ backgroundColor: cfg.bg }}
                >
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }}
                    />
                    <span className="text-[11px] font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
            </div>

            <div className="flex justify-between items-baseline">
                <span className="text-xl font-semibold text-white">{node.value}</span>
                <span className="text-[11px] text-white/20">{node.detail}</span>
            </div>
        </div>
    );
}

export default function NodeStatus() {
    const nodes = NODES_FROM_BACKEND;

    const counts = {
        ok:      nodes.filter(n => n.status === "ok").length,
        warning: nodes.filter(n => n.status === "warning").length,
        error:   nodes.filter(n => n.status === "error").length,
    };

    return (
        <div className="flex flex-col h-full px-[30px] py-[26px] bg-[#171719] text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div className="font-normal uppercase text-sm tracking-[0.08em] text-white/60">
                    Состояние узлов
                </div>
                <div className="flex gap-4 text-xs">
                    <span className="text-[#49C86E]">● {counts.ok} норма</span>
                    {counts.warning > 0 && (
                        <span className="text-[#F0A500]">● {counts.warning} внимание</span>
                    )}
                    {counts.error > 0 && (
                        <span className="text-[#E5534B]">● {counts.error} ошибка</span>
                    )}
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-3 flex-1 overflow-y-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                {nodes.map(node => (
                    <NodeCard key={node.id} node={node} />
                ))}
            </div>
        </div>
    );
}
