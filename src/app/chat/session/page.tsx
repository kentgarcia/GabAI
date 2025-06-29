
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, SendHorizontal, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Type definition for a chat message, kept for structure.
export type GabiChatMessage = {
  role: 'user' | 'model';
  content: string;
};

const suggestedPrompts = [
  "What's my profit this month?",
  "Create an invoice for 'Client X' for ₱50,000",
  'Is it a good time to run a promo?',
  'How much should I set aside for tax?',
];

const taxChoicePrompts = ['8% Flat Tax', 'Graduated Income Tax'];

const mockMonthlyIncome = 20000;

export default function ChatSessionPage() {
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
  
  const getGabiResponse = (message: string, currentTaxPref: string | null): string => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('how much should i set aside for tax?')) {
      if (!currentTaxPref) {
        return "Good question! To give you a good estimate, I need to know your preferred tax rate. In the Philippines, freelancers and small businesses can often choose between two types:\n\n- 8% Flat Tax: Simple. You pay 8% on your gross income after the first ₱250,000.\n- Graduated Income Tax: More complex, rates vary from 0% to 35% depending on your profit.\n\nWhich would you like me to use for estimates?";
      } else if (currentTaxPref === '8_percent') {
        return `Based on your income of ₱${mockMonthlyIncome.toLocaleString()} this month, and using the 8% tax rate, you should consider setting aside approximately ₱${(mockMonthlyIncome * 0.08).toLocaleString()} for your taxes. Remember to keep saving for your quarterly payments!`;
      } else {
        return "Because you've chosen the Graduated Income Tax rate, I'll need to know your business expenses for this month to give you an accurate estimate. Let's start tracking them!";
      }
    }
    
    if (lowerCaseMessage.includes("okay, let's use the")) {
         if (currentTaxPref === '8_percent') {
            return `Got it! Using the 8% Flat Tax rate. Based on your income of ₱${mockMonthlyIncome.toLocaleString()} this month, you should consider setting aside approximately ₱${(mockMonthlyIncome * 0.08).toLocaleString()}.`;
        } else {
            return "Sounds good. With the Graduated rate, we'll need to track your expenses to get an accurate tax amount. You can start logging expenses from the main dashboard.";
        }
    }

    if (lowerCaseMessage.includes("what's my profit this month?")) {
        return "Your net profit for this month is ₱12,345.67. This is calculated from your total income of ₱20,000.00 minus your expenses of ₱7,654.33. Keep up the great work!";
    }
    if (lowerCaseMessage.includes('create an invoice for')) {
        return "Done. I've created a draft invoice for 'Client X' for ₱50,000, due in 15 days. You can review and send it from the Reports > Receipt History page.";
    }
    if (lowerCaseMessage.includes('is it a good time to run a promo?')) {
        return "That's a great idea! Based on your current sales trend, running a promo this weekend could boost your engagement. I can help you draft an announcement.";
    }

    return "Sorry, I'm just a demo version. I can only respond to the suggested prompts. Please try one of those!";
  };


  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    setShowSuggested(false);
    setShowTaxChoice(false);
    const newHumanMessage: GabiChatMessage = {
      role: 'user',
      content: messageContent,
    };
    setMessages(prev => [...prev, newHumanMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate Gabi thinking
    await new Promise(res => setTimeout(res, 1500));
    
    const gabiResponse = getGabiResponse(messageContent, taxPreference);
    
    const newGabiMessage: GabiChatMessage = {
      role: 'model',
      content: gabiResponse,
    };
    setMessages(prev => [...prev, newGabiMessage]);
    
    // Check if Gabi is asking for tax preference
    if (gabiResponse.includes('Which would you like me to use for estimates?')) {
        setShowTaxChoice(true);
    }

    setIsLoading(false);
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
          <Link href="/chat">
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
                    </p>
                  </div>
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
                    <div className="p-2 bg-accent/20 rounded-full self-end">
                      <Bot className="h-6 w-6 text-accent" />
                    </div>
                     <div className='bg-background/30 rounded-2xl rounded-bl-none p-4 max-w-sm'>
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
        </ScrollArea>
      </div>

      <footer className="p-4 border-t shrink-0 bg-background">
        <AnimatePresence>
          {showSuggested && !showTaxChoice && (
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
            <SendHorizontal />
          </Button>
        </form>
      </footer>
    </main>
  );
}
