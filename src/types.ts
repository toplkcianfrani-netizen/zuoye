export interface RoomSpec {
  id: string; // unique room code (e.g. "1F-MAIN", "1F-NORTH-XIANG", etc.)
  floor: 1 | 2;
  name: string; // Chinese Name
  originalRole: string; // Traditional function in Yiganyin
  dimensions: string; // e.g. "5.2m x 4.2m"
  elevation: string; // e.g., "±0.000", "+0.300", "+2.500", "+2.800"
  renovationType: RenovationType;
  customNotes?: string;
  hasBookshelf: boolean;
  bookVolume: number; // estimated book capacity
  capacity: number; // person capacity
}

export type RenovationType =
  | "reception"    // 堂屋接待/总服务台
  | "boutique-stay" // 读书大床房/特色客房
  | "loft-dorm"    // 阁楼书斋/青旅床位
  | "quiet-reading" // 沉浸式静读室
  | "comm-cafe"    // 建筑书店咖啡吧
  | "tea-salon"    // 滇南普洱茶书沙龙
  | "open-courtyard" // 露天天井/水墨阅读庭院
  | "gallery"      // 传统营造展廊
  | "unassigned";  // 待分配

export interface RenovationOption {
  type: RenovationType;
  label: string;
  shortDesc: string;
  icon: string;
  costEstimate: number; // CNY per square meter
  suggestedBooks: number;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  colors: string[]; // tailwind hexes or color values for indicator
  keyMaterials: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface DesignState {
  styleId: string;
  rooms: Record<string, RoomSpec>;
  customTitle: string;
}
