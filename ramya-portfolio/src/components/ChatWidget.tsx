'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Listen for custom open event
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  // Close on Escape key or click outside panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    const handleClickOutside = (e: MouseEvent) => {
       // Only close if clicking outside our panel AND the element isn't our toggle button
      if (
        panelRef.current && 
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest('#chat-widget-toggle')
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Chat with AI';
  const placeholderText = process.env.NEXT_PUBLIC_CHAT_PLACEHOLDER || 'Ask me anything...';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput('');
    
    // Optimistically add user message
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user', content: currentInput }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No readable stream from response');

      const decoder = new TextDecoder();
      let aiContent = '';
      const aiMessageId = (Date.now() + 1).toString();
      
      // Add empty assistant message skeleton
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        aiContent += decoder.decode(value, { stream: true });
        
        // Update the last message (the assistant one) with streaming content
        setMessages(prev => {
          const copy = [...prev];
          const lastIdx = copy.length - 1;
          if (copy[lastIdx] && copy[lastIdx].id === aiMessageId) {
            copy[lastIdx].content = aiContent;
          }
          return copy;
        });
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (m: any) => {
    if (m.content) return m.content;
    if (m.parts && Array.isArray(m.parts)) {
      return m.parts
        .map((part: any) => {
          if (part.type === 'text') return part.text;
          if (part.type === 'reasoning') return `*Reasoning: ${part.text}*`;
          return '';
        })
        .join('');
    }
    return m.text || '';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Widget container ensures it doesn't block clicks on the rest of the page when closed */}
      <div className="pointer-events-auto">
        {isOpen && (
          <div
            ref={panelRef}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[560px] max-h-[80vh] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out text-slate-900"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-sm">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageCircle size={20} />
                {appName}
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close chat" 
                className="hover:bg-slate-800 p-1.5 rounded-full transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
              {messages?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-80">
                  <div className="bg-slate-200 p-4 rounded-full mb-3">
                    <MessageCircle size={32} className="text-slate-600" />
                  </div>
                  <p className="font-medium">Welcome to {appName}!</p>
                  <p className="text-sm mt-1">{placeholderText}</p>
                </div>
              )}
              
              {messages?.map((m: any) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      m.role === 'user'
                        ? 'bg-slate-900 text-white rounded-br-sm shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-sans">
                      {renderMessageContent(m)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-4 shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center gap-2 relative shadow-sm rounded-full bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all pr-1.5"
              >
                <input
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-[15px] placeholder-slate-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholderText}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-slate-900 text-white p-2 text-sm rounded-full hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center w-[36px] h-[36px]"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        {!isOpen && (
          <button
            id="chat-widget-toggle"
            onClick={togglePanel}
            className="bg-slate-900 text-white hover:bg-slate-800 shadow-2xl rounded-full p-4 flex items-center gap-3 transition-transform transform hover:scale-105 active:scale-95 group"
          >
            <MessageCircle size={26} className="group-hover:animate-pulse" />
            <span className="font-semibold hidden sm:inline pr-2">{appName}</span>
          </button>
        )}
      </div>
    </div>
  );
}
