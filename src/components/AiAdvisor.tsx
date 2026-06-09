import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, DesignState } from "../types";
import { Sparkles, Send, Bot, User, HelpCircle, Loader2 } from "lucide-react";

interface AiAdvisorProps {
  designState: DesignState;
  activeRoomId: string;
}

export default function AiAdvisor({ designState, activeRoomId }: AiAdvisorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "您好！我是您的**一颗印古建改造设计顾问**。昆明的“一颗印”建筑结构独特，具有‘三间四耳、四水归堂’的历史底蕴。我能协助您规划图书与旅社旅馆的融合方案，提供在选材、防火、采光通风及防雨面貌上的专业设计师建议。您可以点击下方的预设问题或直接向我提问！",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = designState.rooms[activeRoomId];

  const suggestedQuestions = [
    {
      label: "🌦️ 檐廊漏雨防潮",
      q: "一颗印的二层走马转角楼檐廊容易起雾漏雨，改造成公共读书区有哪些妥协或防潮对策？",
    },
    {
      label: "☀️ 首层采光优化",
      q: "一颗印首层房间采光极其幽深，在保留原瓦外观的前提下，如何能让读书室更加明亮舒适？",
    },
    {
      label: "🧯 消防与木结构保护",
      q: "改造成图书旅社，消防评估要求高，如何在大量图书纸张和木构骨架中做好绿色阻燃与防火设计？",
    },
    {
      label: "🧱 泥墙红土选材",
      q: "我们当前的室内材料如果选择红土岩与滇铜调性，整体空间应该如何搭配才不会显得土气或压抑？",
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          designState,
          activeRoom: activeRoom ? {
            name: activeRoom.name,
            originalRole: activeRoom.originalRole,
            renovationType: activeRoom.renovationType,
            dimensions: activeRoom.dimensions,
            elevation: activeRoom.elevation,
            hasBookshelf: activeRoom.hasBookshelf,
            bookVolume: activeRoom.bookVolume,
            customNotes: activeRoom.customNotes || ""
          } : null
        }),
      });

      if (!response.ok) {
        throw new Error("API Route did not respond successfully");
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.reply || "未能生成回应，请检查后方试。",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Advisor error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "assistant",
          content: "⚠️ 远程设计顾问暂时离线。可能是由于网络延迟或系统未启动，请稍后再试！",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col h-[520px] overflow-hidden">
      {/* Advisor Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-500 text-white p-1.5 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
              AI 营造改造设计顾问
              <span className="text-[10px] font-mono font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                Gemini 3.5 AI
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              专注融合云南昆明地缘文化与图书旅宿营运美学
            </p>
          </div>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/20">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-[85%] ${
                isUser ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`p-2 rounded-xl flex-shrink-0 ${
                  isUser
                    ? "bg-teal-100 text-teal-800"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? "bg-teal-600 text-white rounded-tr-xs"
                      : "bg-white border border-slate-100/80 text-slate-700 rounded-tl-xs shadow-2xs shadow-slate-100"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.content}
                </div>
                <div
                  className={`text-[9px] text-slate-400 font-mono ${
                    isUser ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800 animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-100 p-3.5 rounded-2xl text-xs rounded-tl-xs text-slate-400 italic">
              AI古建顾问正在思忖图纸、估算抗拉与防火系数... 请稍候
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Input Prompting Buttons */}
      <div className="px-5 py-3 border-t border-slate-50 overflow-x-auto flex gap-2 whitespace-nowrap bg-slate-50/10">
        {suggestedQuestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(s.q)}
            className="text-[10px] font-medium text-slate-600 bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-slate-100 px-2.5 py-1.5 rounded-full transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3 text-slate-400" />
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Input controls form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="px-5 py-3.5 border-t border-slate-100 flex items-center space-x-3 bg-white"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            activeRoom
              ? `向顾问咨询关于“${activeRoom.name}”改造为“${activeRoom.renovationType !== "unassigned" ? activeRoom.name : "特定功能"}”的设计对策...`
              : "向AI古建改造设计顾问提问..."
          }
          className="flex-1 px-4 py-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className={`px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer ${
            (!inputText.trim() || isLoading) && "opacity-50 cursor-not-allowed"
          }`}
        >
          <span>发送</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
