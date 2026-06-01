'use client';

import { useState } from 'react';
import { LayoutDashboard, Users } from 'lucide-react';

// --- Components ---

const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-[#373536] p-4 md:p-8">
      <div className="relative w-full h-full bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <iframe
          title="Power BI Dashboard"
          className="absolute top-0 left-0 w-full h-full border-0"
          src="https://app.powerbi.com/reportEmbed?..." // ⚠️ 記得將此處替換為財金系同學給的 Power BI 網址
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const TeamList = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#373536] p-8 md:p-16 flex flex-col items-center text-white">
      <div className="max-w-3xl w-full bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-700 mt-10">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-10 text-[#f4d314]">
          <Users className="w-8 h-8" />
          Credits
        </h1>
        
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4 gap-4">
            <span className="text-xl font-medium">侯沛萱</span>
            <span className="text-lg">蔡宜庭</span>
            <span className="text-lg">簡聿臻</span>
            <span className="text-lg">劉冠陞</span>
            <span className="text-lg">李宣璋</span>
            <span className="text-lg">楊　昊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  // 預設直接顯示儀表板
  const [activeTab, setActiveTab] = useState<'dashboard' | 'team'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
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
        <div className="font-medium text-lg tracking-wider">
          投資人情緒與大盤走勢之關聯性
        </div>
        
        <div className="flex gap-6 items-center">
          {/* 儀表板按鈕 */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'dashboard' ? 'opacity-100 text-[#f4d314]' : 'opacity-70 hover:opacity-90'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="hidden sm:inline font-medium">儀表板</span>
          </button>

          {/* 團隊名單按鈕 */}
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 transition-opacity duration-200 ${
              activeTab === 'team' ? 'opacity-100 text-[#f4d314]' : 'opacity-70 hover:opacity-90'
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="hidden sm:inline font-medium">Credits</span>
          </button>

          <span className="text-gray-300 border-l border-gray-600 pl-4 ml-2 hidden sm:inline">
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