import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  isAi: boolean;
  message: string;
}

export function ChatMessage({ isAi, message }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-4 ${isAi ? 'bg-gray-50' : 'bg-white'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isAi ? 'bg-emerald-500' : 'bg-blue-500'
      }`}>
        {isAi ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-gray-800 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}