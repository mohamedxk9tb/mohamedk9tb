import React from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, loading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t">
      <div className="flex gap-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          dir="rtl"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !value.trim()}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>إرسال</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}