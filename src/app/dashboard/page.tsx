'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Bot, Gift, Home, Trophy, FileText, ArrowRight, Package, Briefcase, ShoppingCart, Truck, TrendingUp, TrendingDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Activity = { id: number; type: 'income' | 'expense'; name: string; date: string; value: number; project?: string; };
type BreakdownItem = { name: string; value: number; };
type PeriodData = {
  netProfit: number;
  income: number;
  expenses: number;
  breakdown: {
    products: BreakdownItem[];
    expenses: BreakdownItem[];
  };
  activity: Activity[];
};
type MockData = {
  week: PeriodData;
  month: PeriodData;
  quarter: PeriodData;
};

const mockData: MockData = {
  week: {
    netProfit: 2150.75,
    income: 3500.00,
    expenses: 1349.25,
    breakdown: {
      products: [
        { name: 'Product C', value: 1500 },
        { name: 'Service A', value: 1200 },
      ],
      expenses: [
        { name: 'Ad Spend', value: 500 },
        { name: 'Software', value: 250 },
      ],
    },
    activity: [
      { id: 1, type: 'income', name: 'Stripe Payout', date: 'Just now', value: 800, project: 'Website Redesign' },
      { id: 2, type: 'expense', name: 'Canva Subscription', date: '1 day ago', value: 150 },
      { id: 3, type: 'income', name: 'Adsense Payout', date: '3 days ago', value: 950, project: 'Youtube Ads' },
    ],
  },
  month: {
    netProfit: 12345.67,
    income: 20000.00,
    expenses: 7654.33,
    breakdown: {
      products: [
        { name: 'Product A', value: 8000 },
        { name: 'Service B', value: 6000 },
      ],
      expenses: [
        { name: 'Product Costs', value: 4000 },
        { name: 'Shipping Fees', value: 1500 },
      ],
    },
    activity: [
      { id: 4, type: 'income', name: 'Client Payment', date: 'Today', value: 5000, project: 'Logo Design Package' },
      { id: 5, type: 'expense', name: 'Internet Bill', date: 'Yesterday', value: 799 },
      { id: 6, type: 'income', name: 'Shopee Payout', date: '2 days ago', value: 1250, project: 'Q2 Online Sales' },
    ],
  },
  quarter: {
    netProfit: 35820.40,
    income: 60000.00,
    expenses: 24179.60,
    breakdown: {
      products: [
        { name: 'Product A', value: 24000 },
        { name: 'Service B', value: 18000 },
      ],
      expenses: [
        { name: 'Product Costs', value: 12000 },
        { name: 'Shipping Fees', value: 4500 },
      ],
    },
    activity: [
       { id: 7, type: 'income', name: 'Q1 Project Milestone', date: '1 week ago', value: 15000, project: 'Enterprise App Dev' },
       { id: 8, type: 'expense', name: 'Tax Payment', date: '2 weeks ago', value: 8500 },
       { id: 9, type: 'income', name: 'Lazada Payout', date: '3 weeks ago', value: 7500, project: 'Q1 Gadget Sales' },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value).replace('₱', '₱ ');
};

function AnimatedNumber({ value, className, prefix = '' }: { value: number; className: string; prefix?: string; }) {
  const count = useMotionValue(0);
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 1, ease: "easeOut" });
    return () => controls.stop();
  }, [value, count]);

  const display = useTransform(count, (latest) => {
    const roundedValue = Math.round(latest);
    return `${prefix} ${formatCurrency(roundedValue)}`.trim();
  });

  return <motion.p className={className}>{display}</motion.p>;
}


