
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bot, Gift, Home, Trophy, FileText, Landmark, BarChart3, ScrollText,
  ChevronRight, Calendar as CalendarIcon, ShoppingCart, Briefcase, DollarSign, Package
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from "recharts";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const reportOptions = [
  {
    icon: FileText,
    title: 'Profit & Loss Statement (P&L)',
    description: 'For business health checks & loan applications.',
    href: '/reports/generate/pnl',
  },
  {
    icon: Landmark,
    title: 'Tax Data Summary',
    description: 'To help with BIR filings.',
    href: '/reports/generate/tax-summary',
  },
  {
    icon: BarChart3,
    title: 'Sales Report',
    description: 'Breakdown of all sales (for Sellers).',
    href: '/reports/generate/sales',
  },
  {
    icon: ScrollText,
    title: 'Receipt & Invoice History',
    description: 'A central archive of all generated receipts.',
    href: '/reports/history/receipts',
  },
];

const lineChartData = [
  { month: "Jan", income: 18600, expenses: 8000 },
  { month: "Feb", income: 30500, expenses: 20000 },
  { month: "Mar", income: 23700, expenses: 12000 },
  { month: "Apr", income: 17300, expenses: 19000 },
  { month: "May", income: 20900, expenses: 13000 },
  { month: "Jun", income: 21400, expenses: 14000 },
];

const donutData = [
  { name: 'Product Costs', value: 400, fill: 'var(--color-productCosts)' },
  { name: 'Marketing', value: 300, fill: 'var(--color-marketing)' },
  { name: 'Fees', value: 200, fill: 'var(--color-fees)' },
  { name: 'Other', value: 278, fill: 'var(--color-other)' },
];

const chartConfig = {
  income: { label: "Income", color: "hsl(var(--chart-2))" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
  productCosts: { label: "Product Costs", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  fees: { label: "Fees", color: "hsl(var(--chart-3))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const topPerformers = [
    { name: 'Gadget Pro Stand', value: '₱25,120', icon: Package },
    { name: 'Digital Art Commission', value: '₱15,500', icon: Briefcase },
    { name: 'Vintage T-Shirt', value: '₱8,942', icon: ShoppingCart },
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
                      <h2 className="text-lg font-semibold mb-2">Performance for {dateRange}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">₱45,231</div>
                          </CardContent>
                        </Card>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">₱21,894</div>
                          </CardContent>
                        </Card>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-emerald-500">₱23,337</div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Cash Flow Trend</CardTitle>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] -ml-2">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <LineChart data={lineChartData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
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
                                            <Legend content={<ChartLegendContent />} />
                                            <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2.5} dot={false} />
                                            <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2.5} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Where Your Money Went</CardTitle>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] flex items-center justify-center">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <ChartTooltip
                                                content={<ChartTooltipContent nameKey="name" hideLabel />}
                                            />
                                            <Pie
                                                data={donutData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={2}
                                                strokeWidth={5}
                                            >
                                            {donutData.map((entry) => (
                                                    <Cell key={entry.name} fill={entry.fill} />
                                            ))}
                                            </Pie>
                                            <Legend
                                                content={<ChartLegendContent nameKey="name" className="flex-wrap" />}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Top Performers</CardTitle>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {topPerformers.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                            <item.icon className="w-5 h-5 text-primary-foreground" />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.name}</p>
                                        </div>
                                        <p className="font-semibold text-lg">{item.value}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="generate">
                    <motion.div variants={itemVariants} className="space-y-4">
                      <h2 className="text-lg font-semibold">Create a Document</h2>
                      {reportOptions.map((option) => (
                          <Link href={option.href} key={option.title}>
                          <motion.div whileTap={{ scale: 0.98 }}>
                              <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 transition-colors hover:bg-muted/40">
                              <CardContent className="p-4 flex items-center gap-4">
                                  <div className="w-12 h-12 bg-[#131313] rounded-xl flex items-center justify-center flex-shrink-0">
                                  <option.icon className="w-6 h-6 text-primary-foreground" />
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
          <Link href="/chat" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bot className="w-5 h-5 text-primary-foreground" />
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
