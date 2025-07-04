
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Briefcase, CheckCircle, DollarSign, Lightbulb, Package, AlertTriangle, Crown, TrendingUp, ArrowLeftRight } from 'lucide-react';
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/layout/AppHeader';


// --- Mock Data ---
type BreakdownItem = { name:string; value: number; };
type PlatformBreakdownItem = { id: string; name: string; value: number; icon: string; };
type PeriodData = {
  netProfit: number;
  income: number;
  expenses: number;
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
      { id: 'lazada', name: 'Lazada', value: 1500, icon: '/logo/lazada.svg' },
      { id: 'shopee', name: 'Shopee', value: 1000, icon: '/logo/shopee.svg' },
      { id: 'upwork', name: 'Upwork', value: 1000, icon: '/logo/upwork.svg' },
      { id: 'tiktok', name: 'TikTok Shop', value: 0, icon: '/logo/tiktok.svg' },
    ],
  },
  month: {
    netProfit: 23337,
    income: 45231,
    expenses: 21894,
    platformBreakdown: [
        { id: 'upwork', name: 'Upwork', value: 25120, icon: '/logo/upwork.svg' },
        { id: 'shopee', name: 'Shopee', value: 15500, icon: '/logo/shopee.svg' },
        { id: 'lazada', name: 'Lazada', value: 8942, icon: '/logo/lazada.svg' },
        { id: 'tiktok', name: 'TikTok Shop', value: 4500, icon: '/logo/tiktok.svg' },
    ],
  },
  quarter: {
    netProfit: 75820.40,
    income: 120000.00,
    expenses: 44179.60,
    platformBreakdown: [
        { id: 'upwork', name: 'Upwork', value: 65000, icon: '/logo/upwork.svg' },
        { id: 'shopee', name: 'Shopee', value: 30000, icon: '/logo/shopee.svg' },
        { id: 'lazada', name: 'Lazada', value: 18000, icon: '/logo/lazada.svg' },
        { id: 'tiktok', name: 'TikTok Shop', value: 7000, icon: '/logo/tiktok.svg' },
    ],
  },
};

const cashFlowData = [
  { month: "Jan", income: 18600, expenses: 8000 },
  { month: "Feb", income: 30500, expenses: 20000 },
  { month: "Mar", income: 23700, expenses: 12000 },
  { month: "Apr", income: 17300, expenses: 19000 },
  { month: "May", income: 20900, expenses: 13000 },
  { month: "Jun", income: 21400, expenses: 14000 },
];

const pnlSnapshotData = {
    revenue: 45231,
    cogs: 15120,
    grossProfit: 30111,
    operatingExpenses: 6773,
    netProfit: 23338
};

const expenseBreakdownData = [
  { name: 'Product Costs', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Marketing', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Fees', value: 20, fill: 'hsl(var(--chart-3))' },
  { name: 'Software', value: 10, fill: 'hsl(var(--chart-5))' },
];

const topPerformersData = [
    { name: 'Gadget Pro Stand', value: '₱25,120', icon: Package },
    { name: 'Digital Art Commission', value: '₱15,500', icon: Briefcase },
    { name: 'Vintage T-Shirt', value: '₱8,942', icon: Briefcase },
];

const todoListData = [
    { text: 'File quarterly income tax return', icon: AlertTriangle, color: 'text-yellow-500', dueDate: 'Due in 3 days' },
    { text: 'Log 10 transactions to complete "The Foundation" milestone', icon: Lightbulb, color: 'text-blue-500' },
    { text: 'Review uncategorized expenses', icon: CheckCircle, color: 'text-emerald-500' },
];

