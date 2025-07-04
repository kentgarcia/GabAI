
'use client';

import * as React from 'react';
import {
  MoreHorizontal, Plus, Search, Send, Mic, Sparkles, Lightbulb, BarChart, ThumbsUp, SendHorizonal, Bot
} from 'lucide-react';

import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart, Cell } from "recharts";
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);

const historyItems = [
  { id: '1', title: 'Q2 Profit Analysis', date: '2024-07-15' },
  { id: '2', title: 'Draft business proposal', date: '2024-07-14' },
  { id: '3', title: 'Top expenses last quarter', date: '2024-07-12' },
  { id: '4', title: 'Tax estimation for June', date: '2024-07-10' },
];

const initialMessages = [
  { role: 'model' as const, content: "Hello! I'm Gabi, your AI financial co-pilot. How can I help you streamline your work today? Feel free to select one of the prompts below to get started." },
];

const suggestedPrompts = [
  'Summarize my financial health last month',
  'Draft an email to follow up on an overdue invoice for Creative Minds Co.',
  'What were my top 3 expense categories last quarter?',
  'Give me some ideas to reduce my operational costs',
];

const mockGabiResponses: { [key: string]: any } = {
  'Summarize my financial health last month': {
    text: "Based on your data for last month, you had a net profit of ₱34,500. It was a strong month, with revenue up 15% from the previous month. I've displayed the key metrics for you in the Canvas.",
    canvas: { type: 'financial_summary', data: { income: 85000, expenses: 50500 } },
    followUps: ["Show me the full P&L", "What was my biggest expense?", "Which client paid the most?"]
  },
  'Draft an email to follow up on an overdue invoice for Creative Minds Co.': {
    text: "Of course. I've drafted a professional and friendly reminder for your invoice to Creative Minds Co. You can review it in the Canvas and send it directly from there.",
    canvas: { type: 'email_draft', data: { client: "Creative Minds Co." } },
    followUps: ["Make the tone more urgent", "Add a 5% late fee warning", "Translate this to Filipino"]
  },
  'What were my top 3 expense categories last quarter?': {
    text: "For the last quarter, your top three expense categories were 'Product Costs', 'Marketing & Ads', and 'Shipping Fees'. I've created a chart in the Canvas to visualize the breakdown.",
    canvas: { type: 'expense_chart', data: [
        { name: 'Product Costs', value: 45000, fill: 'hsl(var(--chart-1))' },
        { name: 'Marketing & Ads', value: 25000, fill: 'hsl(var(--chart-2))' },
        { name: 'Shipping Fees', value: 18000, fill: 'hsl(var(--chart-3))' },
        { name: 'Software', value: 8000, fill: 'hsl(var(--chart-4))' },
        { name: 'Other', value: 5000, fill: 'hsl(var(--chart-5))' },
    ] },
    followUps: ["Which marketing channel was most expensive?", "Compare this to the previous quarter"]
  },
  'Give me some ideas to reduce my operational costs': {
    text: "A great goal! Based on your spending, here are a few actionable ideas I've prepared for you in the Canvas. The biggest opportunity seems to be in optimizing your shipping costs.",
    canvas: { type: 'actionable_ideas', data: [
        { title: "Negotiate with Suppliers", description: "Your 'Product Costs' are high. Contact your top 3 suppliers to ask for bulk discounts." },
        { title: "Optimize Shipping", description: "Explore alternative couriers. You could save up to 15% compared to your current average." },
        { title: "Review Subscriptions", description: "You have 3 software subscriptions. Review their usage and see if a lower-tier plan would suffice." },
    ] },
    followUps: ["Draft an email to my main supplier", "Find alternative couriers in my area"]
  }
};

const expenseChartConfig: ChartConfig = {
  value: { label: "Value" },
  'Product Costs': { label: "Product Costs", color: "hsl(var(--chart-1))" },
  'Marketing & Ads': { label: "Marketing", color: "hsl(var(--chart-2))" },
  'Shipping Fees': { label: "Shipping", color: "hsl(var(--chart-3))" },
  'Software': { label: "Software", color: "hsl(var(--chart-4))" },
  'Other': { label: "Other", color: "hsl(var(--chart-5))" },
};

// --- Canvas Components ---
const CanvasInitialState = () => (
    <div className="text-center text-muted-foreground p-8 flex flex-col items-center justify-center h-full">
        <Bot className="mx-auto h-10 w-10 mb-4" />
        <p className="font-semibold">Gabi's Canvas</p>
        <p className="text-sm">Charts, data tables, and document previews related to your conversation will appear here.</p>
    </div>
);

const FinancialSummaryCanvas = ({ data }: { data: any }) => (
    <div className="p-4 space-y-4">
        <h3 className="font-bold text-lg">Last Month's Financial Summary</h3>
        <Card>
            <CardHeader><CardTitle className="text-base">Total Income</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-emerald-500">{formatCurrency(data.income)}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle className="text-base">Total Expenses</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold text-red-500">{formatCurrency(data.expenses)}</p></CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle className="text-base">Net Profit</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{formatCurrency(data.income - data.expenses)}</p></CardContent>
        </Card>
    </div>
);

