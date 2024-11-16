import React from 'react';
import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">الدردشة الذكية</h1>
            <p className="text-gray-500">تحدث مع مساعدك الذكي</p>
          </div>
        </div>
      </div>
    </header>
  );
}