import React from "react";
import { RoomSpec, RenovationOption } from "../types";
import { RENOVATION_OPTIONS } from "../data/spacesData";
import { Compass, Eye, ShieldAlert, ArrowUpRight, Maximize2 } from "lucide-react";

interface InteractiveMapProps {
  floor: 1 | 2;
  setFloor: (f: 1 | 2) => void;
  rooms: Record<string, RoomSpec>;
  activeRoomId: string;
  setActiveRoomId: (id: string) => void;
}

export default function InteractiveMap({
  floor,
  setFloor,
  rooms,
  activeRoomId,
  setActiveRoomId,
}: InteractiveMapProps) {
  // Get icon/label helper for room renovation state
  const getRenovationDetails = (type: string): RenovationOption => {
    return (
      RENOVATION_OPTIONS.find((o) => o.type === type) ||
      RENOVATION_OPTIONS[RENOVATION_OPTIONS.length - 1]
    );
  };

  // Svg layout specs
  // Ground Floor rooms mapping
  const groundRooms = [
    {
      id: "1F-COURTYARD",
      name: "中庭天井 (Rain-Yard)",
      originalRole: "Tianjing 天井",
      elevation: "-0.150",
      x: 175,
      y: 135,
      w: 130,
      h: 110,
      color: "rgba(14, 116, 144, 0.12)",
      hoverUrl: "水墨天井露天阅读区"
    },
    {
      id: "1F-ZHENGTANG",
      name: "一层正堂 (Main Hall)",
      originalRole: "Zhengtang 正堂",
      elevation: "+0.300",
      x: 305,
      y: 115,
      w: 115,
      h: 150,
      color: "rgba(194, 65, 12, 0.08)",
      hoverUrl: "古籍陈设/总台接待"
    },
    {
      id: "1F-NORTH-XIANG",
      name: "北侧客房厢房",
      originalRole: "North Xiangfang 北厢房",
      elevation: "±0.000",
      x: 175,
      y: 40,
      w: 130,
      h: 95,
      color: "rgba(6, 95, 70, 0.08)"
    },
    {
      id: "1F-SOUTH-XIANG",
      name: "南侧客房厢房",
      originalRole: "South Xiangfang 南厢房",
      elevation: "±0.000",
      x: 175,
      y: 245,
      w: 130,
      h: 95,
      color: "rgba(234, 179, 8, 0.08)"
    },
    {
      id: "1F-WEST-NORTH",
      name: "西北门房耳房",
      originalRole: "West-North Minfang 西北耳房",
      elevation: "±0.000",
      x: 60,
      y: 40,
      w: 115,
      h: 115,
      color: "rgba(30, 41, 59, 0.08)"
    },
    {
      id: "1F-WEST-SOUTH",
      name: "西南门房耳房",
      originalRole: "West-South Minfang 西南耳房",
      elevation: "±0.000",
      x: 60,
      y: 225,
      w: 115,
      h: 115,
      color: "rgba(30, 41, 59, 0.08)"
    },
    {
      id: "1F-EAST-NORTH",
      name: "东北梢间 (North Closet)",
      originalRole: "East-North Room 东北梢房",
      elevation: "±0.000",
      x: 420,
      y: 40,
      w: 80,
      h: 130,
      color: "rgba(107, 114, 128, 0.08)"
    },
    {
      id: "1F-EAST-SOUTH",
      name: "东南梢间 (South Closet)",
      originalRole: "East-South Room 东南梢房",
      elevation: "±0.000",
      x: 420,
      y: 210,
      w: 80,
      h: 130,
      color: "rgba(107, 114, 128, 0.08)"
    }
  ];

  // First Floor rooms mapping
  const upperRooms = [
    {
      id: "2F-CORRIDOR",
      name: "走马转角楼回廊 (Eaves Deck)",
      originalRole: "Corridor 回廊",
      elevation: "+2.500",
      x: 155,
      y: 115,
      w: 150,
      h: 150,
      isHollowCenter: true, // we render a hollow frame representing the corridor hugging the courtyard
      innerX: 185,
      innerY: 135,
      innerW: 90,
      innerH: 110,
      color: "rgba(180, 83, 9, 0.12)"
    },
    {
      id: "2F-ZHENGTANG",
      name: "二层楼上正房",
      originalRole: "Upper Zhengtang 二层正堂",
      elevation: "+2.800",
      x: 305,
      y: 115,
      w: 115,
      h: 150,
      color: "rgba(194, 65, 12, 0.08)"
    },
    {
      id: "2F-NORTH-XIANG",
      name: "二层北厢房 (North Loft)",
      originalRole: "Upper North Xiang 二层北厢",
      elevation: "+2.500",
      x: 155,
      y: 40,
      w: 150,
      h: 75,
      color: "rgba(6, 95, 70, 0.08)"
    },
    {
      id: "2F-SOUTH-XIANG",
      name: "二层南厢房 (South Loft)",
      originalRole: "Upper South Xiang 二层南厢",
      elevation: "+2.500",
      x: 155,
      y: 265,
      w: 150,
      h: 75,
      color: "rgba(234, 179, 8, 0.08)"
    },
    {
      id: "2F-EAST-NORTH",
      name: "二层东北梢房",
      originalRole: "Upper Northeast Room 二层东北梢房",
      elevation: "+2.800",
      x: 420,
      y: 40,
      w: 80,
      h: 130,
      color: "rgba(124, 58, 237, 0.08)"
    },
    {
      id: "2F-EAST-SOUTH",
      name: "二层东南梢房",
      originalRole: "Upper Southeast Room 二层东南梢房",
      elevation: "+2.800",
      x: 420,
      y: 210,
      w: 80,
      h: 130,
      color: "rgba(124, 58, 237, 0.08)"
    }
  ];

  const currentSvgRooms = floor === 1 ? groundRooms : upperRooms;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300">
      {/* Blueprint Header */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-500/10 text-teal-400 p-2 rounded-lg">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm md:text-base flex items-center gap-1.5">
              一颗印古建结构勘测图
              <span className="text-xs font-mono font-normal opacity-50">
                SCALE: 1:120 · KUNMING
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {floor === 1 ? "一层平面布局：包含中庭天井、神圣正堂、南北耳房、门廊" : "二层平面布局：走马转角楼木回廊、正堂阁楼、退台厢房"}
            </p>
          </div>
        </div>

        {/* Level Selector */}
        <div className="inline-flex overflow-hidden p-1 bg-slate-800/80 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setFloor(1)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              floor === 1
                ? "bg-teal-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            一层 (Ground Floor) +0.00
          </button>
          <button
            onClick={() => setFloor(2)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              floor === 2
                ? "bg-teal-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            二层 (Upper Floor) +2.50
          </button>
        </div>
      </div>

      {/* Main CAD Interactive Canvas */}
      <div className="relative p-6 bg-slate-950 flex justify-center items-center overflow-auto min-h-[440px]">
        {/* Architectural grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Blueprint Compass Rose */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-20 hidden md:block select-none">
          <div className="w-16 h-16 border border-teal-500 rounded-full flex items-center justify-center font-mono text-[10px] text-teal-400">
            <div className="absolute -top-1 font-bold text-xs">北 N</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-teal-500 rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5px] h-14 bg-teal-500" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-[1px] bg-teal-500" />
            <span className="translate-y-3 font-semibold text-[8px]">雲南 · 昆明</span>
          </div>
        </div>

        {/* SVG Drawing Canvas */}
        <div className="w-full max-w-[560px] aspect-[560/380] transition-transform duration-500">
          <svg
            viewBox="0 0 540 370"
            className="w-full h-full font-sans select-none"
            style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
          >
            {/* outer plot boundary - red dashed like the drawings */}
            <path
              d="M 12 30 L 180 30 L 320 12 L 528 12 L 528 358 L 12 358 Z"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="6,4"
              opacity="0.3"
            />

            {/* main structural alignment lines (grid axes) like CAD */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="3,6" opacity="0.6">
              {/* Vertical axes */}
              <line x1="60" y1="20" x2="60" y2="350" />
              <line x1="175" y1="20" x2="175" y2="350" />
              <line x1="305" y1="20" x2="305" y2="350" />
              <line x1="420" y1="20" x2="420" y2="350" />
              <line x1="500" y1="20" x2="500" y2="350" />

              {/* Horizontal axes */}
              <line x1="40" y1="40" x2="520" y2="40" stroke="#475569" />
              <line x1="40" y1="130" x2="520" y2="130" />
              <line x1="40" y1="245" x2="520" y2="245" />
              <line x1="40" y1="335" x2="520" y2="335" stroke="#475569" />
            </g>

            {/* Base Wood Post Pillars - Gray dots as in original drawings */}
            <g fill="#475569" stroke="#64748b" strokeWidth="1" opacity="0.5">
              {/* Ground level pillars on intersections */}
              <circle cx="60" cy="40" r="3.5" />
              <circle cx="175" cy="40" r="3.5" />
              <circle cx="305" cy="40" r="3.5" />
              <circle cx="420" cy="40" r="3.5" />
              <circle cx="500" cy="40" r="3.5" />

              <circle cx="60" cy="130" r="3.5" />
              <circle cx="175" cy="130" r="3.5" />
              <circle cx="305" cy="130" r="3.5" />
              <circle cx="420" cy="130" r="3.5" />
              <circle cx="550" cy="130" r="3.5" className="hidden" />

              <circle cx="60" cy="245" r="3.5" />
              <circle cx="175" cy="245" r="3.5" />
              <circle cx="305" cy="245" r="3.5" />
              <circle cx="420" cy="245" r="3.5" />

              <circle cx="60" cy="335" r="3.5" />
              <circle cx="175" cy="335" r="3.5" />
              <circle cx="305" cy="335" r="3.5" />
              <circle cx="420" cy="335" r="3.5" />
              <circle cx="500" cy="335" r="3.5" />
            </g>

            {/* Draw Staircases - Semicolon patterns */}
            {floor === 1 && (
              <g stroke="#475569" strokeWidth="1" opacity="0.7">
                {/* North Staircase area */}
                <rect x="307" y="42" width="22" height="70" fill="none" strokeDasharray="2,2"/>
                <line x1="307" y1="52" x2="329" y2="52" />
                <line x1="307" y1="62" x2="329" y2="62" />
                <line x1="307" y1="72" x2="329" y2="72" />
                <line x1="307" y1="82" x2="329" y2="82" />
                <line x1="307" y1="92" x2="329" y2="92" />
                <line x1="307" y1="102" x2="329" y2="102" />
                {/* North stair direction arrow */}
                <path d="M 318 100 L 318 55 M 312 62 L 318 55 L 324 62" fill="none" stroke="#22d3ee" strokeWidth="1"/>
                <text x="313" y="112" fill="#22d3ee" fontSize="7" fontStyle="italic" stroke="none">UP</text>

                {/* South Staircase area */}
                <rect x="307" y="260" width="22" height="70" fill="none" strokeDasharray="2,2"/>
                <line x1="307" y1="270" x2="329" y2="270" />
                <line x1="307" y1="280" x2="329" y2="280" />
                <line x1="307" y1="290" x2="329" y2="290" />
                <line x1="307" y1="300" x2="329" y2="300" />
                <line x1="307" y1="310" x2="329" y2="310" />
                <line x1="307" y1="320" x2="329" y2="320" />
                {/* South stair direction arrow */}
                <path d="M 318 265 L 318 310 M 312 303 L 318 310 L 324 303" fill="none" stroke="#22d3ee" strokeWidth="1"/>
              </g>
            )}

            {floor === 2 && (
              <g stroke="#475569" strokeWidth="1" opacity="0.6">
                {/* Corridors wooden decking parallel slate slats */}
                {/* North and South Corridors wood texture */}
                <rect x="175" y="115" width="130" height="20" fill="none" />
                <rect x="175" y="235" width="130" height="20" fill="none" />
                {/* North hallway wooden lines */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line key={`nl-${i}`} x1={178 + i * 8} y1="115" x2={178 + i * 8} y2="135" stroke="#334155" strokeWidth="0.5"/>
                ))}
                {/* South hallway wooden lines */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line key={`sl-${i}`} x1={178 + i * 8} y1="235" x2={178 + i * 8} y2="255" stroke="#334155" strokeWidth="0.5"/>
                ))}
                {/* West corridor line slats */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`wl-${i}`} x1="155" y1={138 + i * 8} x2="175" y2={138 + i * 8} stroke="#334155" strokeWidth="0.5"/>
                ))}
              </g>
            )}

            {/* Entrance steps - West on Ground floor */}
            {floor === 1 && (
              <g stroke="#475569" strokeWidth="1" opacity="0.8">
                <rect x="36" y="160" width="24" height="50" fill="none" />
                <line x1="48" y1="160" x2="48" y2="210" />
                <line x1="42" y1="160" x2="42" y2="210" />
                <text x="18" y="188" fill="#94a3b8" fontSize="8" stroke="none">-0.45</text>
              </g>
            )}

            {/* Clickable Rooms Goup */}
            {currentSvgRooms.map((room) => {
              const spec = rooms[room.id] as RoomSpec;
              const reno = getRenovationDetails(spec.renovationType);
              const isActive = activeRoomId === room.id;

              // Compute color dynamically based on its active state and budget value
              let fillColor = room.color;
              let strokeColor = "#475569";
              let strokeWidth = "1.5";

              if (isActive) {
                fillColor = "rgba(20, 184, 166, 0.22)"; // solid bright active green
                strokeColor = "#14b8a6";
                strokeWidth = "2.5";
              } else {
                // Not unassigned gets colored
                if (spec.renovationType !== "unassigned") {
                  fillColor = "rgba(45, 212, 191, 0.04)";
                  strokeColor = "rgba(45, 212, 191, 0.4)";
                }
              }

              // Rendering corridor with a hollow cutout
              if (room.isHollowCenter && room.innerX && room.innerY && room.innerW && room.innerH) {
                return (
                  <g
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className="cursor-pointer group"
                  >
                    {/* Render Corridor Frame using an SVG Path with EvenOdd fill rule */}
                    <path
                      d={`
                        M ${room.x} ${room.y}
                        H ${room.x + room.w}
                        V ${room.y + room.h}
                        H ${room.x}
                        Z
                        M ${room.innerX} ${room.innerY}
                        H ${room.innerX + room.innerW}
                        V ${room.innerX + room.innerH}
                        H ${room.innerX}
                        Z
                      `}
                      fill={fillColor}
                      fillRule="evenodd"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      className="transition-all duration-200 group-hover:fill-teal-500/10"
                    />

                    {/* Eaves corridor book text center */}
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + 20}
                      fill={isActive ? "#14b8a6" : "#e2e8f0"}
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      {spec.name}
                    </text>
                    <text
                      x={room.x + room.w / 2}
                      y={room.y + 32}
                      fill="#38bdf8"
                      fontSize="8"
                      textAnchor="middle"
                      stroke="none"
                      className="opacity-80"
                    >
                      [{reno.label}]
                    </text>
                  </g>
                );
              }

              return (
                <g
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className="cursor-pointer group"
                >
                  {/* Base Slab Rectangle */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.w}
                    height={room.h}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    rx="4"
                    className="transition-all duration-200 group-hover:fill-teal-500/10"
                  />

                  {/* Room Label */}
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 - 2}
                    fill={isActive ? "#14b8a6" : "#e2e8f0"}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    stroke="none"
                  >
                    {spec.name}
                  </text>

                  {/* Renovation Status under text */}
                  <text
                    x={room.x + room.w / 2}
                    y={room.y + room.h / 2 + 10}
                    fill={spec.renovationType === "unassigned" ? "#64748b" : "#2dd4bf"}
                    fontSize="7.5"
                    textAnchor="middle"
                    stroke="none"
                    className="font-mono"
                  >
                    {reno.label.split(" (")[0]}
                  </text>

                  {/* Elevation Spot height label */}
                  {room.elevation && (
                    <text
                      x={room.x + 8}
                      y={room.y + room.h - 8}
                      fill="#94a3b8"
                      fontSize="7"
                      fontFamily="monospace"
                      stroke="none"
                      className="opacity-70"
                    >
                      EL: {room.elevation}
                    </text>
                  )}

                  {/* Tiny book volume capacity dot */}
                  {spec.bookVolume > 0 && (
                    <g transform={`translate(${room.x + room.w - 14}, ${room.y + room.h - 14})`} opacity="0.8">
                      <circle cx="5" cy="5" r="4.5" fill="#0ea5e9" stroke="none" />
                      <path d="M 3.5 3.5 H 6.5 V 6.5 H 3.5 Z" fill="white" className="hidden"/>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Inner yard center well annotation line */}
            {floor === 1 && (
              <g stroke="#0891b2" strokeWidth="0.8" fill="none" opacity="0.7">
                <circle cx="240" cy="190" r="14" />
                <path d="M 240 176 L 240 204 M 226 190 L 254 190" />
                <text x="246" y="184" fill="#0891b2" fontSize="7" stroke="none" fontWeight="bold">四水归堂</text>
              </g>
            )}

            {/* Door opening swings for aesthetics as in beautiful blueprints */}
            <g stroke="#22d3ee" strokeWidth="1" fill="none" opacity="0.5">
              {floor === 1 ? (
                <>
                  {/* Entrance double-door Swing */}
                  <path d="M 60 185 A 25 25 0 0 1 35 160" />
                  <line x1="60" y1="185" x2="35" y2="185" />
                  <path d="M 60 195 A 25 25 0 0 0 35 220" />
                  <line x1="60" y1="195" x2="35" y2="195" />

                  {/* Symmetrical doors for north & south wing */}
                  <path d="M 175 75 A 15 15 0 0 1 160 90" />
                  <line x1="175" y1="75" x2="175" y2="90" />
                  <path d="M 175 305 A 15 15 0 0 0 160 290" />
                  <line x1="175" y1="305" x2="175" y2="290" />
                </>
              ) : (
                <>
                  {/* Upper floor doors swings */}
                  <path d="M 305 150 A 15 15 0 0 1 290 165" />
                  <line x1="305" y1="150" x2="305" y2="165" />
                  <path d="M 305 230 A 15 15 0 0 0 290 215" />
                  <line x1="305" y1="230" x2="305" y2="215" />
                </>
              )}
            </g>
          </svg>
        </div>
      </div>

      {/* Map Action Banner */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
          <span>点击对应空间在右侧定制功能</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>蓝色角点标识该房包含藏书柜</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="font-mono text-teal-400">❖</span>
          <span>四水归堂：雨水汇聚天井天井</span>
        </div>
      </div>
    </div>
  );
}
