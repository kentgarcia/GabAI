
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bot, Gift, Home, Trophy, FileText, Landmark, BarChart3, ScrollText,
  ChevronRight, Calendar as CalendarIcon, ShoppingCart, Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { motion } from 'framer-motion';

const reportOptions = [
  {
    icon: FileText,
    title: 'Profit & Loss Statement (P&L)',
    description: 'Your official income, expenses, and net profit. Perfect for business check-ups and loan applications.',
    href: '#',
  },
  {
    icon: Landmark,
    title: 'Tax Data Summary',
    description: 'A summary of your gross income and tax-deductible expenses to help you with BIR filings.',
    href: '#',
  },
  {
    icon: BarChart3,
    title: 'Sales Report',
    description: "Breakdown of sales by product or platform to see what's selling best.",
    href: '#',
  },
  {
    icon: ScrollText,
    title: 'Receipt & Invoice History',
    description: "View, resend, or download all the official receipts you've created.",
    href: '#',
  },
];

const chartData = [
  { month: "Jan", income: 18600, expenses: 8000 },
  { month: "Feb", income: 30500, expenses: 20000 },
  { month: "Mar", income: 23700, expenses: 12000 },
  { month: "Apr", income: 17300, expenses: 19000 },
  { month: "May", income: 20900, expenses: 13000 },
  { month: "Jun", income: 21400, expenses: 14000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const topChannels = [
    { name: 'Shopee', value: '₱45,231', icon: ShoppingCart },
    { name: 'Lazada', value: '₱31,842', icon: ShoppingCart },
    { name: 'Client Project Alpha', value: '₱25,000', icon: Briefcase },
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

const formatCurrencyForChart = (value: number) => {
  if (value >= 1000) {
    return `₱${(value / 1000).toFixed(0)}k`;
  }
  return `₱${value}`;
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('This Quarter');

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 px-4 py-8 space-y-6 overflow-y-auto no-scrollbar pb-28">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">Reports & Insights</h1>
            </motion.div>

            <Tabs defaultValue="insights" className="w-full">
                <motion.div variants={itemVariants} className="flex justify-between items-center mb-4">
                    <TabsList className="bg-muted/60 p-1.5 rounded-full backdrop-blur-lg">
                        <TabsTrigger value="insights" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Insights</TabsTrigger>
                        <TabsTrigger value="generate" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Generate</TabsTrigger>
                    </TabsList>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-full flex items-center gap-2 text-sm h-9">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{dateRange}</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        {['This Month', 'This Quarter', 'Last Month', 'Year to Date', 'All Time'].map(range => (
                            <DropdownMenuItem key={range} onSelect={() => setDateRange(range)}>
                            {range}
                            </DropdownMenuItem>
                        ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </motion.div>

                <TabsContent value="insights" className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Income vs Expenses</CardTitle>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] -ml-2">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
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
                                                cursor={false}
                                                content={<ChartTooltipContent indicator="dot" />}
                                            />
                                            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                                            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Top Earning Channels</CardTitle>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {topChannels.map((channel, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                            <channel.icon className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{channel.name}</p>
                                        </div>
                                        <p className="font-semibold text-lg">{channel.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="generate">
                    <motion.div variants={itemVariants} className="space-y-4">
                    {reportOptions.map((option) => (
                        <Link href={option.href} key={option.title}>
                        <motion.div whileTap={{ scale: 0.98 }}>
                            <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 transition-colors hover:bg-muted/40">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                                <option.icon className="w-6 h-6 text-foreground" />
                                </div>
                                <div className="flex-grow">
                                <p className="font-semibold">{option.title}</p>
                                <p className="text-sm text-muted-foreground">{option.description}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            </CardContent>
                            </Card>
                        </motion.div>
                        </Link>
                    ))}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-black rounded-full h-14 flex justify-around items-center shadow-lg">
          <Link href="/dashboard" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="/reports" className="flex flex-col items-center text-primary hover:text-primary/90 transition-colors">
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