const ExpenseChartCanvas = ({ data }: { data: any }) => (
    <div className="w-full h-full flex flex-col items-center p-4">
        <h3 className="text-center font-bold text-lg mb-2">Expense Breakdown (Q2)</h3>
        <ChartContainer config={expenseChartConfig} className="w-full h-[300px]">
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} strokeWidth={5}>
                    {data.map((entry: any) => <Cell key={entry.name} fill={entry.fill} />)}
                </Pie>
            </PieChart>
        </ChartContainer>
    </div>
);

const EmailDraftCanvas = ({ data }: { data: any }) => {
    const { toast } = useToast();
    return (
        <div className="p-4 space-y-4">
            <h3 className="font-bold text-lg">Email Draft</h3>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">To: {data.client}</CardTitle>
                    <CardDescription>Subject: Gentle Follow-up on Invoice #INV-003</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        defaultValue={`Hi Team,\n\nHope you're having a great week.\n\nJust wanted to send a gentle reminder that invoice #INV-003 is now past its due date. Could you please provide an update on the payment status?\n\nPlease let me know if you need another copy of the invoice.\n\nThanks,\nJuan`}
                        rows={10}
                        className="bg-background"
                    />
                    <Button className="w-full mt-4" onClick={() => toast({title: "✅ Email Sent!", description: `The reminder has been sent to ${data.client}.`})}>
                        <SendHorizonal className="mr-2" /> Send Email
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

const ActionableIdeasCanvas = ({ data }: { data: any }) => (
    <div className="p-4 space-y-4">
        <h3 className="font-bold text-lg">Cost Reduction Ideas</h3>
        {data.map((idea: any, index: number) => (
             <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <ThumbsUp className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-base">{idea.title}</CardTitle>
                        <CardDescription className="text-xs">{idea.description}</CardDescription>
                    </div>
                </CardHeader>
             </Card>
        ))}
    </div>
);


export default function GabiWorkspace() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [currentPrompts, setCurrentPrompts] = React.useState(suggestedPrompts);
  const [isLoading, setIsLoading] = React.useState(false);
  const [canvasContent, setCanvasContent] = React.useState<any>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handlePromptClick = (prompt: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setCanvasContent(null);
    setCurrentPrompts([]);

    setTimeout(() => {
      const response = mockGabiResponses[prompt] || { text: "I'm sorry, I can't help with that just yet.", canvas: null, followUps: suggestedPrompts };
      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
      setCanvasContent(response.canvas);
      setCurrentPrompts(response.followUps);
      setIsLoading(false);
    }, 1500);
  };
  
  React.useEffect(() => {
      if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth'});
      }
  }, [messages, isLoading]);

  const renderCanvas = () => {
      if (!canvasContent) return <CanvasInitialState />;
      switch(canvasContent.type) {
          case 'financial_summary': return <FinancialSummaryCanvas data={canvasContent.data} />;
          case 'expense_chart': return <ExpenseChartCanvas data={canvasContent.data} />;
          case 'email_draft': return <EmailDraftCanvas data={canvasContent.data} />;
          case 'actionable_ideas': return <ActionableIdeasCanvas data={canvasContent.data} />;
          default: return <CanvasInitialState />;
      }
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-[calc(100dvh-4rem)] rounded-xl border">
      {/* Left Panel: History */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <div className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">History</h2>
            <Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="relative my-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search history..." className="pl-8" />
          </div>
          <Separator />
          <ScrollArea className="flex-1 -mx-4">
            <div className="p-4 space-y-2">
              {historyItems.map(item => (
                <div key={item.id} className="p-2 rounded-md hover:bg-muted cursor-pointer">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Center Panel: Conversation */}
      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="flex h-full flex-col">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
             <div className="p-6 space-y-6">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      <Avatar className="mt-1">
                        <AvatarImage src={message.role === 'model' ? '/gabi-avatar.png' : 'https://avatar.iran.liara.run/public/25'} data-ai-hint="robot assistant" />
                        <AvatarFallback>{message.role === 'model' ? 'G' : 'Y'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 rounded-lg bg-background p-4 leading-relaxed">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                     <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
                       <Avatar className="mt-1"><AvatarImage src='/gabi-avatar.png' data-ai-hint="robot assistant" /><AvatarFallback>G</AvatarFallback></Avatar>
                        <div className="flex-1 rounded-lg bg-background p-4 flex items-center gap-2">
                           <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                           <p className="text-muted-foreground">Gabi is thinking...</p>
                        </div>
                     </motion.div>
                  )}
                 </AnimatePresence>

                 {!isLoading && currentPrompts.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center py-8">
                        {currentPrompts.map(prompt => (
                            <Button key={prompt} variant="outline" size="sm" className="rounded-full" onClick={() => handlePromptClick(prompt)}>
                                {prompt}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="relative">
              <Textarea
                placeholder="Ask Gabi to analyze data, draft documents, or give you business advice..."
                className="pr-16"
                rows={2}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
                <Button size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel: Canvas */}
      <ResizablePanel defaultSize={30} minSize={25}>
        <div className="h-full">
            <Card className="h-full w-full flex flex-col rounded-none border-0 border-l">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={canvasContent ? canvasContent.type : 'initial'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1"
                    >
                        {renderCanvas()}
                    </motion.div>
                </AnimatePresence>
            </Card>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
