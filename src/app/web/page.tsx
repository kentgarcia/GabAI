
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  BarChart2,
  Landmark,
  Mailbox,
  CircleHelp,
  SlidersHorizontal,
  Settings,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Package,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from "recharts";


// --- Mock Data ---
const mainKpiData = {
    netProfit: 23337,
    grossIncome: 45231,
    totalExpenses: 21894
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
  useEffect(() => {
    document.body.classList.add('web-view');
    return () => {
      document.body.classList.remove('web-view');
    };
  }, []);


  return (
    <SidebarProvider defaultOpen={false}>
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                 <h2 className="text-xl font-bold p-2 group-data-[collapsible=icon]:hidden">GabAI</h2>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Home" isActive>
                            <Home />
                            <span>Home</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Analytics">
                            <BarChart2 />
                            <span>Analytics</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Banking">
                            <Landmark />
                            <span>Banking</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Messages">
                            <Mailbox />
                            <span>Messages</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Help">
                            <CircleHelp />
                            <span>Help Center</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Configuration">
                            <SlidersHorizontal />
                            <span>Configuration</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                             <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset className="p-8 bg-transparent text-foreground">
             <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, James! Here's what's happening with your business.</p>
                </div>
                <div className="flex items-center gap-2">
                     <Button variant="outline" className="bg-background/50 rounded-full">This Month</Button>
                    <Avatar>
                        <AvatarImage src="https://avatar.iran.liara.run/public/25" />
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
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
                            <div className="text-3xl font-bold text-emerald-500">{formatCurrency(mainKpiData.netProfit)}</div>
                          </CardContent>
                        </Card>
                         <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Gross Income</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(mainKpiData.grossIncome)}</div>
                          </CardContent>
                        </Card>
                         <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{formatCurrency(mainKpiData.totalExpenses)}</div>
                          </CardContent>
                        </Card>
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

                    {/* P&L and Expense Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* P&L Snapshot */}
                        <Card className="lg:col-span-2 bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
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

                        {/* Expense Breakdown */}
                        <Card className="lg:col-span-3 bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                           <CardHeader>
                                <CardTitle>Expense Breakdown</CardTitle>
                                <CardDescription>This Month</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[200px]">
                                 <ChartContainer config={chartConfig} className="w-full h-full">
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel />}
                                            />
                                            <Pie data={expenseBreakdownData} dataKey="value" nameKey="name" innerRadius="60%" strokeWidth={5}>
                                                {expenseBreakdownData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <ChartLegend
                                                content={<ChartLegendContent nameKey="name" />}
                                                layout="vertical"
                                                align="right"
                                                verticalAlign="middle"
                                                wrapperStyle={{ right: 0 }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Sidebar Area */}
                <div className="xl:col-span-1 space-y-6">
                    {/* Top Performers */}
                    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                        <CardHeader>
                            <CardTitle>Top Performers</CardTitle>
                            <CardDescription>This Month</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {topPerformersData.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.name}</p>
                                    </div>
                                    <p className="font-semibold text-sm">{item.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
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
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
