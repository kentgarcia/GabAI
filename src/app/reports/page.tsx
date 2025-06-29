
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Landmark, BarChart3, ScrollText,
  ChevronRight, Calendar as CalendarIcon, ShoppingCart, Briefcase, DollarSign, Package, FileText, Lightbulb, Sparkles, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell, ComposedChart, Area } from "recharts";
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
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
    title: 'Full Tax & Contributions Summary',
    description: 'A comprehensive summary for BIR filings & contributions.',
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

const forecastChartData = [
  { month: 'Jan', actual: 18600 },
  { month: 'Feb', actual: 30500 },
  { month: 'Mar', actual: 23700 },
  { month: 'Apr', actual: 17300 },
  { month: 'May', actual: 20900 },
  { month: 'Jun', actual: 21400 },
  { month: 'Jul', predicted: 21400 }, // Anchor point
  { month: 'Aug', predicted: 25000, confidence: [22000, 28000] },
  { month: 'Sep', predicted: 28000, confidence: [25000, 31000] },
  { month: 'Oct', predicted: 32000, confidence: [28000, 36000] },
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
  actual: { label: "Actual", color: "hsl(var(--primary))" },
  predicted: { label: "Predicted", color: "hsl(var(--primary))" },
  confidence: { label: "Confidence", color: "hsl(var(--primary) / 0.1)" },
} satisfies ChartConfig;

const topPerformers = [
    { name: 'Gadget Pro Stand', value: '₱25,120', icon: Package },
    { name: 'Digital Art Commission', value: '₱15,500', icon: Briefcase },
    { name: 'Vintage T-Shirt', value: '₱8,942', icon: ShoppingCart },
];

const inventoryData = [
    { name: 'Product A', stock: 150, avgSales: 10, status: 'Healthy' },
    { name: 'Product B', stock: 8, avgSales: 5, status: 'Reorder Soon' },
    { name: 'Product C', stock: 2, avgSales: 3, status: 'URGENT: Restock Now!' },
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

const InventoryStatusBadge = ({ status }: { status: string }) => {
    const baseClasses = "font-semibold";
    switch (status) {
        case 'Healthy':
            return <p className={cn(baseClasses, "text-emerald-500")}>{status}</p>;
        case 'Reorder Soon':
            return <p className={cn(baseClasses, "text-yellow-500")}>⚠️ {status}</p>;
        case 'URGENT: Restock Now!':
            return <p className={cn(baseClasses, "text-red-500")}>🚨 {status}</p>;
        default:
            return <p className={baseClasses}>{status}</p>;
    }
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('This Quarter');
  const [activeTab, setActiveTab] = useState('analyze');

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
                <AppHeader userName="Juan dela Cruz" />
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">Reports & Insights</h1>
            </motion.div>

            <Tabs defaultValue="analyze" className="w-full" onValueChange={setActiveTab}>
                <motion.div variants={itemVariants} className="mb-4">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1.5 rounded-full backdrop-blur-lg">
                        <TabsTrigger value="analyze" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Analyze</TabsTrigger>
                        <TabsTrigger value="forecast" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">
                            Forecast
                        </TabsTrigger>
                        <TabsTrigger value="generate" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">Generate</TabsTrigger>
                    </TabsList>
                </motion.div>

                {activeTab !== 'generate' && (
                    <motion.div variants={itemVariants} className="flex justify-end mb-4">
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
                )}


                <TabsContent value="analyze" className="space-y-6">
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
                
                 <TabsContent value="forecast" className="space-y-6">
                    <motion.div variants={itemVariants}>
                         <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Your Next 3 Months' Outlook</CardTitle>
                                <CardDescription>AI-powered revenue forecast</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] -ml-2">
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                       <ComposedChart data={forecastChartData} margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                            <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                                            <ChartLegend content={<ChartLegendContent />} />
                                            <Area type="monotone" dataKey="confidence" fill="var(--color-confidence)" stroke="none" />
                                            <Line dataKey="actual" type="monotone" stroke="var(--color-actual)" strokeWidth={2.5} dot={true} />
                                            <Line dataKey="predicted" type="monotone" stroke="var(--color-predicted)" strokeWidth={2.5} strokeDasharray="5 5" dot={true} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                         </Card>
                         <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-b-2xl -mt-1">
                            <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p><span className="font-semibold text-foreground/80">Gabi's Insight:</span> The predicted dip in July is consistent with your past two years of data. Don't worry, sales usually pick up again in August.</p>
                        </div>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Inventory Health</CardTitle>
                                <CardDescription>For your top-selling products</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               {inventoryData.map((item, index) => (
                                    <div key={index} className="grid grid-cols-3 items-center gap-3 text-sm">
                                        <p className="font-semibold col-span-1 truncate">{item.name}</p>
                                        <div className="col-span-1 text-center">
                                            <p className="font-medium">{item.stock} units</p>
                                            <p className="text-xs text-muted-foreground">Sells ~{item.avgSales}/wk</p>
                                        </div>
                                        <div className="col-span-1 text-right">
                                            <InventoryStatusBadge status={item.status} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                <TabsContent value="generate">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <h2 className="text-lg font-semibold mb-2">Create a Document</h2>
                      {reportOptions.map((option) => (
                          <Link href={option.href} key={option.title}>
                          <motion.div whileTap={{ scale: 0.98 }}>
                              <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 transition-colors hover:bg-muted/40">
                              <CardContent className="p-4 flex items-center gap-4">
                                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
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

      <AppFooter />
    </div>
  );
}
