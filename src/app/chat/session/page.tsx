
'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';

// --- Type Definitions ---
type ChatAction = {
  label: string;
  actionId: string;
  variant?: 'default' | 'outline' | 'destructive';
  icon?: React.ElementType;
};

type MessageComponent =
  | { type: 'profit-card'; data: { income: number; expenses: number } }
  | { type: 'invoice-preview'; data: { client: string; amount: number; dueDate: Date; project: string } };

type ChatMessage = {
  id: string;
  role: 'user' | 'model';
  content: string;
  component?: MessageComponent;
  actions?: ChatAction[];
};

// --- Initial Data & Mocks ---
const MOCK_PROFIT_THIS_MONTH = 18500;
const MOCK_PROFIT_LAST_MONTH = 15200;
const MOCK_INCOME = 30000;
const MOCK_EXPENSES = 11500;
const MOCK_TOP_EXPENSES_STRING = "1. Product Costs: ₱7,654\n2. Marketing & Ads: ₱5,500\n3. Shipping & Fees: ₱1,500";
const MOCK_TAX_ESTIMATE_STRING = `Based on your income of ₱30,000 this month and using the 8% tax rate, you should consider setting aside approximately ₱2,400 for your taxes. Remember to keep saving for your quarterly payments!`;

const initialActions: ChatAction[] = [
    { label: "What's my profit this month?", actionId: 'get_profit' },
    { label: 'Show my top expenses', actionId: 'get_top_expenses' },
    { label: 'Create a receipt', actionId: 'start_receipt_flow' },
    { label: "What's my tax estimate?", actionId: 'get_tax_estimate' },
];

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
            <p className="font-bold text-base text-center mb-2">Receipt Draft</p>
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
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initial Gabi Greeting
  useEffect(() => {
    setMessages([
      {
        id: 'gabi-init',
        role: 'model',
        content: "Hi there, I'm Gabi! How can I help you today?",
        actions: initialActions,
      },
    ]);
  }, []);

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

  const handleActionClick = async (action: ChatAction) => {
    if (isLoading) return;

    // 1. Remove action buttons from previous message
    setMessages(prev => prev.map(m => ({ ...m, actions: undefined })));

    // 2. Add user's choice as a message
    addMessage({ role: 'user', content: action.label });

    // 3. Process Gabi's response
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1200)); // Mock thinking
    setIsLoading(false);

    // --- Rule-based logic ---
    switch (action.actionId) {
        case 'get_profit':
            addMessage({
                role: 'model',
                content: `Your net profit for this month is ${formatCurrency(MOCK_PROFIT_THIS_MONTH)}.`,
                component: { type: 'profit-card', data: { income: MOCK_INCOME, expenses: MOCK_EXPENSES } },
                actions: [
                    { label: "How does that compare to last month?", actionId: 'compare_profit_last_month' },
                    { label: "What were my income sources?", actionId: 'get_income_sources' },
                    { label: "Back to main menu", actionId: 'main_menu' },
                ]
            });
            break;

        case 'compare_profit_last_month':
            const percentageChange = ((MOCK_PROFIT_THIS_MONTH - MOCK_PROFIT_LAST_MONTH) / MOCK_PROFIT_LAST_MONTH) * 100;
            addMessage({
                role: 'model',
                content: `Last month's profit was ${formatCurrency(MOCK_PROFIT_LAST_MONTH)}. You're up by ${percentageChange.toFixed(0)}%! Great job.`,
                actions: [
                    { label: "What were my income sources?", actionId: 'get_income_sources' },
                    { label: "Show my top expenses", actionId: 'get_top_expenses' },
                    { label: "Back to main menu", actionId: 'main_menu' },
                ]
            });
            break;

        case 'get_income_sources':
             addMessage({
                role: 'model',
                content: `Your main income sources were a project with 'Innovate Corp' and several sales from your Shopee store.`,
                actions: [
                    { label: "Show my top expenses", actionId: 'get_top_expenses' },
                    { label: "Back to main menu", actionId: 'main_menu' },
                ]
            });
            break;

        case 'get_top_expenses':
            addMessage({
                role: 'model',
                content: `Your top expenses this month are:\n${MOCK_TOP_EXPENSES_STRING}`,
                actions: [
                    { label: "What's my profit this month?", actionId: 'get_profit' },
                    { label: "Back to main menu", actionId: 'main_menu' },
                ]
            });
            break;

        case 'get_tax_estimate':
            addMessage({
                role: 'model',
                content: MOCK_TAX_ESTIMATE_STRING,
                 actions: [
                    { label: "What's my profit this month?", actionId: 'get_profit' },
                    { label: "Back to main menu", actionId: 'main_menu' },
                ]
            });
            break;

        case 'start_receipt_flow':
            addMessage({
               role: 'model',
               content: "Let's create a receipt for 'Innovate Corp' for ₱20,000.",
               component: { type: 'invoice-preview', data: { client: 'Innovate Corp', amount: 20000, dueDate: addDays(new Date(), 15), project: 'Branding Project' } },
               actions: [
                    { label: "Looks good, generate it!", actionId: 'generate_receipt_confirm' },
                    { label: "Let's cancel for now", actionId: 'main_menu' },
               ]
            });
            break;

        case 'generate_receipt_confirm':
            toast({ title: '✅ Receipt Generated!', description: `The receipt for Innovate Corp has been saved.` });
            addMessage({
                role: 'model',
                content: "Done! I've saved the receipt. You can view it in your transaction history.",
                actions: initialActions,
            });
            break;

        case 'main_menu':
            addMessage({
                role: 'model',
                content: "What else can I help you with?",
                actions: initialActions,
            });
            break;

        default:
            addMessage({
                role: 'model',
                content: "I'm not sure how to handle that. Let's go back to the main menu.",
                actions: initialActions,
            });
            break;
    }
  };

  const lastMessage = messages[messages.length - 1];

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

      <div className="flex-grow overflow-hidden flex flex-col">
        <ScrollArea className="flex-grow" ref={scrollAreaRef}>
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
                         <div className="p-2 bg-accent/20 rounded-full self-end">
                            <Bot className="h-6 w-6 text-accent" />
                        </div>
                        <div className='bg-background/40 rounded-2xl rounded-bl-none p-4 w-full backdrop-blur-md'>
                           <p className="whitespace-pre-wrap">{message.content}</p>
                           {message.component?.type === 'profit-card' && <ProfitCard data={message.component.data} />}
                           {message.component?.type === 'invoice-preview' && <InvoicePreview data={message.component.data} />}
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
        <div className="p-4 border-t shrink-0 bg-background/80 backdrop-blur-md">
           <AnimatePresence>
            {!isLoading && lastMessage?.role === 'model' && lastMessage.actions && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col items-center gap-2"
                >
                    {lastMessage.actions.map(action => (
                        <Button
                            key={action.actionId}
                            variant="outline"
                            className="w-full rounded-full bg-background/50"
                            onClick={() => handleActionClick(action)}
                        >
                            {action.label}
                        </Button>
                    ))}
                </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
