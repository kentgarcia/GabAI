
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { chatPrompts, ChatPrompt, ChatCategory } from './data';

// --- Type Definitions ---
type ChatComponent =
  | { type: 'profit-card'; data: { income: number; expenses: number } }
  | { type: 'invoice-preview'; data: { client: string; amount: number; dueDate: Date; project: string } };

type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  content: string;
  component?: ChatComponent;
};

// --- Helper Functions ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value);
};

// --- Sub-components for Rich Messages ---
const ProfitCard = ({ data }: { data: { income: number; expenses: number } }) => (
  <Card className="mt-2 bg-background/50 border-primary/20">
    <CardContent className="p-3 space-y-2">
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Income</p>
        <p className="font-semibold text-emerald-500">{formatCurrency(data.income)}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-muted-foreground">Expenses</p>
        <p className="font-semibold text-red-500">{formatCurrency(data.expenses)}</p>
      </div>
       <div className="text-right pt-2">
            <Button asChild variant="link" size="sm" className="text-xs h-auto p-0">
                <Link href="/reports">View Report</Link>
            </Button>
        </div>
    </CardContent>
  </Card>
);

// --- Main Chat Logic Component ---
function ChatSession() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const initialPromptHandledRef = useRef(false);

  const [view, setView] = useState<'categories' | 'prompts'>('categories');
  const [activeCategory, setActiveCategory] = useState<ChatCategory | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }, [messages, isLoading]);

  const addMessage = (message: Omit<ChatMessage, 'id'>) => {
    const newMessage: ChatMessage = {
      id: `${message.role}-${Date.now()}`,
      ...message,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCategoryClick = (category: ChatCategory) => {
    setActiveCategory(category);
    setView('prompts');
  };

  const handlePromptClick = async (prompt: ChatPrompt) => {
    setView('categories'); // Hide prompt buttons after click
    setActiveCategory(null);
    addMessage({ role: 'user', content: prompt.question });

    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1200)); // Mock thinking
    setIsLoading(false);

    addMessage({
      role: 'model',
      content: prompt.response,
      component: prompt.component as ChatComponent | undefined,
    });
  };

  // Initial Gabi Greeting
  useEffect(() => {
    if (initialPromptHandledRef.current) return;
    initialPromptHandledRef.current = true;

    const initialPrompt = searchParams.get('prompt');
    const initialMessage = initialPrompt 
      ? `I see you tapped on: "${initialPrompt}". I can help with that. First, choose a category below so I can give you the best options.`
      : "Hi there, I'm Gabi! How can I help you today? Choose a category below to get started.";

    setMessages([{ id: 'gabi-init', role: 'model', content: initialMessage }]);
  }, [searchParams]);
  
  const renderActionButtons = () => {
    if (isLoading) return null;

    if (view === 'categories') {
      return (
        <motion.div
          key="categories"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-2 gap-3"
        >
          {chatPrompts.map(cat => (
            <Button
              key={cat.category}
              variant="outline"
              className="w-full h-auto text-left justify-start p-3 rounded-xl bg-background/50 flex flex-col items-start"
              onClick={() => handleCategoryClick(cat)}
            >
              <span className="font-semibold">{cat.category}</span>
              <span className="text-xs text-muted-foreground font-normal whitespace-normal">{cat.prompts[0].question.substring(0, 30)}...</span>
            </Button>
          ))}
        </motion.div>
      );
    }
    
    if (view === 'prompts' && activeCategory) {
      return (
         <motion.div
            key="prompts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-2"
        >
            <h3 className="text-sm font-bold mb-2">{activeCategory.category}</h3>
            {activeCategory.prompts.map(prompt => (
                <Button
                    key={prompt.id}
                    variant="outline"
                    className="w-full rounded-full bg-background/50"
                    onClick={() => handlePromptClick(prompt)}
                >
                    {prompt.question}
                </Button>
            ))}
            <Button variant="ghost" onClick={() => setView('categories')} className="mt-2">Back to Categories</Button>
        </motion.div>
      )
    }

    return null;
  }

  return (
    <main className="flex flex-col flex-grow p-0 text-foreground h-screen bg-transparent">
      <header className="flex items-center gap-2 p-4 border-b shrink-0 bg-background/80 backdrop-blur-md">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
          <Link href="/chat">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full" data-ai-hint="robot assistant" />
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
            <p className="text-xs text-muted-foreground">{isLoading ? 'Thinking...' : 'Online'}</p>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto no-scrollbar" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex flex-col',
                    message.role === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  {message.role === 'user' ? (
                     <div className='bg-primary text-primary-foreground rounded-2xl rounded-br-none p-4 max-w-sm backdrop-blur-md'>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 w-full max-w-sm">
                         <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full self-end flex-shrink-0" data-ai-hint="robot assistant" />
                        <div className='bg-background/40 rounded-2xl rounded-bl-none p-4 w-full backdrop-blur-md'>
                           <p className="whitespace-pre-wrap">{message.content}</p>
                           {message.component?.type === 'profit-card' && <ProfitCard data={message.component.data} />}
                        </div>
                    </div>
                  )}
                </motion.div>
              ))}
               {isLoading && (
                 <motion.div
                    key="typing"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-start gap-3'
                >
                    <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full self-end flex-shrink-0" data-ai-hint="robot assistant" />
                     <div className='bg-background/40 backdrop-blur-md rounded-2xl rounded-bl-none p-4 max-w-sm'>
                        <motion.div
                            className="flex gap-1.5"
                            initial="start"
                            animate="end"
                            variants={{
                                start: { transition: { staggerChildren: 0.2 }},
                                end: { transition: { staggerChildren: 0.2 }}
                            }}
                        >
                            <motion.div className="w-2 h-2 bg-muted-foreground rounded-full" variants={{start: {y: '0%'}, end: {y: '100%'}}} transition={{duration: 0.5, repeat: Infinity, repeatType: 'reverse'}} />
                            <motion.div className="w-2 h-2 bg-muted-foreground rounded-full" variants={{start: {y: '0%'}, end: {y: '100%'}}} transition={{duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 0.2}} />
                            <motion.div className="w-2 h-2 bg-muted-foreground rounded-full" variants={{start: {y: '0%'}, end: {y: '100%'}}} transition={{duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 0.4}} />
                        </motion.div>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="p-4 border-t shrink-0 bg-background/80 backdrop-blur-md">
           <AnimatePresence mode="wait">
            {renderActionButtons()}
           </AnimatePresence>
        </div>
      </div>
    </main>
  );
}


// --- Suspense Wrapper ---
export default function ChatSessionPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">Loading Chat...</p>
            </div>
        }>
            <ChatSession />
        </Suspense>
    )
}
