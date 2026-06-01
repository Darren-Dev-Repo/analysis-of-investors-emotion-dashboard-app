'use client';

import { useState } from 'react';
import { LayoutDashboard, BotMessageSquare, Users } from 'lucide-react';

// --- 常數定義 ---
export const PTT_TAGS = [
  { value: '標的', label: '[標的]' },
  { value: '盤中', label: '[盤中]' },
  { value: '盤後', label: '[盤後]' },
  { value: '新聞', label: '[新聞]' },
  { value: '情報', label: '[情報]' },
  { value: '請益', label: '[請益]' },
  { value: '心得', label: '[心得]' },
  { value: '閒聊', label: '[閒聊]' },
];

// --- Components ---

// 1. 儀表板 Component
const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#373536] p-4 md:p-8">
      <div className="relative w-full h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <iframe
          title="Power BI Dashboard"
          className="absolute top-0 left-0 w-full h-full"
          src="https://app.powerbi.com/reportEmbed?..." // 請將此處替換為您的 Power BI 網址
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// 2. 情緒分析 Component (表單升級版)
const EmotionAnalysis = () => {
  // 定義表單狀態
  const [tag, setTag] = useState<string>('標的'); // 預設對應 PTT_TAGS 的第一個 value
  const [title, setTitle] = useState<string>('');
  const [pushType, setPushType] = useState<string>('推');
  const [message, setMessage] = useState<string>('');

  // 處理送出按鈕點擊事件
  const handleSubmit = () => {
    console.log('--- 表單送出資料 ---');
    console.log('標籤 (tag):', tag);
    console.log('標題 (title):', title);
    console.log('推/噓 (pushType):', pushType);
    console.log('推文內容 (message):', message);
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#373536] text-white p-6 md:p-10 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-x-6 gap-y-10 max-w-7xl mx-auto w-full flex-grow mt-10">
        
        {/* 第一行：標題 + (黃色下拉選單 + 白色輸入框) */}
        <div className="col-span-1 md:col-span-1 flex flex-col justify-start">
            <h3 className="text-xl font-medium mt-1">標題</h3>
        </div>
        <div className="col-span-1 md:col-span-1 flex flex-col sm:flex-row gap-4 items-center">
          {/* 原生黃色下拉選單 */}
          <select 
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="flex-1 w-full bg-[#f4d314] text-black rounded-lg p-3 outline-none cursor-pointer text-lg font-medium appearance-auto"
          >
            {PTT_TAGS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {/* 白色標題輸入框 */}
          <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-[2] w-full p-3 rounded-lg bg-white border border-gray-300 text-black outline-none focus:ring-2 focus:ring-[#f4d314]" 
              placeholder="請輸入文章標題..." 
          />
        </div>

        {/* 第二行：推文 + (灰色下拉選單 + 白色輸入框) */}
        <div className="col-span-1 md:col-span-1 flex flex-col justify-start">
            <h3 className="text-xl font-medium mt-1">推文</h3>
        </div>
        <div className="col-span-1 md:col-span-1 flex flex-col sm:flex-row gap-4 items-center">
          {/* 原生灰色下拉選單 */}
          <select 
            value={pushType}
            onChange={(e) => setPushType(e.target.value)}
            className="flex-1 w-full bg-gray-300 text-black rounded-lg p-3 outline-none cursor-pointer text-lg font-medium appearance-auto"
          >
            <option value="推">推</option>
            <option value="→ (中立)">→ (中立)</option>
            <option value="噓">噓</option>
          </select>
          {/* 白色推文內容輸入框 */}
          <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-[2] w-full p-3 rounded-lg bg-white border border-gray-300 text-black outline-none focus:ring-2 focus:ring-[#f4d314]" 
              placeholder="請輸入推文內容..." 
          />
        </div>

        {/* 送出按鈕列 */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-10">
          <button 
            onClick={handleSubmit}
            className="px-10 py-3 rounded-lg bg-[#f4d314] text-black font-bold text-lg hover:bg-yellow-400 active:scale-95 transition-all"
          >
            送出
          </button>
        </div>

      </div>
    </div>
  );
};

// 3. 團隊名單 Component (佔位用)
const TeamList = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#373536] flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Users className="w-8 h-8" />
        團隊名單 (建置中...)
      </h1>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'emotion' | 'team'>('emotion');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'emotion':
        return <EmotionAnalysis />;
      case 'team':
        return <TeamList />;
      default:
        return <EmotionAnalysis />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* 頂部導覽列 (Navbar) */}
      <nav className="h-16 bg-[#3b2f28] flex items-center justify-between px-6 shadow-md z-10 text-white shrink-0">
        <div className="font-medium text-lg tracking-wider">
          投資人情緒與大盤走勢之關聯性
        </div>
        
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'dashboard' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('emotion')}
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'emotion' ? 'opacity-100' : 'opacity-70 hover:opacity-90'
            }`}
          >
            <BotMessageSquare className="w-5 h-5" />
          </button>

          <span className="text-white opacity-90 text-sm ml-2 hidden sm:inline">
            第二組
          </span>
        </div>
      </nav>

      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </main>
  );
}