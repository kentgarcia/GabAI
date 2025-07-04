
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Landmark, BarChart3, ScrollText,
  ChevronRight, Calendar as CalendarIcon, ShoppingCart, Briefcase, DollarSign, Package, FileText, Lightbulb, Sparkles, TrendingUp, AlertTriangle, FileDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
import { Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell, ComposedChart, Area, Bar, BarChart } from "recharts";
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';


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

const comparisonCashFlowData = lineChartData.map(d => ({
    ...d,
    prev_income: d.income * (0.8 + Math.random() * 0.3),
    prev_expenses: d.expenses * (0.9 + Math.random() * 0.4)
}));

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

const cashProjectionData = [
    { name: 'July', value: 45000 },
    { name: 'August', value: 62000 },
    { name: 'September', value: 25000 }, // Intentionally low for alert
];

const inventoryData = [
    { name: 'Product A', stock: 150, avgSales: 10, status: 'Healthy' },
    { name: 'Product B', stock: 8, avgSales: 5, status: 'Reorder Soon' },
    { name: 'Product C', stock: 2, avgSales: 3, status: 'URGENT: Restock Now!' },
];

const donutData = [
  { name: 'Product Costs', value: 400, fill: 'var(--color-productCosts)' },
  { name: 'Marketing', value: 300, fill: 'var(--color-marketing)' },
  { name: 'Fees', value: 200, fill: 'var(--color-fees)' },
  { name: 'Other', value: 278, fill: 'var(--color-other)' },
];

