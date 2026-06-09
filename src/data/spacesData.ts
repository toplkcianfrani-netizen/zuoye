import { RoomSpec, RenovationOption, DesignStyle } from "../types";

export const DEFAULT_ROOM_DATA: Record<string, RoomSpec> = {
  // Ground Floor (一层)
  "1F-COURTYARD": {
    id: "1F-COURTYARD",
    floor: 1,
    name: "中庭天井 (四水归堂)",
    originalRole: "承雨天井、通风排湿、聚散交往核心",
    dimensions: "6.2m x 5.8m",
    elevation: "-0.150",
    renovationType: "open-courtyard",
    hasBookshelf: false,
    bookVolume: 120,
    capacity: 20
  },
  "1F-ZHENGTANG": {
    id: "1F-ZHENGTANG",
    floor: 1,
    name: "一层正堂大藏书阁",
    originalRole: "家族中堂、红白大礼、面朝天井完全敞开的礼仪核心",
    dimensions: "6.5m x 4.8m",
    elevation: "+0.300",
    renovationType: "reception",
    hasBookshelf: true,
    bookVolume: 3500,
    capacity: 15
  },
  "1F-NORTH-XIANG": {
    id: "1F-NORTH-XIANG",
    floor: 1,
    name: "北侧厢房 (房东起居套房)",
    originalRole: "尊长卧室或起居室 - 极为安静、地脚增设樟木防湿层",
    dimensions: "4.5m x 3.6m",
    elevation: "±0.000",
    renovationType: "boutique-stay",
    hasBookshelf: true,
    bookVolume: 400,
    capacity: 2
  },
  "1F-SOUTH-XIANG": {
    id: "1F-SOUTH-XIANG",
    floor: 1,
    name: "南侧厢房 (开放式厨房中岛)",
    originalRole: "晚辈卧室或厨房仓储 - 与天井衔接，清爽透气",
    dimensions: "4.5m x 3.6m",
    elevation: "±0.000",
    renovationType: "comm-cafe",
    hasBookshelf: true,
    bookVolume: 300,
    capacity: 12
  },
  "1F-WEST-NORTH": {
    id: "1F-WEST-NORTH",
    floor: 1,
    name: "西北耳房 (门卫伴读区)",
    originalRole: "门房、随从居住或柴米储藏",
    dimensions: "3.2m x 3.2m",
    elevation: "±0.000",
    renovationType: "quiet-reading",
    hasBookshelf: true,
    bookVolume: 350,
    capacity: 4
  },
  "1F-WEST-SOUTH": {
    id: "1F-WEST-SOUTH",
    floor: 1,
    name: "西南耳房 (云南地艺长廊)",
    originalRole: "门道对称耳房、老料储藏",
    dimensions: "3.2m x 3.2m",
    elevation: "±0.000",
    renovationType: "gallery",
    hasBookshelf: true,
    bookVolume: 400,
    capacity: 5
  },
  "1F-EAST-NORTH": {
    id: "1F-EAST-NORTH",
    floor: 1,
    name: "东北梢间 (备用藏书阁柜)",
    originalRole: "寝房或谷仓、近北侧楼梯",
    dimensions: "3.5m x 3.2m",
    elevation: "±0.000",
    renovationType: "quiet-reading",
    hasBookshelf: true,
    bookVolume: 600,
    capacity: 3
  },
  "1F-EAST-SOUTH": {
    id: "1F-EAST-SOUTH",
    floor: 1,
    name: "东南梢间 (深听阅读室)",
    originalRole: "寝房、靠近南侧楼梯",
    dimensions: "3.5m x 3.2m",
    elevation: "±0.000",
    renovationType: "quiet-reading",
    hasBookshelf: true,
    bookVolume: 500,
    capacity: 4
  },

  // Second Floor (二层)
  "2F-CORRIDOR": {
    id: "2F-CORRIDOR",
    floor: 2,
    name: "走马转角楼回廊",
    originalRole: "二层交通、倚靠观景、晾晒活动木质走道",
    dimensions: "围绕天井一周 (1.2m 宽)",
    elevation: "+2.500",
    renovationType: "gallery",
    hasBookshelf: true,
    bookVolume: 450,
    capacity: 15
  },
  "2F-ZHENGTANG": {
    id: "2F-ZHENGTANG",
    floor: 2,
    name: "二层正房楼上 (长期学者学者套房 A)",
    originalRole: "常置祭祀神龛或尊长书斋，采光优越、木雕精美，适宜长期潜心潜读",
    dimensions: "6.5m x 4.8m",
    elevation: "+2.800",
    renovationType: "boutique-stay",
    hasBookshelf: true,
    bookVolume: 1200,
    capacity: 2
  },
  "2F-NORTH-XIANG": {
    id: "2F-NORTH-XIANG",
    floor: 2,
    name: "二层北厢房 (长期学者学者套房 B)",
    originalRole: "晚辈读书房或卧室，挑高适中、清心安静且防晒",
    dimensions: "4.5m x 3.6m",
    elevation: "+2.500",
    renovationType: "loft-dorm",
    hasBookshelf: true,
    bookVolume: 650,
    capacity: 2
  },
  "2F-SOUTH-XIANG": {
    id: "2F-SOUTH-XIANG",
    floor: 2,
    name: "二层南厢房 (共享露廊自习室)",
    originalRole: "晚辈卧室或女红闺阁",
    dimensions: "4.5m x 3.6m",
    elevation: "+2.500",
    renovationType: "tea-salon",
    hasBookshelf: true,
    bookVolume: 1000,
    capacity: 8
  },
  "2F-EAST-NORTH": {
    id: "2F-EAST-NORTH",
    floor: 2,
    name: "二层东北房 (家属亲朋短期短期客房 C)",
    originalRole: "梢房上层、卧室或储物房",
    dimensions: "3.5m x 3.2m",
    elevation: "+2.800",
    renovationType: "boutique-stay",
    hasBookshelf: true,
    bookVolume: 300,
    capacity: 2
  },
  "2F-EAST-SOUTH": {
    id: "2F-EAST-SOUTH",
    floor: 2,
    name: "二层东南房 (家属亲朋短期短期客房 D)",
    originalRole: "梢房上层、卧室或储物房",
    dimensions: "3.5m x 3.2m",
    elevation: "+2.800",
    renovationType: "boutique-stay",
    hasBookshelf: true,
    bookVolume: 300,
    capacity: 2
  }
};

