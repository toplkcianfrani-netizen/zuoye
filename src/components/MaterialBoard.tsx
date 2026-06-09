import React from "react";
import { DesignStyle } from "../types";
import { DESIGN_STYLES } from "../data/spacesData";
import { Palette, CheckCircle2, Feather, Flame, Sparkles } from "lucide-react";

interface MaterialBoardProps {
  currentStyleId: string;
  setStyleId: (id: string) => void;
}

export default function MaterialBoard({
  currentStyleId,
  setStyleId,
}: MaterialBoardProps) {
  const activeStyle =
    DESIGN_STYLES.find((s) => s.id === currentStyleId) || DESIGN_STYLES[0];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
      {/* Title */}
      <div className="flex items-center space-x-3">
        <div className="bg-amber-100 text-amber-700 p-2 rounded-xl">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-base">
            云南本土风物 · 选色与材料板
          </h3>
          <p className="text-xs text-slate-400">
            精选昆明红土、滇铜、松木等在地元素，构建有温度的故事书宿
          </p>
        </div>
      </div>

      {/* Style Option Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DESIGN_STYLES.map((style) => {
          const isSelected = style.id === currentStyleId;
          return (
            <button
              key={style.id}
              onClick={() => setStyleId(style.id)}
              className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between h-full group ${
                isSelected
                  ? "border-amber-600 bg-amber-50/20 shadow-sm"
                  : "border-slate-100 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-200"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-amber-600">
                  <CheckCircle2 className="w-5 h-5 fill-amber-100" />
                </div>
              )}
              
              <div>
                {/* Visual indicator of colors */}
                <div className="flex gap-1.5 mb-3.5">
                  {style.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>

                <h4 className="font-medium text-slate-800 text-sm group-hover:text-amber-800 transition-colors">
                  {style.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 lines-clamp-3 leading-relaxed">
                  {style.description}
                </p>
              </div>

              {/* Tag lines */}
              <div className="mt-4 pt-3 border-t border-slate-100/80 flex flex-wrap gap-1">
                {style.keyMaterials.slice(0, 3).map((mat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Material details display */}
      <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-amber-600" />
            已选在地主材配置表 (Primary Materials)
          </h4>
          <div className="grid grid-cols-2 gap-2.5">
            {activeStyle.keyMaterials.map((mat, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-100/80 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-700">{mat}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            设计美学生态理念 (Eco Philosophy)
          </h4>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              传统的昆明<strong>一颗印</strong>采用封闭式厚外墙以御干凉疾风，采光皆赖天井。
              我们坚持<strong>“不拆大木、修旧如旧、功能重组”</strong>的原则。
            </p>
            <p className="text-slate-500 italic">
              * 选配的{activeStyle.keyMaterials[0]}、{activeStyle.keyMaterials[2] || "火山石"}等主材均为当地可循环采购，最大限度减少二氧化碳碳足迹，保持古建原本的木香骨架。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
