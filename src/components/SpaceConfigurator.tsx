import React from "react";
import { RoomSpec, RenovationOption, RenovationType } from "../types";
import { RENOVATION_OPTIONS } from "../data/spacesData";
import {
  Settings2,
  Book,
  Users,
  Ruler,
  TrendingUp,
  Coins,
  FileText,
  BadgeCheck,
  FlameKindling,
  Sparkles
} from "lucide-react";

interface SpaceConfiguratorProps {
  spec: RoomSpec | undefined;
  onUpdateSpec: (updated: RoomSpec) => void;
}

// Simple parsing helper to compute square meters from string like "6.5m x 4.8m" or "围绕天井一周 (1.2m 宽)"
function parseArea(dimStr: string): number {
  const match = dimStr.match(/([\d.]+)\s*m\s*[x×*]\s*([\d.]+)/);
  if (match) {
    return parseFloat(match[1]) * parseFloat(match[2]);
  }
  if (dimStr.includes("围绕天井")) {
    return 13.0 * 1.2; // perimeter estimate around 13m length
  }
  return 15.0; // default average space in sq m
}

export default function SpaceConfigurator({
  spec,
  onUpdateSpec,
}: SpaceConfiguratorProps) {
  if (!spec) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
        <Settings2 className="w-12 h-12 text-slate-300 animate-pulse mb-3" />
        <h3 className="font-semibold text-slate-700 text-sm md:text-base">
          未选择任何建筑部位
        </h3>
        <p className="text-xs text-slate-400 max-w-[280px] mt-1">
          请在左侧的“一颗印古建结构勘测图”中点击相应房间、天上天井或回廊进行功能配置。
        </p>
      </div>
    );
  }

  // Get current renovation configuration details
  const activeReno =
    RENOVATION_OPTIONS.find((o) => o.type === spec.renovationType) ||
    RENOVATION_OPTIONS[RENOVATION_OPTIONS.length - 1];

  const area = parseArea(spec.dimensions);
  const totalCostEstimate = area * activeReno.costEstimate;

  const handleRenoTypeChange = (type: RenovationType) => {
    const nextReno = RENOVATION_OPTIONS.find((o) => o.type === type)!;
    onUpdateSpec({
      ...spec,
      renovationType: type,
      bookVolume: spec.hasBookshelf ? nextReno.suggestedBooks : 0,
    });
  };

  const handleHasBookshelfChange = (checked: boolean) => {
    onUpdateSpec({
      ...spec,
      hasBookshelf: checked,
      bookVolume: checked ? activeReno.suggestedBooks || 400 : 0,
    });
  };

  const handleBookVolumeChange = (vol: number) => {
    onUpdateSpec({
      ...spec,
      bookVolume: vol,
    });
  };

  const handleNotesChange = (text: string) => {
    onUpdateSpec({
      ...spec,
      customNotes: text,
    });
  };

  const handleCapacityChange = (cap: number) => {
    onUpdateSpec({
      ...spec,
      capacity: cap,
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Header Info */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded uppercase">
            {spec.floor}层 · ELEVATION: {spec.elevation}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            面积估算 ~{area.toFixed(1)} ㎡
          </span>
        </div>
        <h3 className="font-bold text-slate-800 text-lg mt-1">{spec.name}</h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed bg-slate-50/80 p-2 rounded border border-slate-100/50">
          <strong className="text-slate-600 font-medium">传统形制面貌：</strong>
          {spec.originalRole}
        </p>
      </div>

      {/* Select Functional Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">
          💡 空间设计功能置换 (Renovation Purpose)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 border border-slate-100 rounded-lg p-1">
          {RENOVATION_OPTIONS.map((opt) => {
            const isSelected = opt.type === spec.renovationType;
            return (
              <button
                key={opt.type}
                onClick={() => handleRenoTypeChange(opt.type)}
                className={`text-left px-3 py-2 rounded-lg text-xs flex flex-col justify-start transition-colors ${
                  isSelected
                    ? "bg-teal-500 text-white"
                    : "hover:bg-slate-50 text-slate-700 border border-slate-100/40"
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                <span
                  className={`text-[9px] mt-0.5 lines-clamp-1 ${
                    isSelected ? "text-teal-100" : "text-slate-400"
                  }`}
                >
                  {opt.shortDesc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Settings & Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4 border-y border-slate-100/80">
        {/* Bookshelf Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <Book className="w-3.5 h-3.5 text-blue-500" />
              藏书陈列配置
            </span>
            <input
              type="checkbox"
              id="has-bookshelf"
              checked={spec.hasBookshelf}
              onChange={(e) => handleHasBookshelfChange(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
            />
          </div>

          <div className={`space-y-2 transition-opacity duration-200 ${spec.hasBookshelf ? "opacity-100" : "opacity-40"}`}>
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>估计藏书册量:</span>
              <span className="font-bold text-blue-600">{spec.bookVolume} 册</span>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              disabled={!spec.hasBookshelf}
              value={spec.bookVolume}
              onChange={(e) => handleBookVolumeChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <p className="text-[10px] text-slate-400">
              * 建议多选配：昆明地方营造学、滇南民风特色志及滇越铁路主题文献。
            </p>
          </div>
        </div>

        {/* Capacity Slider */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            容纳上限 (Capacity)
          </span>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>设计同时在场人数:</span>
              <span className="font-bold text-indigo-600">{spec.capacity} 人</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={spec.capacity}
              onChange={(e) => handleCapacityChange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <p className="text-[10px] text-slate-400">
              * 根据《消防古建规范》，二楼木构建筑单间人数严控不易过载多聚。
            </p>
          </div>
        </div>
      </div>

      {/* Custom Design Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-emerald-500" />
          设计师专项备注及细节需求 (Design Specification Notes)
        </label>
        <textarea
          rows={2}
          value={spec.customNotes || ""}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="例如：保留原有板壁木纹，配合亚麻材质睡隔窗帘，底墙增设低位红土瓦碎片铺垫以强调乡土感..."
          className="w-full p-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Estimations Summary */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">
            该部位改造单价 (Unit Cost)
          </span>
          <span className="font-mono text-sm font-semibold text-slate-700">
            ¥{activeReno.costEstimate.toLocaleString()} / ㎡
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block flex items-center gap-0.5 justify-end">
            <Coins className="w-3 h-3 text-amber-500" />
            该部位估算总预算 (Subtotal Cost)
          </span>
          <span className="font-bold text-base md:text-lg text-amber-600 font-mono">
            ¥{totalCostEstimate.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
