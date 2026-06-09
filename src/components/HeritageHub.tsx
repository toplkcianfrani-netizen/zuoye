import React, { useState } from "react";
import { BookOpen, ShieldCheck, Heart, Layers, Home, Eye } from "lucide-react";

export default function HeritageHub() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const keyFacts = [
    {
      title: "三间四耳 · 密闭守和",
      shortDesc: "一颗印最经典平面：正房三间，左右耳房各两间（共四耳），形成四合院。",
      icon: Home,
      details: [
        "正房通常高大，两层高，居中供奉并作为正堂，两旁为长辈居室。",
        "耳房两层，相对较低，作为晚辈卧室，侧边配备简易楼梯。",
        "整体外墙极其厚重（常采用土坯夯墙或厚青砖），正面高处仅开小窗，主要为了御寒、防盗及防强风沙，就像一枚坚固的印章。"
      ],
      renervationIdea: "采用外装内固的隔声结构：保留老夯土粉墙外观，室内置入轻钢和降噪防火板材，在耳房打造安谧独特的书籍睡眠舱。"
    },
    {
      title: "走马转角楼 · 四合通连",
      shortDesc: "二层连通的木结构回廊，无需下到地面即可绕四周楼道环通一圈。",
      icon: Layers,
      details: [
        "回廊由挑檐梁支承，悬挑在天井上方，使二层的所有房间畅通无阻，形成独特的空中天桥走道。",
        "回廊设有精美的木花格护栏，游人走过犹如马在楼内转圈，因此得名‘走马转角楼’。",
        "雨季时，由于檐廊遮蔽，二楼的窗铺可以随意敞开通风，不沾丁雨。"
      ],
      renervationIdea: "回廊护栏加固并嵌入柔性暖光漫射灯带，靠天井一侧安装细窄的缅甸老柚木条案及高脚靠椅，搭建‘檐下读书廊’，细品微雨湿青石。"
    },
    {
      title: "四水归堂 · 承露聚气",
      shortDesc: "屋顶坡度向内倾斜，雨水悉数顺瓦流洒至院中央天井，寓意聚财聚气不外泄。",
      icon: BookOpen,
      details: [
        "院落中央天井极其窄深，用于宣泄并排出暴雨，保障木基脚不被泡损。",
        "滇中光热充沛，天井也是整个四合院最主要的采光和抽风散热井口。",
        "地面通常铺设火山岩、青石板，带有排水明沟与历史石槽。"
      ],
      renervationIdea: "保留天井‘承露’形制，剔除后期不规整铺装，用深灰火山岩洗手凹槽与多肉、青苔植被点缀，在中央置入古法青铜雨漏。晴时做坐垫书院，雨时做滴答水音书场。"
    }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="mb-5 flex items-center space-x-3">
        <div className="bg-teal-50 text-teal-700 p-2 rounded-xl">
          <Heart className="w-5 h-5 fill-teal-100" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            昆明“一颗印”营造技艺科普与改造适配
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            深入底蕴：保护好古建筑骨架，方可延伸出有灵魂的图书旅宿
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex border-b border-slate-100 mb-5 overflow-x-auto gap-2">
        {keyFacts.map((fact, idx) => {
          const IconComponent = fact.icon;
          const isSelected = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center space-x-1.5 whitespace-nowrap px-1 ${
                isSelected
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{fact.title.split(" · ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Fact Display */}
      <div className="space-y-4">
        {/* Short description banner */}
        <p className="text-xs font-medium text-slate-700 italic border-l-3 border-teal-500 pl-3">
          “{keyFacts[activeTab].shortDesc}”
        </p>

        {/* Detailed structural facts */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            📐 历史营造原理 (Architectural Heritage)
          </span>
          <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed pl-1">
            {keyFacts[activeTab].details.map((detail, idx) => (
              <li key={idx}> {detail} </li>
            ))}
          </ul>
        </div>

        {/* Modern Book-Hotel Renovation adaptation */}
        <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100/50 space-y-2">
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            设计改造对策 (Renovation Design Answer)
          </span>
          <p className="text-xs text-teal-900 leading-relaxed font-normal">
            {keyFacts[activeTab].renervationIdea}
          </p>
        </div>
      </div>
    </div>
  );
}