export const RENOVATION_OPTIONS: RenovationOption[] = [
  {
    type: "reception",
    label: "堂屋接待/总服务台",
    shortDesc: "保留大木作梁柱及青石地面，增设低矮黄铜接待案几与古建筑书籍墙。",
    icon: "ConciergeBell",
    costEstimate: 2800,
    suggestedBooks: 1500
  },
  {
    type: "boutique-stay",
    label: "古建读书客房 (大床/标间)",
    shortDesc: "原木质壁板嵌不锈钢隔音墙，设计带睡帘的床围书柜，打造宿于墨香的深居体验。",
    icon: "Bed",
    costEstimate: 4200,
    suggestedBooks: 300
  },
  {
    type: "loft-dorm",
    label: "阁楼书斋 (青年客房床位)",
    shortDesc: "通过木结构隔断设计成半私密书画床舱，共享宽敞实木书案和攀爬楼梯。",
    icon: "Bunk",
    costEstimate: 3500,
    suggestedBooks: 650
  },
  {
    type: "quiet-reading",
    label: "沉浸式深度阅读室",
    shortDesc: "隔绝杂音的厚壁木香屋，配备可微调靠背皮椅、独立防目眩纸灯与高容量专题书架。",
    icon: "BookOpen",
    costEstimate: 2200,
    suggestedBooks: 1000
  },
  {
    type: "comm-cafe",
    label: "一颗印读书咖啡吧",
    shortDesc: "融入滇南小粒咖啡香气，朝天开敞格栅，在磨脚古石板上摆放低饱和度钢木家具。",
    icon: "Coffee",
    costEstimate: 3000,
    suggestedBooks: 800
  },
  {
    type: "tea-salon",
    label: "滇南普洱茶书沙龙",
    shortDesc: "昆明传统竹编墙复刻、地炉式煮茶，在云南松香与茶气蒸腾下开展地缘文化说书会。",
    icon: "FlameKindling",
    costEstimate: 3200,
    suggestedBooks: 600
  },
  {
    type: "open-courtyard",
    label: "露天水墨天井庭院",
    shortDesc: "保留排雨排水古道(四水归堂)，中间设浅灰火山岩水槽，四周点缀昆明本土蕨类与苔藓书石。",
    icon: "CloudRain",
    costEstimate: 1800,
    suggestedBooks: 120
  },
  {
    type: "gallery",
    label: "营造技艺长廊",
    shortDesc: "保留原本的挑檐木雕，廊道壁架展示一颗印榫卯模型、修复图纸与地志善本。",
    icon: "Compass",
    costEstimate: 1500,
    suggestedBooks: 400
  },
  {
    type: "unassigned",
    label: "待指定/原样保留",
    shortDesc: "保留建筑原有的老结构，不添加商业改造，仅作为基础物理加固与清扫展示。",
    icon: "Lock",
    costEstimate: 500,
    suggestedBooks: 0
  }
];

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: "style-ink-zen",
    name: "黛瓦灰墙 · 枯墨禅意",
    description: "受昆明老城区青瓦、粉墙色调启发，采用深度碳化松木、火山岩、天然亚麻与大理石灰。营造一种悠远宁静、书影墨香的素雅隐居氛围。",
    colors: ["#1F2937", "#6B7280", "#F3F4F6", "#D1D5DB"],
    keyMaterials: ["碳化松木", "大理石板", "火山毛石", "米白粗麻料", "古朴铜扣"]
  },
  {
    id: "style-copper-warm",
    name: "滇铜染茶 · 人文温暖",
    description: "提取云南红土、手工滇铜、金叶普洱茶汤的温润色阶。采用生红赭、熟茶褐、拉丝黄铜配以云南松木暖调，充满昆明本地阳关倾泻的亲切厚重感。",
    colors: ["#78350F", "#B45309", "#FEF3C7", "#9A3412"],
    keyMaterials: ["天然松木", "拉丝黄铜", "红粘土砖", "竹编网格", "暖茶色牛皮"]
  },
  {
    id: "style-modern-lit",
    name: "极简混凝土 · 书卷工业",
    description: "当传统榫卯撞击清水混凝土。采用现代不锈钢悬浮书架、精细喷砂灰色涂料、超白防目眩夹胶高透玻璃。既充分尊崇原木本色，又融入高精度轻盈科技感。",
    colors: ["#374151", "#E5E7EB", "#0284C7", "#1E293B"],
    keyMaterials: ["不锈钢超薄板", "清水混凝土", "超白防眩玻璃", "透光宣纸膜", "黑色阳极氧化铝"]
  }
];
