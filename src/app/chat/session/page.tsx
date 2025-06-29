
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, SendHorizontal, Sparkles, FileText, Edit, X, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';

// --- Type Definitions ---
type ChatAction = {
  label: string;
  action: string;
  variant?: 'default' | 'outline' | 'destructive';
  icon?: React.ElementType;
};

type MessageComponent = 
  | { type: 'profit-card', data: { income: number; expenses: number; } }
  | { type: 'invoice-preview', data: { client: string; amount: number; dueDate: Date; project: string; } };

type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  content: string;
  component?: MessageComponent;
  actions?: ChatAction[];
};

type ConversationFlow = {
  type: 'idle' | 'creating_invoice';
  step: 'awaiting_amount' | 'awaiting_due_date' | 'awaiting_confirmation';
  data: {
    client?: string;
    amount?: number;
    project?: string;
    dueDate?: Date;
  };
};

// --- Initial Data ---
const suggestedPrompts = [
  "What's my profit this month?",
  'Show my top expenses',
  'Create an invoice for Innovate Corp',
  "What's my tax estimate?",
];

const mockMonthlyIncome = 30000;
const mockMonthlyExpenses = 11500;
const mockNetProfit = mockMonthlyIncome - mockMonthlyExpenses;

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

const InvoicePreview = ({ data }: { data: any }) => (
    <Card className="mt-2 bg-background/50 border-primary/20">
        <CardContent className="p-3 space-y-2 text-sm">
            <p className="font-bold text-base text-center mb-2">Invoice Draft</p>
             <div className="flex justify-between">
                <p className="text-muted-foreground">Client:</p>
                <p className="font-semibold">{data.client}</p>
            </div>
             <div className="flex justify-between">
                <p className="text-muted-foreground">Amount:</p>
                <p className="font-semibold">{formatCurrency(data.amount)}</p>
            </div>
             <div className="flex justify-between">
                <p className="text-muted-foreground">For:</p>
                <p className="font-semibold">{data.project}</p>
            </div>
             <div className="flex justify-between">
                <p className="text-muted-foreground">Due Date:</p>
                <p className="font-semibold">{format(data.dueDate, "PPP")}</p>
            </div>
        </CardContent>
    </Card>
);


