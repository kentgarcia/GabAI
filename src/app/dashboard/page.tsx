
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import {
    ArrowRight, TrendingUp, TrendingDown, ArrowLeftRight,
    AlertTriangle, Lightbulb, Wallet, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FinancialHealthGauge } from '@/components/ui/financial-health-gauge';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import Image from 'next/image';

type Activity = { id: number; type: 'income' | 'expense'; name: string; date: string; value: number; project?: string; };
type BreakdownItem = { name: string; value: number; };
type PlatformBreakdownItem = { name: string; value: number; icon: string; };
type PeriodData = {
  netProfit: number;
  income: number;
  expenses: number;
  breakdown: {
    products: BreakdownItem[];
    expenses: BreakdownItem[];
  };
  activity: Activity[];
  platformBreakdown: PlatformBreakdownItem[];
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
    platformBreakdown: [
      { name: 'Lazada Sales', value: 1500, icon: '/logo/lazada.svg' },
      { name: 'Shopee Sales', value: 1000, icon: '/logo/shopee.svg' },
      { name: 'Client Payments', value: 1000, icon: '/logo/upwork.svg' },
      { name: 'TikTok Shop', value: 0, icon: '/logo/tiktok.svg' },
    ],
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
    platformBreakdown: [
        { name: 'Lazada Sales', value: 8000, icon: '/logo/lazada.svg' },
        { name: 'Shopee Sales', value: 6500, icon: '/logo/shopee.svg' },
        { name: 'Client Payments', value: 4500, icon: '/logo/upwork.svg' },
        { name: 'TikTok Shop', value: 1000, icon: '/logo/tiktok.svg' },
    ],
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
    platformBreakdown: [
        { name: 'Lazada Sales', value: 25000, icon: '/logo/lazada.svg' },
        { name: 'Shopee Sales', value: 20000, icon: '/logo/shopee.svg' },
        { name: 'Client Payments', value: 12000, icon: '/logo/upwork.svg' },
        { name: 'TikTok Shop', value: 3000, icon: '/logo/tiktok.svg' },
    ],
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

const gabiInsights = [
    { text: "Follow up with 'Innovate Corp'. Their ₱15,000 invoice is 3 days overdue.", href: '#', icon: AlertTriangle, iconColor: 'text-yellow-500' },
    { text: "Your 'Resin Coasters' are hot! You're low on stock.", href: '#', icon: TrendingUp, iconColor: 'text-emerald-500' },
    { text: "Your quarterly tax filing is due in 15 days. Let's make sure your books are clean.", href: '#', icon: Lightbulb, iconColor: 'text-blue-500' },
];

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformBreakdownItem | null>(null);

  useEffect(() => {
    setData(mockData[period]);
  }, [period]);

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  }

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.div variants={itemVariants}>
                <AppHeader userName="Juan dela Cruz" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
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
            </motion.div>
        </motion.div>

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
                  <div className="relative h-[290px] [perspective:1000px]">
                    <motion.div
                      className="relative w-full h-full [transform-style:preserve-3d]"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Front: Net Profit */}
                      <div
                        className="absolute w-full h-full [backface-visibility:hidden] cursor-pointer"
                        onClick={handleFlip}
                      >
                        <Card className="w-full h-full bg-gradient-to-b from-primary-dark to-primary text-primary-foreground shadow-xl rounded-3xl">
                          <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-xl text-white">₱</span>
                                    </div>
                                    <p className="font-semibold tracking-wider text-primary-foreground/80">NET PROFIT</p>
                                </div>
                                <div className="text-primary-foreground/70 flex items-center gap-1 text-xs">
                                  Flip <ArrowLeftRight className="w-3 h-3"/>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <AnimatedNumber value={data.netProfit} className="text-6xl font-bold tracking-tighter text-white whitespace-nowrap" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 w-full text-center">
                              <div>
                                <p className="text-sm text-primary-foreground/70">Income</p>
                                <AnimatedNumber value={data.income} className="text-2xl font-semibold text-emerald-300" />
                              </div>
                              <div>
                                <p className="text-sm text-primary-foreground/70">Expenses</p>
                                <AnimatedNumber value={data.expenses} className="text-2xl font-semibold text-red-300" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Back: Financial Health */}
                      <div
                        className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] cursor-pointer"
                        onClick={handleFlip}
                      >
                        <Card className="w-full h-full bg-primary-dark text-primary-foreground rounded-3xl">
                            <CardContent className="p-6 flex flex-col items-center justify-center h-full relative">
                                <div className="flex flex-col items-center text-center">
                                    <h2 className="text-lg font-bold mb-2">Your Financial Health</h2>
                                    <FinancialHealthGauge
                                        score={750}
                                        maxScore={1000}
                                        status="Healthy"
                                        trend="up"
                                    />
                                </div>
                                <Button asChild variant="outline" className="mt-4 rounded-full bg-primary/80 border-primary-foreground/50 text-primary-foreground hover:bg-primary/90">
                                    <Link href="/growth-path" onClick={(e) => e.stopPropagation()}>View Growth Path</Link>
                                </Button>
                                <div className="text-primary-foreground/70 flex items-center gap-1 text-xs absolute bottom-4 right-4">
                                  Flip <ArrowLeftRight className="w-3 h-3"/>
                                </div>
                            </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h2 className="font-bold text-lg">Platform Breakdown</h2>
                  <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedPlatform(null)}>
                    <div className="grid grid-cols-2 gap-4">
                        {data.platformBreakdown.map((item, index) => (
                            <DialogTrigger asChild key={index} onClick={() => setSelectedPlatform(item)}>
                              <motion.div whileTap={{ scale: 0.97 }}>
                                <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 cursor-pointer hover:bg-muted/40 transition-colors">
                                    <CardContent className="p-4 flex flex-col items-center text-center">
                                        <div className="w-10 h-10 bg-[#131313] rounded-xl flex items-center justify-center mb-2 p-1.5">
                                          <Image src={item.icon} width={30} height={30} alt={`${item.name} logo`} className="filter brightness-0 invert" />
                                        </div>
                                        <p className="font-semibold text-sm">{item.name}</p>
                                        <AnimatedNumber value={item.value} className="font-semibold text-lg" />
                                    </CardContent>
                                </Card>
                              </motion.div>
                            </DialogTrigger>
                        ))}
                    </div>
                    <AnimatePresence>
                      {selectedPlatform && (
                        <DialogContent className="bg-background/80 backdrop-blur-md border">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <DialogHeader>
                                  <DialogTitle className="flex items-center gap-3 text-xl">
                                    <Image src={selectedPlatform.icon} width={30} height={30} alt={`${selectedPlatform.name} logo`} className="p-1 bg-black rounded-md filter brightness-0 invert" />
                                      {selectedPlatform.name} Details
                                  </DialogTitle>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                  <div>
                                      <h3 className="font-semibold mb-2">Performance Summary</h3>
                                      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                                          <div className="flex justify-between text-sm">
                                              <span className="text-muted-foreground">Total Sales ({period})</span>
                                              <span className="font-bold">{formatCurrency(selectedPlatform.value)}</span>
                                          </div>
                                          <div className="flex justify-between text-sm">
                                              <span className="text-muted-foreground">Number of Orders</span>
                                              <span className="font-bold">{Math.round(selectedPlatform.value / 150)}</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div>
                                      <h3 className="font-semibold mb-2">Recent Activity (Simulated)</h3>
                                      <motion.div
                                          variants={{
                                              hidden: { opacity: 0 },
                                              visible: {
                                                  opacity: 1,
                                                  transition: { staggerChildren: 0.2 },
                                              },
                                          }}
                                          initial="hidden"
                                          animate="visible"
                                          className="space-y-2"
                                      >
                                          {[...Array(3)].map((_, i) => (
                                              <motion.div
                                                  key={i}
                                                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                                                  className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-lg"
                                              >
                                                  <span>Order #{12345 - (i * 10)}</span>
                                                  <span className="font-semibold">{formatCurrency((selectedPlatform.value / (10 + i * 5)) * (Math.random() + 0.5))}</span>
                                              </motion.div>
                                          ))}
                                      </motion.div>
                                  </div>
                              </div>
                          </motion.div>
                        </DialogContent>
                      )}
                    </AnimatePresence>
                  </Dialog>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                     <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                        <CardHeader>
                            <CardTitle>Gabi's Co-Pilot Briefing ({gabiInsights.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            {gabiInsights.map((insight, index) => (
                                <Link href={insight.href} key={index}>
                                    <div className="p-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-muted/40">
                                        <insight.icon className={cn("w-5 h-5 flex-shrink-0", insight.iconColor)} />
                                        <p className="font-medium text-sm flex-grow">{insight.text}</p>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                </Link>
                            ))}
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

      <AppFooter />
    </div>
  );
}
