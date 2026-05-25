'use client';

import { useState } from 'react';
import { LayoutDashboard, BotMessageSquare, Users } from 'lucide-react';

// --- Components ---

// 1. 儀表板 Component
const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#373536] p-4 md:p-8">
      {/* RWD iframe 容器 */}
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

// 2. 情緒分析 Component
const EmotionAnalysis = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#373536] p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 space-y-6 text-white mt-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <BotMessageSquare className="w-6 h-6 text-[#f4d314]" />
          情緒分析參數設定
        </h2>

        {/* 下拉選單 1：標籤 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">標籤 (Tag)</label>
          <select className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-[#f4d314] focus:ring-1 focus:ring-[#f4d314] transition-all">
            <option value="">請選擇標籤...</option>
            <option value="tech">科技</option>
            <option value="finance">財經</option>
            <option value="politics">政治</option>
          </select>
        </div>

        {/* 下拉選單 2：推/噓 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">評價 (推/噓)</label>
          <select className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-[#f4d314] focus:ring-1 focus:ring-[#f4d314] transition-all">
            <option value="">請選擇評價...</option>
            <option value="push">推 (Positive)</option>
            <option value="boo">噓 (Negative)</option>
          </select>
        </div>

        {/* 文字輸入框 1 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">關鍵字輸入</label>
          <input 
            type="text" 
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-[#f4d314] focus:ring-1 focus:ring-[#f4d314] transition-all" 
            placeholder="請輸入欲分析的關鍵字..." 
          />
        </div>

        {/* 文字輸入框 2 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300">備註說明</label>
          <input 
            type="text" 
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white outline-none focus:border-[#f4d314] focus:ring-1 focus:ring-[#f4d314] transition-all" 
            placeholder="其他補充資訊..." 
          />
        </div>

        {/* 送出按鈕 */}
        <button className="w-full py-3 mt-4 rounded-lg bg-[#f4d314] text-black font-bold text-lg hover:bg-yellow-400 active:scale-[0.98] transition-all duration-200">
          執行分析
        </button>
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
  // 使用 React State 控制當前顯示的頁面模組
  const [activeTab, setActiveTab] = useState<'dashboard' | 'emotion' | 'team'>('dashboard');

  // 渲染內容的邏輯
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'emotion':
        return <EmotionAnalysis />;
      case 'team':
        return <TeamList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* 頂部導覽列 (Navbar) */}
      <nav className="h-16 bg-[#3b2f28] flex items-center justify-between px-6 shadow-md z-10 text-white shrink-0">
        <div className="font-bold text-xl tracking-wider">
          System UI
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'dashboard' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden sm:inline">儀表板</span>
          </button>

          <button
            onClick={() => setActiveTab('emotion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'emotion' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <BotMessageSquare className="w-5 h-5" />
            <span className="hidden sm:inline">情緒分析</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === 'team' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">團隊名單</span>
          </button>
        </div>
      </nav>

      {/* 動態內容渲染區塊 */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </main>
  );
}