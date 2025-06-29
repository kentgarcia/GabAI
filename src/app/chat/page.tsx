
'use client';

import { gabiChat, GabiChatMessage } from '@/ai/flows/chat-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, SendHoriz, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const suggestedPrompts = [
  "What's my profit this month?",
  'Create a payment reminder for a client.',
  'Is it a good time to run a promo?',
  'How much should I set aside for tax?',
];

const taxChoicePrompts = ['8% Flat Tax', 'Graduated Income Tax'];

const mockMonthlyIncome = 20000;

export default function ChatPage() {
  const [messages, setMessages] = useState<GabiChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taxPreference, setTaxPreference] = useState<string | null>(null);
  const [showSuggested, setShowSuggested] = useState(true);
  const [showTaxChoice, setShowTaxChoice] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedPreference = localStorage.getItem('taxPreference');
    if (savedPreference) {
      setTaxPreference(savedPreference);
    }
    // Gabi's initial greeting
    setMessages([
      {
        role: 'model',
        content: "Hi there! I'm Gabi. How can I help you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    setShowSuggested(false);
    setShowTaxChoice(false);
    const newHumanMessage: GabiChatMessage = {
      role: 'user',
      content: messageContent,
    };
    const newMessages = [...messages, newHumanMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the AI response
    setMessages((prev) => [...prev, { role: 'model', content: '' }]);

    try {
      const chatRequest = {
        messages: newMessages,
        monthlyIncome: mockMonthlyIncome, // Using mock data for now
        ...(taxPreference && { taxPreference }),
      };
      const stream = await gabiChat(chatRequest);

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1 ? { ...msg, content: fullResponse } : msg
          )
        );
      }
      
      // After the stream is complete, check for keywords
       if (fullResponse.toLowerCase().includes("which would you like me to use")) {
          setShowTaxChoice(true);
       }

    } catch (error) {
      console.error('Error calling Gabi chat flow:', error);
      setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1 ? { ...msg, content: "Sorry, I'm having trouble connecting right now." } : msg
          )
        );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaxChoice = (choice: string) => {
    const preference = choice === '8% Flat Tax' ? '8_percent' : 'graduated';
    localStorage.setItem('taxPreference', preference);
    setTaxPreference(preference);
    handleSendMessage(`Okay, let's use the ${choice}.`);
  };

  return (
    <main className="flex flex-col flex-grow p-0 text-foreground h-screen bg-background">
      <header className="flex items-center gap-2 p-4 border-b shrink-0">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
          <Link href="/dashboard">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-accent/20 rounded-full">
              <Bot className="h-6 w-6 text-accent" />
            </div>
            <AnimatePresence>
            {isLoading && (
                 <motion.div 
                    key="sparkle"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 p-1 bg-primary rounded-full"
                >
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                 </motion.div>
            )}
            </AnimatePresence>
          </div>
          <div>
            <h1 className="text-lg font-bold">Gabi</h1>
            <p className="text-xs text-muted-foreground">{isLoading ? 'Typing...' : 'Online'}</p>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' && 'justify-end'
                  )}
                >
                  {message.role === 'model' && (
                    <div className="p-2 bg-accent/20 rounded-full self-end">
                      <Bot className="h-6 w-6 text-accent" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'rounded-2xl p-4 max-w-sm',
                      message.role === 'model'
                        ? 'bg-background/30 rounded-bl-none'
                        : 'bg-primary text-primary-foreground rounded-br-none'
                    )}
                  >
                    <p className="whitespace-pre-wrap">
                      {message.content}
                      {isLoading &&
                        index === messages.length - 1 && (
                          <span className="animate-pulse">|</span>
                        )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      <footer className="p-4 border-t shrink-0 bg-background">
        <AnimatePresence>
          {showSuggested && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2 overflow-x-auto no-scrollbar pb-3"
            >
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="rounded-full shrink-0"
                  onClick={() => handleSendMessage(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </motion.div>
          )}
          {showTaxChoice && (
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2 overflow-x-auto no-scrollbar pb-3"
            >
              {taxChoicePrompts.map((prompt) => (
                 <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="rounded-full shrink-0"
                  onClick={() => handleTaxChoice(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gabi anything..."
            className="bg-background/30 backdrop-blur-md border rounded-full h-12"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full h-12 w-12 shrink-0 bg-black"
            disabled={isLoading || !input.trim()}
          >
            <SendHoriz />
          </Button>
        </form>
      </footer>
    </main>
  );
}
