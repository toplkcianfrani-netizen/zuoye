import React, { useState, useMemo } from "react";
import { DesignState, RoomSpec } from "./types";
import { DEFAULT_ROOM_DATA, DESIGN_STYLES, RENOVATION_OPTIONS } from "./data/spacesData";
import InteractiveMap from "./components/InteractiveMap";
import SpaceConfigurator from "./components/SpaceConfigurator";
import MaterialBoard from "./components/MaterialBoard";
import HeritageHub from "./components/HeritageHub";
import AiAdvisor from "./components/AiAdvisor";
import ProposalDeck from "./components/ProposalDeck";
import {
  BookOpen,
  DollarSign,
  Library,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  RefreshCw,
  FolderLock,
  Download,
  ClipboardCheck,
  Building,
  CheckCircle,
  Clock
} from "lucide-react";

export default function App() {
  const [designState, setDesignState] = useState<DesignState>({
    styleId: "style-copper-warm", // default style:滇铜染茶
    rooms: DEFAULT_ROOM_DATA,
    customTitle: "安宁普河一栋印 · 宿书民宿",
  });

  const [activeRoomId, setActiveRoomId] = useState<string>("1F-ZHENGTANG");
  const [floor, setFloor] = useState<1 | 2>(1);

  // Compliance checklist items
  const [checkpoints, setCheckpoints] = useState([
    { id: "dry-base", label: "底层实木构件地脚增防潮绝缘垫层（御滇池蒸腾湿气）", checked: true },
    { id: "fire-mist", label: "图书阅览区域配置超细高压水雾自动消防灭火系统", checked: false },
    { id: "insulation", label: "木壁板背面夹填陶粒混凝土吸音阻燃保温层", checked: true },
    { id: "rain", label: "天井排水分水古道局部清淤并配火山岩过滤层", checked: false },
    { id: "light", label: "二楼走廊加装瓦遮式防直射柔光投光灯饰板", checked: false },
  ]);

  // Handle room parameter change
  const handleUpdateRoomSpec = (updatedSpec: RoomSpec) => {
    setDesignState((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [updatedSpec.id]: updatedSpec,
      },
    }));
  };

  const handleCheckpointToggle = (id: string) => {
    setCheckpoints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  // Helper parsing square meters
  const parseAreaNum = (dimStr: string): number => {
    const match = dimStr.match(/([\d.]+)\s*m\s*[x×*]\s*([\d.]+)/);
    if (match) {
      return parseFloat(match[1]) * parseFloat(match[2]);
    }
    if (dimStr.includes("围绕天井")) {
      return 13.0 * 1.2;
    }
    return 15.0;
  };

  // Project Analytics stats calculators linked dynamically to the room specs
  const projectStats = useMemo(() => {
    let totalArea = 0;
    let totalBudget = 0;
    let totalBooks = 0;
    let maxGuests = 0;
    let renovatedCount = 0;
    const roomsList = Object.values(designState.rooms) as RoomSpec[];

    roomsList.forEach((spec) => {
      const area = parseAreaNum(spec.dimensions);
      totalArea += area;

      const matchedReno = RENOVATION_OPTIONS.find((o) => o.type === spec.renovationType);
      if (matchedReno) {
        totalBudget += area * matchedReno.costEstimate;
      }

      if (spec.hasBookshelf) {
        totalBooks += spec.bookVolume;
      }

      maxGuests += spec.capacity;

      if (spec.renovationType !== "unassigned") {
        renovatedCount++;
      }
    });

    const completionPercent = Math.round((renovatedCount / roomsList.length) * 100);

    return {
      totalArea,
      totalBudget,
      totalBooks,
      maxGuests,
      completionPercent,
    };
  }, [designState]);

  const activeStyle = useMemo(() => {
    return (
      DESIGN_STYLES.find((s) => s.id === designState.styleId) || DESIGN_STYLES[0]
    );
  }, [designState.styleId]);

  const activeRoomSpec = designState.rooms[activeRoomId];

  // Reset to default
  const handleReset = () => {
    if (window.confirm("确定要重置当前的所有功能排布定制吗？")) {
      setDesignState((prev) => ({
        ...prev,
        rooms: DEFAULT_ROOM_DATA,
        styleId: "style-copper-warm",
      }));
    }
  };

  // Export current specs JSON
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(designState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${designState.customTitle}_design_specs.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 antialiased font-sans">
      {/* Visual Top Bar / Subtle Branding */}
      <header className="bg-slate-900 text-white relative border-b border-slate-800">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs tracking-wider uppercase">
              <Building className="w-3.5 h-3.5" />
              <span>滇中传统营造活化计划 · 昆明一颗印项目组</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
              "一颗印"古建图书旅馆规划系统
            </h1>
            <p className="text-xs text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              针对云南传统多层木四合院（一颗印）进行在地活化设计。系统提供交互式CAD结构图、自定功能比配、滇南风物选材版、以及符合古建保护规范的AI设计顧問。
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
            <button
              onClick={handleReset}
              className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/85 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 border border-slate-700 transition"
              title="还原古建初始未改动状态"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重置方案</span>
            </button>
            <button
              onClick={handleExportJson}
              className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出设计规格书 (JSON)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Project Profile Customization Grid */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="space-y-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              📖 专属规划旅馆案名 (Hotel Project Title)
            </label>
            <div className="flex items-center space-x-3 mt-1">
              <input
                type="text"
                value={designState.customTitle}
                onChange={(e) =>
                  setDesignState((prev) => ({ ...prev, customTitle: e.target.value }))
                }
                className="text-lg md:text-xl font-bold text-slate-800 bg-slate-50 border border-slate-100/80 px-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all w-full max-w-md"
                placeholder="键入您的图书旅馆名称..."
              />
              <span className="text-xs text-slate-400 font-medium italic hidden sm:inline">
                * 实时保存于草稿中
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              已选总体美学色调：
            </span>
            <span className="text-xs font-semibold text-slate-700 mt-1 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeStyle.colors[0] }} />
              {activeStyle.name}
            </span>
            <span className="text-[10px] text-slate-400 italic block mt-0.5">
              色值：{activeStyle.colors.join(" | ")}
            </span>
          </div>
        </div>

        {/* Real-time Project Dash Analytics */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Stat 1: Estimated Budget */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex justify-between items-start text-amber-600">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                概算投资总额
              </span>
              <DollarSign className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-3">
              <p className="text-xl md:text-2xl font-bold text-slate-800 font-mono">
                ¥{projectStats.totalBudget.toLocaleString()}
              </p>
              <p className="text-[10.5px] text-slate-400 mt-1 leading-relaxed">
                基于古建筑面积单价计算
              </p>
            </div>
          </div>

          {/* Stat 2: Total Books Volume */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex justify-between items-start text-blue-600">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                规划馆藏总量
              </span>
              <Library className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-3">
              <p className="text-xl md:text-2xl font-bold text-slate-800 font-mono">
                {projectStats.totalBooks.toLocaleString()} 册
              </p>
              <p className="text-[10.5px] text-slate-400 mt-1">
                多层搁架及床围书屉容积
              </p>
            </div>
          </div>

          {/* Stat 3: Total Area */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex justify-between items-start text-teal-600">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                规划测绘总面
              </span>
              <Compass className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-3">
              <p className="text-xl md:text-2xl font-bold text-slate-800 font-mono">
                {projectStats.totalArea.toFixed(1)} ㎡
              </p>
              <p className="text-[10.5px] text-slate-400 mt-1">
                含两层木构、天井与外廓
              </p>
            </div>
          </div>

          {/* Stat 4: Guests count */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
            <div className="flex justify-between items-start text-indigo-600">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                在场受众负荷
              </span>
              <Users className="w-5 h-5 opacity-60" />
            </div>
            <div className="mt-3">
              <p className="text-xl md:text-2xl font-bold text-slate-800 font-mono">
                {projectStats.maxGuests} 人
              </p>
              <p className="text-[10.5px] text-slate-400 mt-1">
                保障木建筑承重合理上限
              </p>
            </div>
          </div>

          {/* Stat 5: Renovation rate */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              空间置换分配率
            </span>
            <div className="mt-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-2xl md:text-3xl font-extrabold text-teal-400 font-mono">
                  {projectStats.completionPercent}%
                </span>
                <span className="text-[10.5px] text-slate-400">已定制完备</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${projectStats.completionPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Proposal Slideshow Presentation Deck */}
        <ProposalDeck
          designState={designState}
          styles={DESIGN_STYLES}
          activeStyle={activeStyle}
        />

        {/* Double-Panel Working Workbench */}
        <section id="interactive-blueprint-headline" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT WORKING COLUMN (Map + Material Selection) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Interactive blueprint design map */}
            <InteractiveMap
              floor={floor}
              setFloor={setFloor}
              rooms={designState.rooms}
              activeRoomId={activeRoomId}
              setActiveRoomId={(id) => {
                setActiveRoomId(id);
                // Switch auto floor based on selected room prefixes
                if (id.startsWith("2F") && floor !== 2) {
                  setFloor(2);
                } else if (id.startsWith("1F") && floor !== 1) {
                  setFloor(1);
                }
              }}
            />

            {/* Design Style and Color Materials selection Board */}
            <MaterialBoard
              currentStyleId={designState.styleId}
              setStyleId={(id) => setDesignState((prev) => ({ ...prev, styleId: id }))}
            />

            {/* Educational Factoid and Adaptations Hub */}
            <HeritageHub />
          </div>

          {/* RIGHT WORKING COLUMN (Configurator + AI Architect) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Real-time active room configuration card */}
            <SpaceConfigurator
              spec={activeRoomSpec}
              onUpdateSpec={handleUpdateRoomSpec}
            />

            {/* Streaming AI Renovation advisor */}
            <AiAdvisor
              designState={designState}
              activeRoomId={activeRoomId}
            />
          </div>
        </section>

        {/* Preservation, Fire Safety & Operational Compliance Checklist */}
        <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-5">
            <div className="bg-teal-50 text-teal-700 p-2 rounded-xl">
              <ClipboardCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">
                “一颗印”木结构图书馆消防与文保安全合规检查项
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                由于木构承载及纸质书画等具有极高消防负荷，请对下列项目进行在场落实
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checkpoints.map((pt) => (
              <label
                key={pt.id}
                className={`p-4 rounded-xl border flex items-start space-x-3.5 transition group cursor-pointer ${
                  pt.checked
                    ? "border-emerald-200 bg-emerald-50/10 shadow-3xs"
                    : "border-slate-100 bg-slate-50/20 hover:border-slate-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={pt.checked}
                  onChange={() => handleCheckpointToggle(pt.id)}
                  className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 mt-0.5"
                />
                <div className="space-y-0.5">
                  <span
                    className={`text-xs font-semibold ${
                      pt.checked ? "text-slate-800" : "text-slate-500"
                    } group-hover:text-slate-900 transition-colors block`}
                  >
                    {pt.label}
                  </span>
                  <p className="text-[10px] text-slate-400">
                    {pt.id === "dry-base" && "木柱地脚处于阴暗常湿环境极其容易腐朽，必须添加硬质透汽防霉垫片隔绝土气。"}
                    {pt.id === "fire-mist" && "传统喷淋易泡毁藏书古籍。高压细水雾用水量极少且能吸附烟尘，对图书极其友好。"}
                    {pt.id === "insulation" && "二层走马廊与耳房木质空心壁板加装填不燃骨料，可提高防火等级达2小时。"}
                    {pt.id === "rain" && "天井若积水会迅速浸损整栋四房木地脚，需定时疏通古代排污槽、沉沙池。"}
                    {pt.id === "light" && "防止直射紫外线及高功率射灯对书籍以及纸张造成的枯萎、变脆影响。"}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-50 text-center text-[11px] text-slate-400 flex flex-wrap justify-center items-center gap-1.5 font-mono">
            <span>● 滇中林业防火级别：特级森林防火地带</span>
            <span className="hidden sm:inline">|</span>
            <span>● 推荐执行人：昆明文华文物局审核注册设计师</span>
            <span className="hidden sm:inline">|</span>
            <span>● 文献保护级别：特级文献保护库标配</span>
          </div>
        </section>

        {/* Visual spec checklist output box for preview copypaste */}
        <section className="bg-slate-950 rounded-2xl p-6 border border-slate-900 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-slate-700 pointer-events-none text-[8px] font-mono hidden sm:block">
            YIGANYIN_B_CAD_EXPORT_STRUCT
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            <span className="text-teal-400">⚡</span>
            <span>实时导出古建设计清单数据流 (Data Stream Preview)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            您配置的各项参数将实时生成为建筑设计标准契约参数。开发人员或营造队长可直接按此导出JSON或文本，作为榫卯施工、材料配给及家具摆件采购的数据底座。
          </p>
          <div className="mt-4 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-teal-400 font-mono overflow-x-auto max-h-[160px]">
            <pre>
              {JSON.stringify(
                {
                  hotelName: designState.customTitle,
                  colorStyle: activeStyle.name,
                  palette: activeStyle.colors,
                  materials: activeStyle.keyMaterials,
                  specs: (Object.values(designState.rooms) as RoomSpec[]).map((r) => ({
                    spaceId: r.id,
                    name: r.name,
                    renovation: r.renovationType,
                    capacity: r.capacity,
                    booksCount: r.bookVolume,
                    designerNotes: r.customNotes || ""
                  }))
                },
                null,
                2
              )}
            </pre>
          </div>
        </section>
      </main>

      {/* Humble, clean professional footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 mt-16 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="font-semibold text-slate-300">
            滇墨印记 · 昆明传统“一颗印”历史合院图书旅社空间重生
          </p>
          <p className="max-w-2xl mx-auto text-slate-500 leading-relaxed">
            本系统由数字营造师基于云南地质、抗震及防火文保法规研发。所有设计图均保留原本“三间四耳，走马转角楼”这一古老的防盗御寒核心骨架，旨在搭建学术、古建科普及在地旅游运营的温润合院桥梁。
          </p>
          <p className="text-slate-600 font-mono text-[10px]">
            © 2026 昆明传统营造保护协会. All rights research reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