const chartConfig: ChartConfig = {
  income: { label: "Income", color: "hsl(var(--chart-2))" },
  prev_income: { label: "Previous Income", color: "hsla(var(--chart-2-hsl), 0.5)" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
  prev_expenses: { label: "Previous Expenses", color: "hsla(var(--destructive-hsl), 0.5)" },
  productCosts: { label: "Product Costs", color: "hsl(var(--chart-1))" },
  marketing: { label: "Marketing", color: "hsl(var(--chart-2))" },
  fees: { label: "Fees", color: "hsl(var(--chart-3))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
  predicted: { label: "Predicted", color: "hsl(var(--primary))" },
  confidence: { label: "Confidence", color: "hsl(var(--primary) / 0.1)" },
} satisfies ChartConfig;

const platformPerformanceData = [
    { name: 'Upwork', income: 20000.00, margin: 80.5, icon: Briefcase },
    { name: 'Shopee', income: 1250.00, margin: 65.2, icon: ShoppingCart },
    { name: 'Lazada', income: 899.50, margin: 55.8, icon: ShoppingCart },
];

const clientPerformanceData = [
    { name: 'Innovate Corp.', income: 15000.00 },
    { name: 'Creative Minds Co.', income: 5000.00 },
    { name: 'Tech Solutions Ltd.', income: 2500.00 },
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

const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);

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
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('This Quarter');
  const [activeTab, setActiveTab] = useState('analyze');
  const [compare, setCompare] = useState(false);

  const hasLowCashProjection = cashProjectionData.some(d => d.value < 30000);

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
                            <div className="text-2xl font-bold">{formatCurrency(45231)}</div>
                            <p className="text-xs text-emerald-500">+15.2% from last quarter</p>
                          </CardContent>
                        </Card>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(21894)}</div>
                             <p className="text-xs text-emerald-500">-5.8% from last quarter</p>
                          </CardContent>
                        </Card>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(23337)}</div>
                             <p className="text-xs text-emerald-500">+25.4% from last quarter</p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Cash Flow Trend</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor="compare-mode" className="text-xs">Compare</Label>
                                        <Switch id="compare-mode" checked={compare} onCheckedChange={setCompare} />
                                    </div>
                                </div>
                                <CardDescription>{dateRange}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[250px] -ml-2">
                            {compare ? (
                                <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <BarChart data={comparisonCashFlowData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }}/>
                                            <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }}/>
                                            <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                                            <ChartLegend content={<ChartLegendContent />} />
                                            <Bar dataKey="income" name="Income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="prev_income" name="Previous Income" fill="hsla(160, 60%, 45%, 0.5)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            ) : (
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
                            )}
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
                                <div className="flex justify-between items-center">
                                    <CardTitle>Platform Performance</CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-8">Sort by: Income</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Income</DropdownMenuItem>
                                            <DropdownMenuItem>Profit Margin</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <CardDescription>Your top income sources from connected channels.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Platform</TableHead>
                                            <TableHead className="text-right">Income</TableHead>
                                            <TableHead className="text-right">Margin</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {platformPerformanceData.map((p) => (
                                            <TableRow key={p.name}>
                                                <TableCell className="font-medium flex items-center gap-2">
                                                    <div className="p-1 bg-muted rounded-md"><p.icon className="w-4 h-4 text-muted-foreground" /></div>
                                                    {p.name}
                                                </TableCell>
                                                <TableCell className="text-right">{formatCurrency(p.income)}</TableCell>
                                                <TableCell className="text-right text-emerald-600">{p.margin.toFixed(1)}%</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Top Client Performance</CardTitle>
                                <CardDescription>Your most valuable clients for this period.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Client Name</TableHead>
                                            <TableHead className="text-right">Total Billed</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clientPerformanceData.map((c) => (
                                            <TableRow key={c.name}>
                                                <TableCell className="font-medium">{c.name}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(c.income)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
                
                 <TabsContent value="forecast" className="space-y-6">
                    <motion.div variants={itemVariants}>
                         <Card className="rounded-2xl mb-4 border bg-background/40 backdrop-blur-lg border-border/10">
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
                         <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-2xl -mt-1">
                            <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <p><span className="font-semibold text-foreground/80">Gabi's Insight:</span> The predicted dip in July is consistent with your past two years of data. Don't worry, sales usually pick up again in August.</p>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                            <CardHeader>
                                <CardTitle>Cash Flow Projection</CardTitle>
                                <CardDescription>Your estimated cash balance for the next 3 months.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[200px]">
                                <ChartContainer config={{ value: {label: 'Balance'} }}>
                                    <BarChart data={cashProjectionData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={formatCurrencyForChart} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="value" fill="var(--color-income)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        {hasLowCashProjection && (
                             <div className="flex items-start justify-center gap-3 text-sm text-yellow-600 bg-yellow-500/10 p-3 rounded-2xl mt-2">
                                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p><span className="font-semibold text-yellow-700">Cash Buffer Alert:</span> Your cash balance is projected to fall below your ₱30,000 safety net in September. Consider moving some funds or delaying a large expense.</p>
                            </div>
                        )}
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
                    <motion.div variants={itemVariants} className="space-y-6">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Create a Document</h2>
                        <div className="space-y-2">
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
                        </div>
                      </div>
                      
                      <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                          <CardHeader>
                            <CardTitle>Receipts at a Glance</CardTitle>
                            <CardDescription>A summary of your recent invoice statuses.</CardDescription>
                          </CardHeader>
                          <CardContent className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold">2</p>
                                <p className="text-sm text-muted-foreground">Sent</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-red-500">1</p>
                                <p className="text-sm text-muted-foreground">Overdue</p>
                            </div>
                             <div>
                                <p className="text-2xl font-bold text-emerald-500">5</p>
                                <p className="text-sm text-muted-foreground">Paid (30d)</p>
                            </div>
                          </CardContent>
                          <CardFooter>
                               <Button asChild variant="link" className="w-full">
                                   <Link href="/reports/history/receipts">View Full History</Link>
                               </Button>
                          </CardFooter>
                      </Card>

                      <Button 
                        variant="outline" 
                        className="w-full h-14 text-base rounded-full" 
                        onClick={() => toast({ title: 'Coming Soon!', description: 'This feature is under development.' })}
                      >
                         <FileDown className="mr-2" />
                         Download All as .zip
                      </Button>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </motion.div>
      </main>

      <AppFooter />
    </div>
  );
}
