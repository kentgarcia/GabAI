
'use client';

import * as React from 'react';
import {
  MoreHorizontal, Plus, Search, Send, Mic, Bot, Sparkles, Lightbulb
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

const historyItems = [
  { id: '1', title: 'Q1 Profit Analysis', date: '2024-07-15' },
  { id: '2', title: 'Draft business proposal', date: '2024-07-14' },
  { id: '3', title: 'Top expenses last quarter', date: '2024-07-12' },
  { id: '4', title: 'Tax estimation for June', date: '2024-07-10' },
];

const initialMessages = [
  { role: 'model', content: "Hello! I'm Gabi, your AI financial co-pilot. How can I help you streamline your work today?" },
];

const suggestedPrompts = [
  'Summarize my financial health last month',
  'Draft an email to follow up on an overdue invoice',
  'What are my top 3 expense categories?',
  'Give me some ideas to reduce my operational costs',
];

const expenseData = [
  { name: 'Product Costs', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Marketing', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Fees', value: 20, fill: 'hsl(var(--chart-3))' },
  { name: 'Software', value: 10, fill: 'hsl(var(--chart-5))' },
];
const chartConfig: ChartConfig = {
  value: { label: "Value" },
  productCosts: { label: "Product Costs", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  fees: { label: "Fees", color: "hsl(var(--chart-3))" },
  software: { label: "Software", color: "hsl(var(--chart-5))" },
}

export default function GabiWorkspace() {
  const [messages, setMessages] = React.useState(initialMessages);
  const [showExpenseChart, setShowExpenseChart] = React.useState(false);

  const handlePromptClick = (prompt: string) => {
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    if (prompt.includes('expense')) {
      setShowExpenseChart(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', content: "Sure. Your total expenses for last quarter were ₱45,000. Your top category was Product Costs. I've displayed a detailed chart for you on the right." }]);
      }, 1000);
    } else {
      setShowExpenseChart(false);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', content: `I can certainly help with that. Let's look into it...` }]);
      }, 1000);
    }
  };


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
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={message.role === 'model' ? '/gabi-avatar.png' : 'https://avatar.iran.liara.run/public/25'} data-ai-hint="robot assistant" />
                    <AvatarFallback>{message.role === 'model' ? 'G' : 'Y'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 rounded-lg bg-background p-4">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
               {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 justify-center py-8">
                    {suggestedPrompts.map(prompt => (
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
        <div className="h-full p-4">
          <Card className="h-full w-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Canvas</CardTitle>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              {showExpenseChart ? (
                <div className="w-full h-full flex flex-col items-center">
                   <h3 className="text-center font-semibold mb-2">Expense Breakdown (Q2)</h3>
                   <ChartContainer config={chartConfig} className="w-full h-[250px]">
                      <PieChart>
                          <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                          <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} strokeWidth={5}>
                              {expenseData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                              ))}
                          </Pie>
                      </PieChart>
                  </ChartContainer>
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <Lightbulb className="mx-auto h-8 w-8 mb-4" />
                  <p className="font-semibold">Contextual Information</p>
                  <p className="text-sm">Charts, data tables, and document previews related to your conversation will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