const chartConfig = {
  income: { label: "Income", color: "hsl(var(--chart-2))" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
  value: { label: "Value" },
  productCosts: { label: "Product Costs", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  fees: { label: "Fees", color: "hsl(var(--chart-3))" },
  software: { label: "Software", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;


// --- Helper Functions ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCurrencyForChart = (value: number) => {
  if (value >= 1000) return `₱${(value / 1000).toFixed(0)}k`;
  return `₱${value}`;
};


export default function WebAppPage() {
    const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');
    const [data, setData] = useState<PeriodData>(mockData.month);

    useEffect(() => {
        setData(mockData[period]);
    }, [period]);

    const sortedPlatforms = React.useMemo(() =>
        [...data.platformBreakdown].sort((a, b) => b.value - a.value),
        [data.platformBreakdown]
    );

  return (
    <>
        <header className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Juan! Here's what's happening with your business.</p>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-background/50 rounded-full" onClick={() => setPeriod('month')}>This Month</Button>
                <AppHeader userName="Juan dela Cruz" />
            </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area (Left) */}
            <div className="xl:col-span-3 space-y-6">
                {/* KPI Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-emerald-500">{formatCurrency(data.netProfit)}</div>
                      </CardContent>
                    </Card>
                     <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Gross Income</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(data.income)}</div>
                      </CardContent>
                    </Card>
                     <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{formatCurrency(data.expenses)}</div>
                      </CardContent>
                    </Card>
                </div>
                 
                 {/* Platform Breakdown */}
                <div className="space-y-4">
                  <h2 className="font-bold text-xl">Platform Breakdown</h2>
                    
                    {/* Top Platform */}
                    {sortedPlatforms.length > 0 && (
                        <div className="flex justify-center">
                             <Link
                                className="w-full"
                                key={sortedPlatforms[0].id}
                                href={`/web/platform/${sortedPlatforms[0].id}?name=${encodeURIComponent(sortedPlatforms[0].name)}&period=${period}`}
                            >
                                <motion.div whileTap={{ scale: 0.97 }}>
                                    <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 cursor-pointer hover:bg-muted/40 relative">
                                        <Badge
                                            variant="default"
                                            className="absolute top-2 right-2 border-none font-semibold text-xs px-1.5 py-0.5 h-auto bg-yellow-400 text-yellow-900 hover:bg-yellow-400/90"
                                        >
                                            <Crown className="w-3.5 h-3.5" />
                                        </Badge>
                                        <CardContent className="p-4 flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 bg-[#131313] rounded-xl flex items-center justify-center p-2 shrink-0">
                                                <Image src={sortedPlatforms[0].icon} width={40} height={40} alt={`${sortedPlatforms[0].name} logo`} className="filter brightness-0 invert" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-lg">{sortedPlatforms[0].name}</p>
                                                <p className="font-bold text-2xl">{formatCurrency(sortedPlatforms[0].value)}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Link>
                        </div>
                    )}
                    
                    {/* Other Platforms */}
                    {sortedPlatforms.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {sortedPlatforms.slice(1).map((item, index) => {
                                const originalIndex = index + 1;
                                return (
                                    <Link
                                        key={item.id}
                                        href={`/web/platform/${item.id}?name=${encodeURIComponent(item.name)}&period=${period}`}
                                    >
                                    <motion.div whileTap={{ scale: 0.97 }}>
                                        <Card className="rounded-xl border bg-background/40 backdrop-blur-lg border-border/10 cursor-pointer hover:bg-muted/40 relative h-full">
                                        {originalIndex < 3 && (
                                            <Badge
                                                variant="default"
                                                className={cn(
                                                    "absolute top-2 right-2 border-none font-semibold text-xs px-1.5 py-0.5 h-auto",
                                                    originalIndex === 1 && "bg-slate-300 text-slate-800 hover:bg-slate-300/90",
                                                    originalIndex === 2 && "bg-orange-400 text-orange-900 hover:bg-orange-400/90"
                                                )}
                                            >
                                                {originalIndex === 1 ? '2nd' : '3rd'}
                                            </Badge>
                                        )}
                                            <CardContent className="p-4 flex flex-col items-center text-center">
                                                <div className="w-10 h-10 bg-[#131313] rounded-lg flex items-center justify-center mb-1 p-1">
                                                <Image src={item.icon} width={32} height={32} alt={`${item.name} logo`} className="filter brightness-0 invert" />
                                                </div>
                                                <p className="font-semibold text-sm">{item.name}</p>
                                                <p className="font-semibold text-lg">{formatCurrency(item.value)}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Cash Flow Chart */}
                <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                    <CardHeader>
                        <CardTitle>Cash Flow</CardTitle>
                    </CardHeader>
                     <CardContent className="h-[300px] -ml-2">
                         <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer>
                                <LineChart data={cashFlowData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <YAxis
                                        tickFormatter={formatCurrencyForChart}
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <ChartTooltip
                                        cursor={true}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2.5} dot={false} />
                                    <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2.5} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

            </div>

            {/* Right Sidebar Area */}
            <div className="xl:col-span-1 space-y-6">
                
                {/* To-Do List */}
                <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                    <CardHeader>
                        <CardTitle>Action Items</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-4">
                       {todoListData.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <item.icon className={`w-5 h-5 mt-1 flex-shrink-0 ${item.color}`} />
                                <div>
                                    <p className="font-medium text-sm leading-tight">{item.text}</p>
                                    {item.dueDate && <p className="text-xs text-muted-foreground">{item.dueDate}</p>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 {/* P&L Snapshot */}
                    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                        <CardHeader>
                            <CardTitle>P&L Snapshot</CardTitle>
                            <CardDescription>This Month</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Revenue</span> <span>{formatCurrency(pnlSnapshotData.revenue)}</span></div>
                            <div className="flex justify-between"><span>Cost of Goods Sold</span> <span className="text-muted-foreground">{formatCurrency(pnlSnapshotData.cogs)}</span></div>
                            <div className="flex justify-between font-semibold border-t pt-2"><span>Gross Profit</span> <span>{formatCurrency(pnlSnapshotData.grossProfit)}</span></div>
                            <div className="flex justify-between"><span>Operating Expenses</span> <span className="text-muted-foreground">{formatCurrency(pnlSnapshotData.operatingExpenses)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2"><span>Net Profit</span> <span className="text-emerald-500">{formatCurrency(pnlSnapshotData.netProfit)}</span></div>
                        </CardContent>
                    </Card>
            </div>
        </div>
    </>
  );
}
