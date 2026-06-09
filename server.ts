import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client with recommended telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// 1. API: AI Advisor Endpoint
app.post("/api/gemini/advisor", async (req, res) => {
  try {
    const { prompt, designState, activeRoom } = req.body;

    if (!ai) {
      return res.status(200).json({
        reply: "⚠️ 【系统提示】未在后台检测到 `GEMINI_API_KEY`。请先在 AI Studio 侧栏的【Settings > Secrets】中配置您的密钥，然后您就能体验完整的AI专属营造活化设计咨询了！\n\n为了演示，为您模拟推荐设计策略：由于“一颗印”属于榫卯通透宅院，若要在该部位增加图书，需利用微调黄铜扣夹层固定免刨花板书架架套，防止木柱破损。选配合宜的暖调拉丝红铜件及宣纸隔光板可以提升整体素雅的墨香人文质感。"
      });
    }

    const { customTitle, styleId, rooms } = designState || {};
    
    // Determine style information
    let styleDetailsText = "滇铜染茶调：云南松木、拉丝黄铜、红粘瓦碎片搭配暖皮";
    if (styleId === "style-ink-zen") {
      styleDetailsText = "黛瓦灰墙调：深度碳化木、火山毛石板、米白亚麻与大理石灰";
    } else if (styleId === "style-modern-lit") {
      styleDetailsText = "极简混凝土调：不锈钢薄隔、清水混凝土、除炫高透透光纸膜";
    }

    // Build systemic context for prompt
    let systemInstruction = `你是一名深谙中国传统的古建专家、云南民居营造师、以及文旅图书酒店空间总设计师。
你现在服务的设计方向是把昆明地区传统“一颗印”民居建筑（三间四耳、走马转角楼、四水归堂传统古建筑）改造成现代化的“图书旅馆 (Book Hotel/Book Hostel)”。
你需要给用户提供高水准、充满空间美感、切实可行、既符合古建筑保全消防安全、能体现云南本土风物的人文主义改造建议。

请基于用户提出的设计问题，结合以下项目配置信息进行深度融合回答：
- 旅馆项目整体名称：${customTitle || "昆明传统一颗印图书旅社"}
- 设定的主要在地美学色调：${styleDetailsText}

当前用户重点选中的房间部位：
${
  activeRoom
    ? `- 部位：${activeRoom.name} (${activeRoom.dimensions || "未指定"}, 层高标高: ${activeRoom.elevation || "未指定"})
- 原始历史作用：${activeRoom.originalRole || "未知"}
- 当前规划的改造方向：${activeRoom.renovationType || "待分配"}
- 图书配置：${activeRoom.hasBookshelf ? `已设置藏书架，容纳 ${activeRoom.bookVolume || 0} 册图书` : "未配置固定书架（仅陈列或空置）"}
- 容纳受众：设计同时最大允许 ${activeRoom.capacity || 2} 人在场
- 设计师专项备注细节：${activeRoom.customNotes || "尚未填写备注。"}`
    : "尚未在图纸上点击选择特定的空间部位，整体对全建筑的活化通盘提问。"
}

请在回答中严格秉持以下五项【一颗印活化营造戒律】：
1. 【不拆大木、修旧如旧】古建筑的大梁、榫卯立柱、木制地脚绝不可剪断或破开！只能做底层防跑防腐加固、二层木窗无损外挂隔音，新加的隔断与原木柱中间需敷防震泡棉接触。
2. 【四水归堂、天井连通】天井是空气流动和雨水的通道，不可封装封死！必须发掘其作为“雨落明池、听雨品茗看书”的庭院沙龙精神灵魂，保留雨漏和苔藓碎石生趣。
3. 【走马回廊、动静通达】二楼的走廊围合是交通，不要塞满阻断，可悬挂挑檐吧椅、设置宣纸黄铜框隔栏，看书同时俯瞰天井。
4. 【消防安全、防潮防虫】书籍和老木是最怕火和潮气的。提及应用“超细高压水雾自动消防”（不浸湿古书）、防虫樟木炭垫层和红土陶瓦铺底防止土气返潮。
5. 【昆明松语与地方茶香】融合昆明地方文脉（如西南联大书生骨气、翠湖茶馆历史）与在地天然材料（建水红窑片、滇铜古五金、云南松木原油）。

请用词儒雅、专业、富有温度。答复内容以Markdown排版，使用合理的加粗和段落，不要干瘪罗列。结合所选空间及美学特征，给出令人信服且切实可行的设计秘诀。`;

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const response = await chatInstance.sendMessage({ message: prompt });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Advisor Endpoint Error:", error);
    res.status(500).json({ error: "设计顾问服务呼叫失败，请检查网络或配置" });
  }
});

// 2. Vite and Static Asset handler middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled static files for production.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening strictly on http://0.0.0.0:${PORT}`);
  });
}

startServer();
