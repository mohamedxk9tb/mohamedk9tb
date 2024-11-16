import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export function ConversationList() {
  const { conversations, activeConversationId, setActiveConversation, deleteConversation, createNewConversation } = useChatStore();

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <button
        onClick={() => createNewConversation()}
        className="w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors mb-4"
      >
        محادثة جديدة
      </button>
      
      <div className="space-y-2">
        {Object.entries(conversations).map(([id, messages]) => (
          <div
            key={id}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
              activeConversationId === id ? 'bg-emerald-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveConversation(id)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm truncate">
                {messages.length > 0
                  ? messages[messages.length - 1].message.slice(0, 20) + '...'
                  : 'محادثة جديدة'}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(id);
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}