export default function DashboardPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [data, setData] = useState<PeriodData>(mockData.month);

  useEffect(() => {
    setData(mockData[period]);
  }, [period]);

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        
        <div className="flex justify-center">
            <Tabs 
                defaultValue="month" 
                className="w-auto"
                onValueChange={(value) => setPeriod(value as 'week' | 'month' | 'quarter')}
            >
                <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1.5 rounded-full backdrop-blur-lg">
                    <TabsTrigger value="week" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Week</TabsTrigger>
                    <TabsTrigger value="month" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Quarter</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={period}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <Card className="w-full bg-gradient-to-b from-primary-dark to-primary text-primary-foreground shadow-xl rounded-3xl">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                                    <span className="font-bold text-xl text-white">₱</span>
                                </div>
                                <p className="font-semibold tracking-wider text-primary-foreground/80">NET PROFIT</p>
                            </div>
                            <Button className="bg-black/20 text-primary-foreground/80 hover:bg-black/30 h-10 px-3 text-xs rounded-full flex items-center gap-1">
                                More Details <ArrowRight className="w-3 h-3" />
                            </Button>
                        </div>
                        
                        <div className="text-center">
                            <AnimatedNumber value={data.netProfit} className="text-6xl font-bold my-2 tracking-tighter text-white whitespace-nowrap" />
                        </div>
                        
                        <div className="w-full border-t border-primary-foreground/20"></div>

                        <div className="grid grid-cols-2 gap-4 w-full text-center">
                          <div>
                            <p className="text-sm text-primary-foreground/70">Income</p>
                            <AnimatedNumber value={data.income} className="text-2xl font-semibold text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-primary-foreground/70">Expenses</p>
                            <AnimatedNumber value={data.expenses} className="text-2xl font-semibold text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="font-bold text-lg">This Month's Breakdown</h2>
                    <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                        <CardContent className="p-4">
                            <Tabs defaultValue="products" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1.5 rounded-2xl">
                                    <TabsTrigger value="products" className="rounded-lg">Top Products/Services</TabsTrigger>
                                    <TabsTrigger value="expenses" className="rounded-lg">Top Expenses</TabsTrigger>
                                </TabsList>
                                <TabsContent value="products" className="mt-4">
                                    <div className="space-y-4">
                                        {data.breakdown.products.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                                    {index % 2 === 0 ? <Package className="w-5 h-5 text-primary-foreground" /> : <Briefcase className="w-5 h-5 text-primary-foreground" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold">{item.name}</p>
                                                </div>
                                                <AnimatedNumber value={item.value} className="font-semibold text-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="expenses" className="mt-4">
                                    <div className="space-y-4">
                                       {data.breakdown.expenses.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                                     {index % 2 === 0 ? <ShoppingCart className="w-5 h-5 text-primary-foreground" /> : <Truck className="w-5 h-5 text-primary-foreground" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold">{item.name}</p>
                                                </div>
                                                <AnimatedNumber value={item.value} className="font-semibold text-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>


                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg">Recent Activity</h2>
                        <Link href="#" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
                        See all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                        <CardContent className="p-4 space-y-2">
                            {data.activity.map((item) => {
                                const activityItem = (
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            item.type === 'income' ? "bg-emerald-500/20" : "bg-red-500/20"
                                        )}>
                                            {item.type === 'income' ? <TrendingUp className="w-5 h-5 text-emerald-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.date}</p>
                                        </div>
                                        <AnimatedNumber 
                                          value={item.value} 
                                          prefix={item.type === 'income' ? '+' : '-'}
                                          className={cn(
                                            "font-semibold text-lg",
                                            item.type === 'income' ? "text-emerald-500" : "text-red-500"
                                          )}
                                        />
                                    </div>
                                );

                                return item.type === 'income' ? (
                                    <Link
                                        key={item.id}
                                        href={`/transaction/${item.id}?name=${encodeURIComponent(item.name)}&value=${item.value}&date=${encodeURIComponent(item.date)}&project=${encodeURIComponent(item.project || 'N/A')}`}
                                        className="p-2 -m-2 rounded-lg cursor-pointer transition-colors hover:bg-muted/40 block"
                                    >
                                        {activityItem}
                                    </Link>
                                ) : (
                                    <div key={item.id} className="p-2 -m-2">
                                        {activityItem}
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </AnimatePresence>
      </main>

      
      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-black rounded-full h-14 flex justify-around items-center shadow-lg">
          <Link href="/dashboard" className="flex flex-col items-center text-primary hover:text-primary/90 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="/reports" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <FileText className="w-5 h-5" />
          </Link>
          <Link href="/chat" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Gift className="w-5 h-5" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Trophy className="w-5 h-5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