// --- Main Page Component ---
export default function ChatSessionPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showSuggested, setShowSuggested] = useState(true);
  const [conversationFlow, setConversationFlow] = useState<ConversationFlow>({ type: 'idle', step: 'awaiting_amount', data: {} });

  // Initial Gabi Greeting
  useEffect(() => {
    setMessages([
      {
        id: 'gabi-init',
        role: 'model',
        content: "Hi there, I'm Gabi! How can I help you today?",
      },
    ]);
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const addGabiMessage = (message: Omit<ChatMessage, 'id' | 'role'>) => {
    const gabiMessage: ChatMessage = {
      id: `gabi-${Date.now()}`,
      role: 'model',
      ...message,
    };
    setMessages(prev => [...prev, gabiMessage]);
  };
  
  const handleActionClick = (action: ChatAction) => {
    // Remove the message with the buttons
    setMessages(prev => prev.filter(m => !m.actions));

    if (action.action === 'send_invoice') {
        toast({ title: '✅ Invoice Sent!', description: `The invoice has been sent to ${conversationFlow.data.client}` });
        addGabiMessage({ content: `Done! I've sent the invoice to ${conversationFlow.data.client} and marked it as 'Sent'. I'll let you know when they view it.` });
        setConversationFlow({ type: 'idle', step: 'awaiting_amount', data: {} });
    }
    if (action.action === 'edit_invoice') {
        addGabiMessage({ content: "No problem. What would you like to change?" });
    }
     if (action.action === 'cancel_invoice') {
        addGabiMessage({ content: "Okay, I've cancelled that draft." });
        setConversationFlow({ type: 'idle', step: 'awaiting_amount', data: {} });
    }
  }

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    setShowSuggested(false);
    const newHumanMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
    };
    setMessages(prev => [...prev, newHumanMessage]);
    setInput('');
    setIsLoading(true);
    
    // --- Mock Gabi Thinking ---
    await new Promise(res => setTimeout(res, 1500));
    
    // --- Conversation Logic ---
    const lowerCaseMessage = messageContent.toLowerCase();

    // == Invoice Creation Flow ==
    if (conversationFlow.type === 'creating_invoice') {
        if (conversationFlow.step === 'awaiting_amount') {
            const amountMatch = messageContent.match(/₱?([\d,]+(\.\d{1,2})?)/);
            const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;
            const projectMatch = messageContent.match(/for (.*)/i);
            const project = projectMatch ? projectMatch[1] : 'Not specified';
            
            if (amount > 0) {
                setConversationFlow(prev => ({ ...prev, step: 'awaiting_due_date', data: { ...prev.data, amount, project } }));
                addGabiMessage({ content: "Got it. And what's the payment due date?" });
            } else {
                addGabiMessage({ content: "I'm sorry, I didn't catch the amount. Could you please provide it? For example: '₱20,000 for a branding project'." });
            }
        } else if (conversationFlow.step === 'awaiting_due_date') {
            // Simplified date parsing
            const daysMatch = messageContent.match(/(\d+)\s*days/);
            const dueDate = daysMatch ? addDays(new Date(), parseInt(daysMatch[1])) : addDays(new Date(), 15);
            
            const finalInvoiceData = { ...conversationFlow.data, dueDate };
            setConversationFlow(prev => ({ ...prev, step: 'awaiting_confirmation', data: finalInvoiceData }));

            addGabiMessage({
                content: "Okay, here is the draft of your invoice.",
                component: { type: 'invoice-preview', data: finalInvoiceData as any },
                actions: [
                    { label: "Send Invoice", action: "send_invoice", icon: SendHorizontal },
                    { label: "Edit Details", action: "edit_invoice", variant: 'outline', icon: Edit },
                    { label: "Cancel", action: "cancel_invoice", variant: 'destructive', icon: X }
                ]
            });
        }
    } 
    // == Contextual Follow-up ==
    else if (lowerCaseMessage.includes("how does that compare to last month")) {
        addGabiMessage({ content: "Last month's profit was ₱15,200. You're up by 21% this month!" });
    }
    // == Standalone Commands ==
    else if (lowerCaseMessage.includes('create an invoice for')) {
        const clientMatch = messageContent.match(/for (.*)/i);
        const client = clientMatch ? clientMatch[1] : 'a client';
        setConversationFlow({ type: 'creating_invoice', step: 'awaiting_amount', data: { client } });
        addGabiMessage({ content: `I can do that! What's the amount for the invoice for ${client}?` });
    }
    else if (lowerCaseMessage.includes("what's my profit this month?")) {
        addGabiMessage({ 
            content: `Your net profit for this month is ${formatCurrency(mockNetProfit)}.`,
            component: { type: 'profit-card', data: { income: mockMonthlyIncome, expenses: mockMonthlyExpenses } }
        });
    }
    else if (lowerCaseMessage.includes('show my top expenses')) {
        addGabiMessage({ content: "Your top expenses this month are:\n1. Product Costs: ₱7,654.33\n2. Marketing & Ads: ₱5,500.00\n3. Shipping & Fees: ₱1,500.00" });
    }
     else if (lowerCaseMessage.includes("what's my tax estimate?")) {
        addGabiMessage({ content: `Based on your income of ₱${mockMonthlyIncome.toLocaleString()} this month, and using the 8% tax rate, you should consider setting aside approximately ₱${(mockMonthlyIncome * 0.08).toLocaleString()} for your taxes. Remember to keep saving for your quarterly payments!` });
    }
    else {
        addGabiMessage({ content: "Sorry, I'm just a demo version. I can only respond to the suggested prompts. Please try one of those!" });
    }

    setIsLoading(false);
  };

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
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'flex-col items-start'
                  )}
                >
                  {message.role === 'user' && (
                     <div className='bg-primary text-primary-foreground rounded-2xl rounded-br-none p-4 max-w-sm backdrop-blur-md'>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  )}

                  {message.role === 'model' && (
                    <div className="flex items-start gap-3 w-full max-w-sm">
                         <div className="p-2 bg-accent/20 rounded-full self-end">
                            <Bot className="h-6 w-6 text-accent" />
                        </div>
                        <div className='bg-background/40 rounded-2xl rounded-bl-none p-4 w-full backdrop-blur-md'>
                           <p className="whitespace-pre-wrap">{message.content}</p>
                           {message.component?.type === 'profit-card' && <ProfitCard data={message.component.data} />}
                           {message.component?.type === 'invoice-preview' && <InvoicePreview data={message.component.data} />}
                           {message.actions && (
                                <div className="mt-3 grid gap-2">
                                    {message.actions.map(action => (
                                         <Button key={action.label} variant={action.variant || 'default'} className={cn("w-full", action.variant !== 'outline' && "bg-black text-white")} onClick={() => handleActionClick(action)}>
                                            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                                            {action.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
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
                    <div className="p-2 bg-accent/20 rounded-full self-end">
                      <Bot className="h-6 w-6 text-accent" />
                    </div>
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
        </ScrollArea>
      </div>

      <footer className="p-4 border-t shrink-0 bg-background/80 backdrop-blur-md">
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
                  className="rounded-full shrink-0 bg-background/50"
                  onClick={() => handleSendMessage(prompt)}
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
