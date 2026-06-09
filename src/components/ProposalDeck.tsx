import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RoomSpec, DesignStyle } from "../types";
import {
  MapPin,
  User,
  GitBranch,
  Layers,
  Layout,
  Sun,
  Palette,
  Hammer,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  Heart,
  Anchor,
  Compass,
  Utensils,
  BookOpen,
  ArrowRight,
  Printer,
  Calendar,
  Layers3,
  Flame,
  Check,
  ShieldAlert,
  HelpCircle
} from "lucide-react";

interface ProposalDeckProps {
  designState: {
    styleId: string;
    rooms: Record<string, RoomSpec>;
    customTitle: string;
  };
  styles: DesignStyle[];
  activeStyle: DesignStyle;
}

export default function ProposalDeck({ designState, styles, activeStyle }: ProposalDeckProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 12;

  const slidesCatalog = [
    { num: "01", name: "项目目录", icon: FileText, desc: "方案框架与大纲" },
    { num: "02", name: "项目信息", icon: MapPin, desc: "安宁普河地理断代测绘" },
    { num: "03", name: "客户定位", icon: User, desc: "主、租客及亲朋长期客群" },
    { num: "04", name: "元素拓展", icon: GitBranch, desc: "家与归属感的心灵地图" },
    { num: "05", name: "设计主题", icon: Heart, desc: "「回归」空间诗意美学" },
    { num: "06", name: "平面布置", icon: Layout, desc: "功能流线与空间落位" },
    { num: "07", name: "环境分析", icon: Sun, desc: "风光采光及防腐微气候" },
    { num: "08", name: "色彩分析", icon: Palette, desc: "在地色块与高灵敏光谱" },
    { num: "09", name: "材质分析", icon: Hammer, desc: "原质触感与低能耗低碳" },
    { num: "10", name: "设计方案", icon: Layers, desc: "大书库与中餐灶台活化" },
    { num: "11", name: "空间意向", icon: Eye, desc: "情绪聚焦点美学拟图" },
    { num: "12", name: "报价清单", icon: Sparkles, desc: "营造概算与分阶时间表" }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  };

  return (
    <div id="proposal-deck-section" className="bg-white border border-slate-100 rounded-3xl shadow-md overflow-hidden flex flex-col transition-all">
      {/* Deck Header Bar */}
      <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500 text-slate-900 p-1.5 rounded-lg text-xs font-bold font-mono">
            LIVE PRESENTATION
          </div>
          <div>
            <h2 className="text-white font-bold text-sm tracking-wide">
              安宁普河村 「一颗印」活化设计方案演示汇报书
            </h2>
            <p className="text-[11px] text-slate-400">
              项目地址：昆明市安宁市普河村委会旁 (传统合院保护置换案)
            </p>
          </div>
        </div>

        {/* Mini slide switcher controls */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-1.5 bg-slate-800 rounded-xl px-2.5 py-1.5 border border-slate-700">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition"
              title="上一页"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-amber-400 w-12 text-center">
              {currentSlide.toString().padStart(2, "0")} / {totalSlides}
            </span>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition"
              title="下一页"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 text-slate-300 rounded-xl px-3 py-1.5 text-[11px] font-semibold flex items-center space-x-1 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">打印成册</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="bg-neutral-50/50 p-4 sm:p-8 min-h-[560px] relative overflow-hidden flex flex-col justify-between border-b border-slate-100">
        
        {/* Subtle geometric structural grid representing CAD precision */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-[0.03] border-collapse">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-slate-900" />
          ))}
        </div>

        {/* Animated Slide Content Panel */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-grow flex flex-col justify-between"
            >
              {/* SLIDE CONTENT FOR EACH INDEX */}
              {currentSlide === 1 && (
                <div className="py-6 flex flex-col justify-center items-center text-center h-full max-w-4xl mx-auto my-auto">
                  <span className="text-xs tracking-widest font-mono text-amber-700 bg-amber-100/50 border border-amber-200/50 px-3 py-1.5 rounded-full font-bold uppercase mb-4">
                    THE HOMING OF BIRDS DESIGN PROPOSAL
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    方案制作 · 目录大纲
                  </h1>
                  <p className="text-sm text-slate-500 font-mono mt-2 tracking-widest">
                    CATALOG &amp; BRIEFING INDEX
                  </p>
                  
                  {/* Switzerland minimal columns list */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-3xl text-left">
                    {slidesCatalog.map((c) => (
                      <button
                        key={c.num}
                        onClick={() => setCurrentSlide(parseInt(c.num))}
                        className={`p-3.5 rounded-2xl border text-left transition group ${
                          currentSlide === parseInt(c.num)
                            ? "border-amber-500 bg-amber-50/20"
                            : "border-slate-200/65 bg-white hover:border-slate-300 hover:shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-mono font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                            {c.num}
                          </span>
                          <c.icon className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-xs mt-2">{c.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{c.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 text-xs text-slate-400 font-serif italic max-w-xl">
                    “我愿意，成为一只归巢的雁。而此刻，我只愿成为我自己。”
                  </div>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 md:py-6 h-full items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <MapPin className="w-4 h-4" />
                      <span>01. 项目信息 (PROJECT SPECIFICATION)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      安宁普河村 「建水陶风一颗印」
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed text-justify">
                      标的宗地坐落于{' '}
                      <strong className="text-slate-800">
                        云南省昆明市安宁市普河村村委会旁
                      </strong>
                      。
                      该区块是典型的滇中乡村合院区，靠近安普快速路，西接青山，东枕肥田。
                      原建筑为始建于上世纪初的典型“一颗印”结构：
                      两层木构，三间四耳，走马转角楼，四水归堂。由于日久闲置，屋面局部瓦漏，木柱地脚有轻微土气返潮浸损，然而主梁卯榫坚固有序，极具极高的乡村地质及古建活化价值。
                    </p>
                    
                    <div className="bg-slate-100/85 p-4 rounded-2xl border border-slate-200/50 space-y-2 text-slate-700">
                      <h4 className="text-xs font-bold text-slate-800">📌 地理和测绘档案：</h4>
                      <ul className="text-[11px] space-y-1 font-mono">
                        <li>• <span className="font-semibold text-slate-600">行政区划：</span>昆明市安宁市县街街道普河村委会</li>
                        <li>• <span className="font-semibold text-slate-600">周遭人文：</span>毗邻普河大龙潭、乡村蔬菜市集区</li>
                        <li>• <span className="font-semibold text-slate-600">地形特征：</span>村域东高西低势，气温宜人，冬无严寒夏无酷暑</li>
                        <li>• <span className="font-semibold text-slate-600">活化红线：</span>占地 215 ㎡，双层回廊可用总建面约 380 ㎡</li>
                      </ul>
                    </div>
                  </div>

                  {/* Built-in dynamic vector diagram simulating map & boundary constraint */}
                  <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 text-white min-h-[280px] flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 to-slate-900 z-0" />
                    <div className="relative z-10 flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400">ANNING SITE LOCATION</span>
                        <h4 className="text-sm font-bold mt-1">普河村委会旁旧宅测绘圈地图</h4>
                      </div>
                      <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[9px] font-mono font-bold">RENO_REDLINE</span>
                    </div>

                    {/* Vector CAD Grid Simulation of the uploaded image */}
                    <div className="relative z-10 my-4 h-36 bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-center items-center">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {/* Drawing the Map-line exactly resembling the real photo */}
                      <svg width="100%" height="100%" viewBox="0 0 200 120" className="absolute">
                        {/* Nearby landmarks */}
                        <text x="10" y="25" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">安普路 (速) →</text>
                        <text x="55" y="45" fill="#f8fafc" fontSize="6" fontFamily="sans-serif" fontWeight="bold">普河村委会 OFFICE</text>
                        <circle cx="95" cy="42" r="2.5" fill="#ef4444" className="animate-ping" />
                        <circle cx="95" cy="42" r="1.5" fill="#ef4444" />
                        
                        {/* Red Line Area representing the house */}
                        <polygon
                          points="92,48 128,68 112,96 82,76"
                          fill="rgba(239, 68, 68, 0.2)"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeDasharray="1,1"
                          className="animate-pulse"
                        />
                        <text x="105" y="78" fill="#fca5a5" fontSize="6.5" fontWeight="bold" fontFamily="monospace">一颗印活化标的</text>
                        
                        {/* Fields & Village plots */}
                        <path d="M 140 20 L 170 35 L 190 70" fill="none" stroke="#334155" strokeWidth="0.8" />
                        <text x="145" y="45" fill="#64748b" fontSize="5.5">蔬菜大棚田园</text>
                        <text x="25" y="95" fill="#64748b" fontSize="5.5">林月园跑山柴火鸡</text>
                      </svg>
                    </div>

                    <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>● 北纬 24°49&apos; | 东经 102°29&apos;</span>
                      <span>海拔 1785m</span>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 md:py-6 h-full items-center">
                  {/* Left Bio and Target info */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <User className="w-4 h-4" />
                      <span>02. 客户定位与长短期客群</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-1000 tracking-tight">
                      主业兼居 · 慢行数字游民
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed text-justify">
                      本案打破传统的纯商业民宿套路，针对<strong className="text-slate-800">主、租客共治共居、文化重聚</strong>展开设计。
                      空间深度定制支持三组主要人群，实现“自我治愈与天伦融汇”的可持续生活圈。
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-200/50">
                        <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          房东专属栖所 (1位)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          用户自己。常驻。打理大书架和咖啡，提供昆明松木香伴读。
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-teal-500/5 border border-teal-200/50">
                        <h4 className="text-xs font-bold text-teal-900 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          中长租学人 (2位)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          停留 3-6 个月。学者、编剧或数字游民，沉浸书库潜心创作。
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-200/50 col-span-2">
                        <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          随行亲朋两套短租房 (停驻2-5天)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          共设两套高品质备用独立套房。当房东自己、长租客人的家属、知交好友前来探望、休假时，提供无缝星级睡眠体验，实现“同楼喝茶，隔山入眠”的距离温情。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right interactive Profile card inspired by Image 02 */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                    <div className="flex items-start gap-4">
                      {/* Hardcoded illustration placeholder designed gracefully as avatar */}
                      <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex flex-col justify-center items-center flex-shrink-0 border border-slate-800 shadow relative">
                        <span className="text-2xl font-serif text-amber-400">滇</span>
                        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 mt-0.5">RESIDENT</span>
                        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">TARGET PROFILE PROFILE</span>
                        <h3 className="text-base font-bold text-slate-900">“寻真”学者与创作者</h3>
                        <p className="text-xs text-slate-400 mt-0.5">年龄段: 28-55岁 | 学术流派/自由执业</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">看书研究</span>
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">清茗品茶</span>
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">宁静独处</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3.5 border-t border-slate-100 pt-4">
                      <div className="text-xs text-slate-500 text-justify italic">
                        “在经历了都市过分繁华的‘钟表速度’后，人们极度渴望一种‘无目的停驻’。我们需要一个能安放大书桌、大书库，闻得到松木香、吃得到开放厨房热汤的‘古村安全归宿’。”
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-50 pt-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">长周期目标 (LONG TERM)</span>
                          <span className="font-bold text-slate-800 text-xs">3~6个月心智休整</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">空间诉求 (ROOM PREFERENCE)</span>
                          <span className="font-bold text-slate-800 text-xs">独立工作案台+高隔音</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 4 && (
                <div className="flex flex-col justify-between py-2 md:py-6 h-full">
                  <div className="space-y-1 text-center md:text-left">
                    <div className="flex items-center space-x-2 justify-center md:justify-start text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <GitBranch className="w-4 h-4" />
                      <span>03. 元素拓展 (MIND MAP ANALYSIS)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      家与归属感 · 一颗印营造元素脑图
                    </h2>
                    <p className="text-xs text-slate-500 max-w-3xl leading-snug">
                      依照用户参考文件格式解析，以“家”和“归属感”为根节点，延展出六大维度。
                      点击各节点可查看针对云南普河村的建筑实操选材。
                    </p>
                  </div>

                  {/* Elegant Horizontal Mindmap directly modeling 3rd image inside an interactive box */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm my-4 grid grid-cols-1 md:grid-cols-7 gap-4 relative z-20 overflow-x-auto min-h-[290px]">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                    {/* Root center column (3) */}
                    <div className="md:col-span-3 flex flex-col justify-center items-center space-y-3.5 border-r border-slate-100 md:pr-4">
                      {/* Center Node: 家 / 归属感 */}
                      <div className="bg-slate-900 text-white rounded-3xl p-5 text-center shadow-lg border-2 border-amber-400 w-full max-w-[220px]">
                        <Home className="w-5 h-5 mx-auto text-amber-400 animate-bounce" />
                        <h4 className="font-bold text-sm mt-1.5">核心：家 ❖ 归属感</h4>
                        <p className="text-[9px] text-slate-400 mt-1">昆明县街街道 · 慢行书店民宿</p>
                      </div>

                      <div className="text-[10.5px] text-slate-600 text-center font-serif leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-[240px]">
                        “房东(主)+中租(宾)+家眷短租。以大书架作隔断，开放灶台做炉烟，重筑亲情纽带。”
                      </div>
                    </div>

                    {/* Left branches (Col 1 & 2): 怀旧, 地域, 舒适 */}
                    <div className="md:col-span-2 flex flex-col justify-around gap-4 py-2">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          <span>怀旧/收藏 (Vintage)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          留存复古铜摆件、铜染吊扇、防老化竹制灯罩及当地宣纸扎彩。
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>地域/民族 (Locality)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          建水红泥陶片铺底，滇中老木雕点缀天井走廊，渲染在地土气。
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>舒适/日常 (Comfort)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          定制棉麻沙发坐榻、原木雕书桌、双重隔音老木窗与全贴合暖皮靠垫。
                        </p>
                      </div>
                    </div>

                    {/* Right branches (Col 5 & 6): 候鸟, 温情, 自由 */}
                    <div className="md:col-span-2 flex flex-col justify-around gap-4 py-2">
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>候鸟栖居 (Escapism)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          对冲一二线城市紧绷感，为3-6月长居青年量身配置独立深读格。
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span>温情停留 (Family Connection)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          设立2套家属短期专属阁房。家人探亲时能拥有完美舒适感。
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-400 transition">
                        <div className="flex items-center space-x-1.5 text-slate-800 font-bold text-xs">
                          <span className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>远景/自由 (Freedom)</span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 mt-1 leading-snug">
                          朝向安宁西山野景，开一扇借景小圆窗，让心神随长天落日远游。
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 text-center font-mono">
                    ✦ 通过「触觉-材质」、「嗅觉-普洱木香」、「视觉-暖铜染料」构建心智安全罩。
                  </div>
                </div>
              )}

              {currentSlide === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-2 md:py-6 h-full items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Heart className="w-4 h-4" />
                      <span>04. 设计主题 (THE DESIGN CONCEPT)</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight leading-none flex items-baseline gap-2">
                      “回 归” 
                      <span className="text-sm font-sans font-normal text-slate-400 tracking-normal block">COMING HOME</span>
                    </h2>

                    <div className="border-l-3 border-amber-500 pl-4 py-1 flex flex-col space-y-2">
                      <p className="text-xs text-slate-600 font-serif leading-relaxed italic">
                        “我愿意，成为一只归巢的雁。我愿意，成为一条自由的鱼。而此刻，我只愿成为我自己。”
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify mt-2">
                        人在经历过一些之后才能够划分清什么是喧嚣什么是真实，有时候所谓的敷衍，并不意味着向前走，而是回头看，重新找到自己，让灵魂回归到自己最真实的心口，给沧桑的心灵一个安静的港湾，让自己回到那个最初的地方，找到那个最早的起点，休整之后再度出发。从此变得平静而真实，因为以这样的方式存在才可以叫做“生活”。
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center pt-2">
                      <div className="p-2.5 bg-slate-100/80 rounded-xl">
                        <span className="text-sm font-serif font-bold text-slate-800 block">归来</span>
                        <span className="text-[9px] text-slate-400 block font-mono mt-0.5">Return</span>
                      </div>
                      <div className="p-2.5 bg-slate-100/80 rounded-xl">
                        <span className="text-sm font-serif font-bold text-slate-800 block">归宿</span>
                        <span className="text-[9px] text-slate-400 block font-mono mt-0.5">Sanctuary</span>
                      </div>
                      <div className="p-2.5 bg-slate-100/80 rounded-xl">
                        <span className="text-sm font-serif font-bold text-slate-800 block">归真</span>
                        <span className="text-[9px] text-slate-400 block font-mono mt-0.5">Simplicity</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 text-white rounded-xl">
                        <span className="text-sm font-serif font-bold text-amber-400 block">归属</span>
                        <span className="text-[9px] text-slate-400 block font-mono mt-0.5">Belonging</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic picture placeholder inspired by slider 11 & 12 */}
                  <div className="md:col-span-5 h-[320px] bg-sky-950/60 rounded-3xl p-6 border border-slate-800 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
                    {/* Abstract CSS vector showing sunset with birds silhouette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-400/30 via-slate-900 to-slate-950 z-0" />
                    
                    {/* Glowing golden sun */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/10 blur-3xl z-0" />
                    <div className="absolute bottom-10 left-12 w-16 h-16 rounded-full bg-amber-400/40 opacity-70 z-0 border border-amber-300/20" />

                    {/* Flying bird paths crafted beautifully as vector SVGs */}
                    <svg className="absolute inset-0 z-10 w-full h-full text-white/40 pointer-events-none">
                      {/* Bird 1 */}
                      <path d="M 50 40 Q 60 35 70 42 Q 80 35 90 40 Q 82 48 50 40 Z" fill="currentColor" />
                      {/* Bird 2 */}
                      <path d="M 120 65 Q 128 61 136 67 Q 144 61 152 65 Q 145 71 120 65 Z" fill="currentColor" className="opacity-95" />
                      {/* Bird 3 */}
                      <path d="M 190 30 Q 195 27 200 31 Q 205 27 210 30 Q 206 35 190 30 Z" fill="currentColor" className="opacity-50" />
                    </svg>

                    <span className="relative z-10 text-[9px] tracking-widest uppercase font-bold text-amber-400 font-mono">
                      YUNNAN ANNING LANDSCAPE
                    </span>

                    <div className="relative z-10 text-right mt-auto">
                      <h3 className="text-xl font-serif font-bold text-orange-200">心之所属 · 暮色飞归</h3>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">安宁普河村晚霞掠影 (云南林野色系)</p>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 6 && (
                <div className="py-2 md:py-4 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Layout className="w-4 h-4" />
                      <span>05. 平面布置 (FLOOR LAYOUT PLAN)</span>
                    </div>
                    <div className="flex justify-between items-baseline flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        三长住 + 两短租 &amp; 共享大书架 + 开放厨房
                      </h2>
                      <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">一颗印双层置换流线</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      如何合理将传统“一颗印”改造成契合长住与短住、开放烹饪与深度静听的黄金格局。
                    </p>
                  </div>

                  {/* Minimal Switzerland Swiss-grid floor layout breakdown cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                    <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col justify-between shadow-2xs">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">1F - 礼仪与口福核心</span>
                        <h4 className="text-sm font-bold mt-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                          中堂大书库 + 开放式厨房
                        </h4>
                        <p className="text-[10.5px] text-slate-400 mt-2 leading-relaxed">
                          正堂整体打通为两层通高藏书廊，陈设 3000 册图书。西北和西南门房打通合围，化为朝向中庭天井的<strong>L型开放式厨房</strong>、木案岛台。
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono mt-3 block">● 面积: ~65㎡ | 分贝: 25-45dB (轻交往)</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-teal-600 font-bold uppercase">1F - 房东起居与茶堂</span>
                        <h4 className="text-sm font-bold mt-1.5 text-slate-950 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-teal-600" />
                          起居套间 + 普洱茶室
                        </h4>
                        <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                          北厢房配置为<strong>房东本人长期卧室</strong>(配带隔音隔断的卫浴架)。南厢房配置为共享熟茶室与手工案。
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-3 block">● 面积: ~38㎡ | 独立庭院入口</span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">2F - 中长租舒适书阁</span>
                        <h4 className="text-sm font-bold mt-1.5 text-slate-950 flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-indigo-600" />
                          2套长期学者套房
                        </h4>
                        <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                          二层正房楼上及北厢房整体置换为<strong>两套长期租客专属套房</strong>。享有2.5m挑檐走廊吧台、宣纸光斑、以及超大书桌工作舱，支持3-6月创作。
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-3 block">● 面积: ~55㎡ | 专属隔音夹层</span>
                    </div>

                    <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-teal-700 font-bold uppercase">2F - 亲朋聚会栖舍</span>
                        <h4 className="text-sm font-bold mt-1.5 text-slate-950 flex items-center gap-1.5">
                          <Anchor className="w-3.5 h-3.5 text-teal-700" />
                          2套家属短期客房
                        </h4>
                        <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                          二层东北房及东南梢房，改建为<strong>两款高标准短租客房</strong>。作为主、长租客家属及朋友来访时的专属卧心，配备五星极干湿分离。
                        </p>
                      </div>
                      <span className="text-[10px] text-teal-600 font-mono mt-3 block">● 面积: ~34㎡ | 独立备用卫浴</span>
                    </div>
                  </div>

                  <div className="text-[10.5px] text-slate-400 flex justify-between items-center px-1 font-mono">
                    <span>* 隔音设计：所有客房屋门采用软包实木门，空腔部分填充不燃岩棉达到 48dB 强隔绝规范</span>
                    <span>天井连通率: 100% (四水归堂)</span>
                  </div>
                </div>
              )}

              {currentSlide === 7 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 md:py-6 h-full items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Sun className="w-4 h-4" />
                      <span>06. 环境与微气候分析 (LOCAL microclimate)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      光照管理与防霉变
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed text-justify">
                      普河村委会位于温带季风高原季风气候区，日照非常充足，但夏秋季节降雨频繁，导致山区常有潮湿土气。
                      传统“一颗印”民居外墙高耸，朝天开敞的天井是天然冷巷：
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start space-x-2.5">
                        <div className="bg-amber-100 text-amber-700 p-1.5 rounded-lg text-xs font-bold mt-0.5">光</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">防直射折光系统 (Soft Lighting)</h4>
                          <p className="text-[10.5px] text-slate-500">
                            高原直射紫外线强烈。二层走道和中庭窗框统一采用拉丝红铜+外挑日本宣纸隔光板。过滤暴晒强光，保护昂贵的文脉书籍字画免于氧化卷边。
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2.5">
                        <div className="bg-cyan-100 text-cyan-700 p-1.5 rounded-lg text-xs font-bold mt-0.5">潮</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">樟木防湿垫层与底部排水分洪</h4>
                          <p className="text-[10.5px] text-slate-500">
                            书籍最忌返潮与白蚁折磨。地基铺设 20mm 厚压路火山岩滤层加 10mm 细干黄砂。高架木书架脚套采用 50mm 樟木活性炭垫层，防霉吸味。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scientific Environmental Diagram Simulation */}
                  <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200/80 min-h-[300px] flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-600 block">MICROCLIMATE VECTOR</span>
                      <h4 className="text-sm font-bold text-slate-800 mt-1">普河旧宅垂直通风与光照切面</h4>
                    </div>

                    {/* Scientific environmental vector representation */}
                    <div className="my-4 h-36 bg-white border border-slate-250 rounded-2xl p-2 relative flex flex-col justify-center items-center overflow-hidden">
                      <svg width="100%" height="100%" viewBox="0 0 240 120" className="absolute">
                        {/* Sun rays heading downward */}
                        <line x1="120" y1="10" x2="120" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                        <line x1="160" y1="10" x2="140" y2="50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
                        
                        {/* Golden sun ball */}
                        <circle cx="160" cy="10" r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                        
                        {/* Outline of Double Story "Yiganyin" House Section */}
                        {/* Left Room wall */}
                        <rect x="10" y="40" width="60" height="70" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
                        <text x="30" y="70" fill="#475569" fontSize="6px" fontWeight="bold">1F 房东卧室</text>
                        <text x="30" y="100" fill="#475569" fontSize="6px" fontWeight="bold">2F 长租套房</text>
                        
                        {/* High air flow coming down the central skywell */}
                        <path d="M 120 15 Q 110 50 120 85 Q 130 110 120 115" fill="none" stroke="#2563eb" strokeWidth="1.2" className="animate-pulse" />
                        <text x="132" y="72" fill="#2563eb" fontSize="5.5" fontWeight="bold">冷风吸气流 (冷巷)</text>
                        
                        {/* Right Room wall */}
                        <rect x="170" y="40" width="60" height="70" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
                        <text x="180" y="70" fill="#475569" fontSize="6px" fontWeight="bold">1F 茶室</text>
                        <text x="180" y="100" fill="#475569" fontSize="6px" fontWeight="bold">2F 短租客房</text>

                        {/* Ground insulation layer label */}
                        <rect x="10" y="105" width="220" height="6" fill="#ccd1db" />
                        <text x="80" y="110" fill="#334155" fontSize="4.5px" fontFamily="monospace">防潮樟木活性炭过滤底垫层</text>
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>● 光线反射折减: 45% (利阅读)</span>
                      <span>相对风速: 1.2m/s (无感微风)</span>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 8 && (
                <div className="py-2 md:py-6 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Palette className="w-4 h-4" />
                      <span>07. 色彩分析 (COLOR PALETTE STRATEGY)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      「滇铜染茶」与「黛瓦灰墙」色温融合
                    </h2>
                    <p className="text-xs text-slate-500">
                      提取昆明普河野生松林山脉、传统村落瓦片与红土的色彩元素。拒绝塑料质感。
                    </p>
                  </div>

                  {/* Elegant Grid displays representing the color selections matching the design styles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                    {/* Color style board 1 */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-amber-700 font-bold uppercase">PRESET A - (推荐)</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">滇铜染茶 · 普洱熟褐</h4>
                        <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                          采用生红赭、熟茶褐、高反射率的拉丝金黄铜，配以干燥云南松木本色。如同昆明午后洒在古籍围合上的饱满阳光，温馨、高古、充满家的包容。
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex space-x-1.5 h-8">
                          <div className="flex-1 bg-amber-900 rounded-lg text-[8px] text-white flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#78350F" }}>茶赭</div>
                          <div className="flex-1 bg-amber-700 rounded-lg text-[8px] text-white flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#B45309" }}>松油</div>
                          <div className="flex-1 bg-amber-100 rounded-lg text-[8px] text-amber-950 flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#FEF3C7" }}>铜金</div>
                          <div className="flex-1 bg-orange-850 rounded-lg text-[8px] text-white flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#9A3412" }}>红粘瓦</div>
                        </div>
                        <span className="text-[9.5px] text-slate-400 font-mono block text-center">色光谱温: 2700K~3100K 暖黄</span>
                      </div>
                    </div>

                    {/* Color style board 2 */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-3xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">PRESET B - (选配)</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">黛瓦灰墙 · 枯墨禅意</h4>
                        <p className="text-[10.5px] text-slate-500 mt-2 leading-relaxed">
                          源于老青砖、青瓦及阴雨连绵的天井意象。采用高度碳化的深色木材、冷灰火山岩面层、搭配亚麻白与米石。静谧而悠长，提供极高规格的静思学术体验。
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex space-x-1.5 h-8">
                          <div className="flex-1 bg-slate-800 rounded-lg text-[8px] text-white flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#1F2937" }}>碳黑</div>
                          <div className="flex-1 bg-slate-500 rounded-lg text-[8px] text-white flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#6B7280" }}>瓦灰</div>
                          <div className="flex-1 bg-slate-100 rounded-lg text-[8px] text-slate-950 flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#F3F4F6" }}>亚麻</div>
                          <div className="flex-1 bg-slate-350 rounded-lg text-[8px] text-slate-800 flex items-end p-1 font-mono hover:flex-[1.5] transition-all" style={{ backgroundColor: "#D1D5DB" }}>粉地</div>
                        </div>
                        <span className="text-[9.5px] text-slate-400 font-mono block text-center">色光谱温: 4000K 柔白静思</span>
                      </div>
                    </div>

                    {/* Color style board 3 - user style */}
                    <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-3xs flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">ACTIVE SELECTION</span>
                        <h4 className="text-sm font-bold text-white mt-1">当前匹配：{activeStyle.name}</h4>
                        <p className="text-[10.5px] text-slate-300 mt-2 leading-relaxed">
                          当前交互系统已激活该美学色系。大书架材质、客房地板与铜件都将依此参数向营造队长发出施工蓝图配置。
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex space-x-1.5 h-8">
                          {activeStyle.colors.map((c, idx) => (
                            <div
                              key={idx}
                              className="flex-1 rounded-lg text-[8px] flex items-end p-1 font-mono hover:flex-[1.5] transition-all border border-white/10"
                              style={{ backgroundColor: c, color: idx === 2 ? "#000" : "#fff" }}
                            >
                              C{idx+1}
                            </div>
                          ))}
                        </div>
                        <span className="text-[9.5px] text-slate-400 font-mono block text-center">已同底端清单数据同步</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center font-serif">
                    “色调是情感的第一眼记忆。普河村民宿以泥土、松木和拉丝铜，勾勒出真正的有生活炊烟的‘藏书旅舍’。”
                  </div>
                </div>
              )}

              {currentSlide === 9 && (
                <div className="py-2 md:py-6 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Hammer className="w-4 h-4" />
                      <span>08. 材质分析档案 (MATERIAL ANALYTICS)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      云南原木 · 建水红陶 · 绝热气凝胶
                    </h2>
                    <p className="text-xs text-slate-500">
                      老古建最忌讳合成不透气复合板。全合院改造坚持“零甲醛、强导湿、耐火阻隔”五大材料定序：
                    </p>
                  </div>

                  {/* Elegant Tactile Materials Bento Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 my-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xs transition">
                      <span className="text-xl">🪵</span>
                      <h4 className="text-xs font-bold text-slate-800 mt-2">云南松原木板</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        取自普河周遭合法商品林，涂刷纯天然天然油脂。释放低挥发防虫松香。
                      </p>
                      <span className="text-[9px] font-mono text-amber-600 mt-2 font-bold bg-amber-50 px-1 py-0.5 rounded w-max">#大书架、客房地板</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xs transition">
                      <span className="text-xl">🪵</span>
                      <h4 className="text-xs font-bold text-slate-800 mt-2">拉丝金/红黄铜</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        传统的滇铜雕琢。用于橱柜拉手、书架底座夹板、楼梯手扶，手感温暖沉重。
                      </p>
                      <span className="text-[9px] font-mono text-amber-600 mt-2 font-bold bg-amber-50 px-1 py-0.5 rounded w-max">#卯榫保护件、防震扣</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xs transition">
                      <span className="text-xl">🧱</span>
                      <h4 className="text-xs font-bold text-slate-800 mt-2">建水红窑陶片</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        建水红土烧制，具极强的物理吸湿防霉功效。粉碎作为花台与天井泄水槽滤层。
                      </p>
                      <span className="text-[9px] font-mono text-amber-600 mt-2 font-bold bg-amber-50 px-1 py-0.5 rounded w-max">#天井排水、园艺盖底</span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xs transition">
                      <span className="text-xl">🪨</span>
                      <h4 className="text-xs font-bold text-slate-800 mt-2">气凝胶绝热棉</h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        高标不燃纳米气凝胶防潮绝热层，塞于木阁楼空心隔板内，隔音性能优越。
                      </p>
                      <span className="text-[9px] font-mono text-amber-600 mt-2 font-bold bg-amber-50 px-1 py-0.5 rounded w-max">#客房客防防火隔断</span>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col justify-between hover:shadow-2xs transition">
                      <span className="text-xl">📜</span>
                      <h4 className="text-xs font-bold text-amber-400 mt-2">天然桑皮高透纸</h4>
                      <p className="text-[10px] text-slate-300 mt-1">
                        不霉变，透光纯正自然。外压防划纸膜，用于天井灯、书橱滑门蒙面。
                      </p>
                      <span className="text-[9px] font-mono text-amber-400 mt-2 font-bold bg-slate-800 px-1 py-0.5 rounded w-max">#防炫光漫射遮阳</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center font-mono">
                    ✦ 所有供应商坚持100公里内本地取材，确保生态低碳、环境友好物尽其用。
                  </div>
                </div>
              )}

              {currentSlide === 10 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2 md:py-6 h-full items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Layers className="w-4 h-4" />
                      <span>09. 设计方案详解 (DETAILED SOLUTIONS)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight leading-tight">
                      中院水墨厨房与贯通式阅览长廊
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed text-justify">
                      如何落实<strong>“大图书空间”</strong>与<strong>“开放式厨房”</strong>这一对冰火矛盾：
                    </p>

                    <div className="space-y-3">
                      <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/50">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          “隔而不断”大书廊 (一层正堂)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          正堂老房梁极为轩丽，不可加梁。采用双层厚黄铜件螺栓无损锁夹，从承重柱拉接两排悬挂式“纸屏风吊书柜”，高容书架，底部设防震泡棉接触。
                        </p>
                      </div>

                      <div className="bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-200/50">
                        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          “烟火相安”开放式灶台 (耳房门套)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          西南角门房打通合围，安装高效下吸式集成灶，烟道地底清淤铺设不锈钢密闭管道排向西侧院墙，确保油烟0沾染中庭藏书；特宽老木中岛台支持10人围就包饺子品。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scientific Construction Drawing / Structural Explanations Sheet */}
                  <div className="bg-white border border-slate-250 p-6 rounded-3xl shadow-sm space-y-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block">CULINARY &amp; LITERARY SAFETY</span>
                    
                    <div className="bg-slate-50 p-4 rounded-2xl text-[11px] text-slate-600 space-y-2">
                      <h4 className="font-bold text-slate-800 flex items-center gap-1">
                        <ShieldAlert className="w-4 h-4 text-emerald-600" />
                        安全防卫双重规约：
                      </h4>
                      <p className="leading-relaxed">
                        由于书籍及榫卯结构对异味及油温极度敏感，本开放式厨房搭载气旋吸风系统(吸附率 99.4%)。
                        炉火下方地面配铺硬化水泥垫层：
                      </p>
                      <ul className="space-y-1 font-mono pl-3 text-[10px]">
                        <li>1. 【集成吸排】负压下吸，油烟绝不越过中庭</li>
                        <li>2. 【地暖隔绝】底层地脚增设泡沫玻璃隔热块</li>
                        <li>3. 【自动水雾】厨房顶格安装联动高压灭火枪</li>
                      </ul>
                    </div>

                    <div className="border border-slate-100 rounded-xl p-3 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">大图书馆藏书容量</span>
                        <strong className="text-slate-800 font-mono text-sm">3,500 ~ 4,200 册</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">建议最大负荷</span>
                        <strong className="text-slate-800 font-mono text-sm">32 人 (不积压)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 11 && (
                <div className="py-2 md:py-4 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Eye className="w-4 h-4" />
                      <span>10. 空间意向与情绪聚光 (SPATIAL IMAGERY Moodboard)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      书香熏染的一宿一日
                    </h2>
                    <p className="text-xs text-slate-500">
                      通过精选插画卡片，展示四款具有云南县街普河乡村温度的情绪场景：
                    </p>
                  </div>

                  {/* Artistic moodboard cards simulating photos in slide 10 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs hover:border-amber-400 transition group flex flex-col justify-between p-4">
                      <div className="h-28 bg-amber-50 rounded-xl relative overflow-hidden flex items-center justify-center font-serif text-slate-400 text-lg border border-slate-100 italic">
                        “雨落天井，烹茶诵读”
                      </div>
                      <div className="mt-3">
                        <h4 className="text-xs font-bold text-slate-800">01 天井看书茶吧</h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          听着屋檐沥水撞击火山岩，在青藤围绕的藤椅上品普洱，读地志。
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs hover:border-amber-400 transition group flex flex-col justify-between p-4">
                      <div className="h-28 bg-emerald-50 rounded-xl relative overflow-hidden flex items-center justify-center font-serif text-slate-400 text-lg border border-slate-100 italic">
                        “炊烟拂书，共享松木香”
                      </div>
                      <div className="mt-3">
                        <h4 className="text-xs font-bold text-slate-800">02 开放岛台厨房</h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          围拢在宽阔的云南红松大岛台旁，一边烤土豆喝茶，一边漫谈着家事。
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs hover:border-amber-400 transition group flex flex-col justify-between p-4">
                      <div className="h-28 bg-blue-50 rounded-xl relative overflow-hidden flex items-center justify-center font-serif text-slate-400 text-lg border border-slate-100 italic">
                        “借一窗松翠，宿于墨香”
                      </div>
                      <div className="mt-3">
                        <h4 className="text-xs font-bold text-slate-800">03 长期学者房舱</h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          高声学隔绝，手持滇铜小台灯。伴随着松木天然精油，安心执笔撰文。
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-3xs hover:border-amber-400 transition group flex flex-col justify-between p-4 border border-slate-850">
                      <div className="h-28 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center font-serif text-amber-400 text-lg border border-slate-800 italic">
                        “回归怀旧，家属卧处”
                      </div>
                      <div className="mt-3">
                        <h4 className="text-xs font-bold text-amber-400">04 短居家属客舍</h4>
                        <p className="text-[10px] text-slate-400 mt-1">
                          床头设计宣纸插卡式柔光板，无任何直射光干扰，一觉睡到自然醒。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center font-mono">
                    ✦ 实景呈现将配备云南建水紫砂多孔茶具及手工扎染织布搭饰。
                  </div>
                </div>
              )}

              {currentSlide === 12 && (
                <div className="py-2 md:py-4 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-rose-600 font-semibold text-xs tracking-wider uppercase">
                      <Sparkles className="w-4 h-4" />
                      <span>11. 营造报价清单与时间计划表 (BUDGET ESTIMATION)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3.5xl font-bold text-slate-900 tracking-tight">
                      古建活化投资测算 &amp; 施工分阶
                    </h2>
                    <p className="text-xs text-slate-500">
                      县街普河村项目整体翻新施工，恪守“不拆大木、新旧防火分离”原则，概算详情如下：
                    </p>
                  </div>

                  {/* Elegant professional Estimation Table */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs my-4 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-xs text-left text-slate-600 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10.5px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                            <th className="py-2 px-3">施工分项</th>
                            <th className="py-2 px-3">工艺与核心材料要点</th>
                            <th className="py-2 px-3">测绘面积</th>
                            <th className="py-2 px-3 text-right">单价概算</th>
                            <th className="py-2 px-3 text-right">合价 (CNY)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-105 font-medium text-slate-700">
                          <tr>
                            <td className="py-2 px-3 font-bold text-slate-900">1. 一层大藏书书廊与茶堂</td>
                            <td className="py-2 px-3 text-slate-500">樟木木炭防潮垫 + 宣纸低强度漫射罩 + 泡棉缓冲固定书柜夹</td>
                            <td className="py-2 px-3 font-mono">65.0 ㎡</td>
                            <td className="py-2 px-3 text-right font-mono">¥2,800/㎡</td>
                            <td className="py-2 px-3 text-right font-bold font-mono">¥182,000</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-bold text-slate-900">2. 门耳房开放式厨房 + 岛台</td>
                            <td className="py-2 px-3 text-slate-500">下吸式防沾集成灶系统 + 云南松木粗案岛台 + 集成烟道清挖</td>
                            <td className="py-2 px-3 font-mono">22.4 ㎡</td>
                            <td className="py-2 px-3 text-right font-mono">¥3,200/㎡</td>
                            <td className="py-2 px-3 text-right font-bold font-mono">¥71,680</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-bold text-slate-900">3. 二层2间 3-6月长中租学者房</td>
                            <td className="py-2 px-3 text-slate-500">岩棉防火大隔音隔断 48dB + 睡帘集成书屉大写字案台</td>
                            <td className="py-2 px-3 font-mono">55.0 ㎡</td>
                            <td className="py-2 px-3 text-right font-mono">¥4,000/㎡</td>
                            <td className="py-2 px-3 text-right font-bold font-mono">¥220,000</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 font-bold text-slate-900">4. 二层2间 亲感短租客舍 (家属备)</td>
                            <td className="py-2 px-3 text-slate-500">高品质隔绝纸屏套房 + 卫浴干湿五星极分离配件 + 软榻</td>
                            <td className="py-2 px-3 font-mono">34.0 ㎡</td>
                            <td className="py-2 px-3 text-right font-mono">¥4,500/㎡</td>
                            <td className="py-2 px-3 text-right font-bold font-mono">¥153,000</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-slate-200 bg-slate-50/50">
                            <td colSpan={2} className="py-2.5 px-3 font-bold text-slate-900">合院物料及基础物理加固统合投资概算</td>
                            <td className="py-2.5 px-3 font-mono font-bold">176.4 ㎡</td>
                            <td className="py-2.5 px-3 text-right text-[10.5px] font-bold text-slate-400">平均约 ¥3,550/㎡</td>
                            <td className="py-2.5 px-3 text-right text-sm font-extrabold font-mono text-emerald-600">¥626,680</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Timeline bar charts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                        <span className="text-[9px] text-slate-400 block font-mono">阶段 01 — 基础加固与除湿 (W1-W4)</span>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "100%" }} />
                        </div>
                        <span className="text-[10px] text-slate-600 mt-1 block font-medium">清淤、垫底炭砂防霉防潮铺设</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                        <span className="text-[9px] text-slate-400 block font-mono">阶段 02 — 榫卯吊装与集成设备 (W5-W8)</span>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: "70%" }} />
                        </div>
                        <span className="text-[10px] text-slate-600 mt-1 block font-medium">无损黄铜扣夹书架、烟流泄道封气</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100/80">
                        <span className="text-[9px] text-slate-400 block font-mono">阶段 03 — 细节雕饰与书卷陈列 (W9-W12)</span>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: "20%" }} />
                        </div>
                        <span className="text-[10px] text-slate-600 mt-1 block font-medium">宣纸光饰阻隔、茶具铺挂、书籍调配</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 text-center font-mono flex justify-between px-1">
                    <span>* 报价仅供参考，普河当地泥瓦、木作师傅人工成本已包含在内</span>
                    <span>消防联动：超细高压细水雾管件包 ¥32,000 (选项清单中单独勾选)</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide navigation indicators dot bar */}
        <div className="mt-6 flex justify-between items-center text-[10.5px] text-slate-400 border-t border-slate-100 pt-4">
          <span>
            项目：<strong className="text-slate-700">{designState.customTitle || "安宁普河宿书宿合院"}</strong>
          </span>
          <div className="flex space-x-1.5">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i + 1)}
                className={`w-2.5 h-2.5 rounded-full border transition-all ${
                  currentSlide === i + 1
                    ? "bg-amber-500 border-amber-600 scale-125"
                    : "bg-slate-200 hover:bg-slate-300 border-slate-300"
                }`}
                title={`第 ${i+1} 页`}
              />
            ))}
          </div>
          <span className="font-mono">
            页码: {currentSlide} / {totalSlides}
          </span>
        </div>

      </div>

      {/* Presentation Assistant Panel */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>
            <strong>营造向导提示：</strong> 阁下可在上方<strong>平面布置 (C06)</strong>与<strong>报价清单 (C12)</strong>中实时看到同步更新的数据。在下方的CAD测绘面板点击各房间，即可将客房重置或修改配套。
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              // Scroll down to active blueprint configurator section
              const tgt = document.getElementById("interactive-blueprint-headline");
              if (tgt) tgt.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-slate-600 hover:text-slate-900 font-semibold text-xs border border-slate-250 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
          >
            <span>开始精修具体部位</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
