'use client';

import { useState } from 'react';
import { Bot, Gift, Home, Trophy, Bitcoin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [period, setPeriod] = useState('month');

  // Mock data for demonstration
  const data = {
    netProfit: 12345.67,
    income: 20000.00,
    expenses: 7654.33,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value).replace('₱', '₱ ');
  };

  const isProfitPositive = data.netProfit >= 0;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        
        <div className="flex justify-center">
            <Tabs defaultValue="month" className="w-auto">
                <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1.5 rounded-full">
                    <TabsTrigger value="week" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Week</TabsTrigger>
                    <TabsTrigger value="month" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Quarter</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <Card className="w-full bg-primary/5 border-primary/20 shadow-lg rounded-3xl">
          <CardContent className="p-6 flex flex-col items-center">
            <p className="text-sm font-medium text-primary/80 tracking-widest">NET PROFIT</p>
            <p className={cn(
              "text-6xl font-bold my-2 tracking-tighter",
              isProfitPositive ? 'text-green-600' : 'text-destructive'
            )}>
              {formatCurrency(data.netProfit)}
            </p>
            
            <div className="w-full border-t border-primary/10 my-4"></div>

            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-2xl font-semibold">{formatCurrency(data.income)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-2xl font-semibold">{formatCurrency(data.expenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Recent Transactions</h2>
                <Link href="#" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
                See all <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <div className="text-center py-10 bg-card rounded-2xl border">
                <p className="text-muted-foreground">No recent transactions yet.</p>
            </div>
        </div>
      </main>

      
      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-black rounded-full h-20 flex justify-around items-center shadow-lg">
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Home className="w-7 h-7" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Bitcoin className="w-7 h-7" />
          </Link>
          <Link href="#" className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Gift className="w-7 h-7" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Trophy className="w-7 h-7" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
