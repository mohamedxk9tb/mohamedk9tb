import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatContainer } from './components/ChatContainer';
import { ConversationList } from './components/ConversationList';
import { useChatStore } from './store/chatStore';
import { generateResponse } from './services/gemini';

function App() {
  const { 
    conversations,
    activeConversationId,
    addMessage,
    createNewConversation
  } = useChatStore();
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!activeConversationId) {
      createNewConversation();
    }
  }, [activeConversationId, createNewConversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConversationId || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      isAi: false,
      message: input,
      timestamp: Date.now(),
    };

    addMessage(activeConversationId, userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await generateResponse(input);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        isAi: true,
        message: response,
        timestamp: Date.now(),
      };
      addMessage(activeConversationId, aiMessage);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        isAi: true,
        message: 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
        timestamp: Date.now(),
      };
      addMessage(activeConversationId, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const activeMessages = activeConversationId ? conversations[activeConversationId] || [] : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <ChatContainer
            messages={activeMessages}
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </main>
        <ConversationList />
      </div>
      <Footer />
    </div>
  );
}

export default App;