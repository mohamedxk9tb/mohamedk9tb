import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  isAi: boolean;
  message: string;
  timestamp: number;
}

interface ChatState {
  conversations: { [key: string]: Message[] };
  activeConversationId: string | null;
  addMessage: (conversationId: string, message: Message) => void;
  createNewConversation: () => string;
  setActiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: {},
      activeConversationId: null,
      addMessage: (conversationId, message) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [conversationId]: [...(state.conversations[conversationId] || []), message],
          },
        })),
      createNewConversation: () => {
        const id = new Date().getTime().toString();
        set((state) => ({
          conversations: { ...state.conversations, [id]: [] },
          activeConversationId: id,
        }));
        return id;
      },
      setActiveConversation: (id) =>
        set({ activeConversationId: id }),
      deleteConversation: (id) =>
        set((state) => {
          const { [id]: deleted, ...rest } = state.conversations;
          return {
            conversations: rest,
            activeConversationId:
              state.activeConversationId === id ? null : state.activeConversationId,
          };
        }),
    }),
    {
      name: 'chat-storage',
    }
  )
);