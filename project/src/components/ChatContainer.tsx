import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Message } from '../store/chatStore';

interface ChatContainerProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function ChatContainer({ messages, input, onInputChange, onSubmit, loading }: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto">
      <div className="bg-white shadow-sm rounded-lg my-8 overflow-hidden">
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto scrollbar-custom">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} isAi={msg.isAi} message={msg.message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          value={input}
          onChange={onInputChange}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}