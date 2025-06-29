
'use client';

import * as React from 'react';
import { addDays, format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Area, Bar, CartesianGrid, ComposedChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';
import {
    Download, Mail as MailIcon, Printer, Sparkles, SlidersHorizontal, BarChart, FileText, Landmark, ScrollText,
    Calendar as CalendarIcon
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
    Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';
import {
    ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig, ChartLegend, ChartLegendContent,
} from "@/components/ui/chart";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// MOCK DATA & CONFIG
// ===================================
const transactionsData = [
  { id: '1', date: '2024-06-15', description: 'Product Sale - Shopee', category: 'Product Sales', amount: 1250.00, type: 'income', status: 'Completed' },
  { id: '2', date: '2024-06-14', description: 'Canva Subscription', category: 'Software', amount: -750.00, type: 'expense', status: 'Completed' },
  { id: '3', date: '2024-06-14', description: 'Client Payment - Project X', category: 'Service Fees', amount: 20000.00, type: 'income', status: 'Completed' },
  { id: '4', date: '2024-06-12', description: 'Facebook Ads', category: 'Marketing', amount: -3500.00, type: 'expense', status: 'Completed' },
  { id: '5', date: '2024-06-10', description: 'Product Sale - Lazada', category: 'Product Sales', amount: 899.50, type: 'income', status: 'Completed' },
  { id: '6', date: '2024-06-08', description: 'Shipping Supplies', category: 'Cost of Goods Sold', amount: -1500.00, type: 'expense', status: 'Completed' },
];

const cashFlowData = [
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

const expenseBreakdownData = [
  { name: 'Marketing', value: 3500, fill: 'hsl(var(--chart-1))' },
  { name: 'Cost of Goods Sold', value: 1500, fill: 'hsl(var(--chart-2))' },
  { name: 'Software', value: 750, fill: 'hsl(var(--chart-3))' },
];

const incomeBreakdownData = [
  { name: 'Service Fees', value: 20000, fill: 'hsl(var(--chart-5))' },
  { name: 'Product Sales', value: 2149.50, fill: 'hsl(var(--chart-4))' },
];

const cashProjectionData = [
    { name: 'July', value: 45000 },
    { name: 'August', value: 62000 },
    { name: 'September', value: 85000 },
];

const inventoryData = [
    { product: 'Product A', stock: 150, velocity: '10/wk', stockOut: 'in 15 weeks' },
    { product: 'Product B', stock: 20, velocity: '8/wk', stockOut: 'in 2.5 weeks', status: 'Reorder Soon' },
    { product: 'Product C', stock: 5, velocity: '4/wk', stockOut: 'in 1 week', status: 'Urgent' },
];

const chartConfig: ChartConfig = {
  income: { label: "Income", color: "hsl(var(--chart-2))" },
  expenses: { label: "Expenses", color: "hsl(var(--destructive))" },
  actual: { label: "Actual", color: "hsl(var(--primary))" },
  predicted: { label: "Predicted", color: "hsl(var(--primary))" },
  confidence: { label: "Confidence", color: "hsl(var(--primary) / 0.1)" },
  Marketing: { label: "Marketing", color: "hsl(var(--chart-1))" },
  'Cost of Goods Sold': { label: "COGS", color: "hsl(var(--chart-2))" },
  Software: { label: "Software", color: "hsl(var(--chart-3))" },
  'Service Fees': { label: "Service Fees", color: "hsl(var(--chart-5))" },
  'Product Sales': { label: "Product Sales", color: "hsl(var(--chart-4))" },
};

const reportTemplates = [
    { name: 'Profit & Loss Statement', icon: FileText },
    { name: 'Balance Sheet', icon: Landmark, isNew: true },
    { name: 'Cash Flow Statement', icon: BarChart },
    { name: 'Full Tax & Contributions Summary', icon: Sparkles, isPro: true },
    { name: 'Detailed Sales Report', icon: ScrollText },
    { name: 'Custom Report Builder', icon: SlidersHorizontal, isPro: true },
];

// HELPER FUNCTIONS
// ===================================
const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
const formatCurrencyForChart = (value: number) => value >= 1000 ? `₱${(value / 1000).toFixed(0)}k` : `₱${value}`;


// MAIN COMPONENT
// ===================================
export default function WebReportsPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({ from: new Date(2024, 5, 1), to: addDays(new Date(2024, 5, 1), 30) });
    const [selectedReport, setSelectedReport] = React.useState('Profit & Loss Statement');
    
    // In a real app, this would come from a global context or props
    const isProUser = true; 
    
    const PnlPreview = () => (
        <div>
            <div className="flex justify-end gap-2 mb-4">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Download className="mr-2" /> Download</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>PDF</DropdownMenuItem>
                        <DropdownMenuItem>CSV</DropdownMenuItem>
                        <DropdownMenuItem>Excel</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline"><Printer className="mr-2" /> Print</Button>
                <Button variant="outline"><MailIcon className="mr-2" /> Email</Button>
            </div>
            <div className="bg-white p-6 text-black rounded-lg shadow-sm">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold">Your Business Name</h2>
                    <p className="text-lg font-semibold">Profit and Loss Statement</p>
                    <p className="text-sm text-gray-500">For the period of June 1, 2024 to July 1, 2024</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold border-b pb-1 mb-2">Revenue</h3>
                        <div className="flex justify-between"><span>Total Revenue</span><span>{formatCurrency(22149.50)}</span></div>
                    </div>
                     <div>
                        <h3 className="font-bold border-b pb-1 mb-2">Cost of Goods Sold</h3>
                        <div className="flex justify-between"><span>Total COGS</span><span>{formatCurrency(1500)}</span></div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-y py-2">
                        <span>Gross Profit</span>
                        <span>{formatCurrency(20649.5)}</span>
                    </div>
                     <div>
                        <h3 className="font-bold border-b pb-1 mb-2">Operating Expenses</h3>
                        <div className="flex justify-between"><span>Total Operating Expenses</span><span>{formatCurrency(4250)}</span></div>
                    </div>
                    <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-2">
                        <span>Net Profit</span>
                        <span>{formatCurrency(16399.5)}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold">Reports & Insights</h1>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant="outline"
                                className={cn(
                                    "w-[260px] justify-start text-left font-normal bg-background/50",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <Tabs defaultValue="insights" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="forecast">Forecast <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">✨ Pro</Badge></TabsTrigger>
                    <TabsTrigger value="generate">Generate</TabsTrigger>
                </TabsList>

                {/* INSIGHTS TAB */}
                <TabsContent value="insights" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Income vs. Expense Trend</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px] pr-6">
                            <ChartContainer config={chartConfig} className="w-full h-full">
                                <LineChart data={cashFlowData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2.5} dot={false} />
                                    <Line type="monotone" dataKey="expenses" stroke="var(--color-expenses)" strokeWidth={2.5} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Expense Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px]">
                                 <ChartContainer config={chartConfig} className="w-full h-full">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                        <Pie data={expenseBreakdownData} dataKey="value" nameKey="name" innerRadius="50%" strokeWidth={2}>
                                            {expenseBreakdownData.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                                        </Pie>
                                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                                    </PieChart>
                                 </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Income Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px]">
                                 <ChartContainer config={chartConfig} className="w-full h-full">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                        <Pie data={incomeBreakdownData} dataKey="value" nameKey="name" innerRadius="50%" strokeWidth={2}>
                                            {incomeBreakdownData.map(entry => <Cell key={entry.name} fill={entry.fill} />)}
                                        </Pie>
                                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                                    </PieChart>
                                 </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>All Transactions</CardTitle>
                            <CardDescription>Transactions within the selected date range. Click a chart segment to filter.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactionsData.map(tx => (
                                        <TableRow key={tx.id}>
                                            <TableCell>{tx.date}</TableCell>
                                            <TableCell className="font-medium">{tx.description}</TableCell>
                                            <TableCell><Badge variant="outline">{tx.category}</Badge></TableCell>
                                            <TableCell className={`text-right font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {formatCurrency(tx.amount)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* FORECAST TAB */}
                <TabsContent value="forecast" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Revenue Forecast</CardTitle>
                            <CardDescription>Your projected income for the next 3 months.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px] pr-6">
                            <ChartContainer config={chartConfig}>
                                <ComposedChart data={forecastChartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                    <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Area type="monotone" dataKey="confidence" fill="var(--color-confidence)" stroke="none" />
                                    <Line dataKey="actual" type="monotone" stroke="var(--color-actual)" strokeWidth={2} dot={true} />
                                    <Line dataKey="predicted" type="monotone" stroke="var(--color-predicted)" strokeWidth={2} strokeDasharray="5 5" dot={true} />
                                </ComposedChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cash Flow Projection</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px]">
                                <ChartContainer config={{ value: {label: 'Balance'} }}>
                                     <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={cashProjectionData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis dataKey="name" />
                                            <YAxis tickFormatter={formatCurrencyForChart} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="value" fill="var(--color-income)" radius={4} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Smart Inventory Planner</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {inventoryData.map(item => (
                                    <div key={item.product} className="grid grid-cols-3 items-center text-sm gap-2">
                                        <p className="font-medium truncate">{item.product}</p>
                                        <p className="text-muted-foreground">{item.velocity}</p>
                                        <p className={`font-semibold text-right ${item.status === 'Urgent' ? 'text-red-500' : item.status === 'Reorder Soon' ? 'text-yellow-600' : ''}`}>{item.stockOut}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>What If? Scenario</CardTitle>
                            <CardDescription>See how changes might affect your forecast.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-4">
                             <div>
                                <Label>Marketing Spend Increase</Label>
                                <Slider defaultValue={[10]} max={100} step={5} />
                             </div>
                            <p className="text-sm text-center text-muted-foreground">Adjusting marketing spend by <strong>+10%</strong> may increase your Q3 revenue forecast by <strong>~{formatCurrency(3200)}</strong>.</p>
                         </CardContent>
                     </Card>
                </TabsContent>
                
                {/* GENERATE TAB */}
                <TabsContent value="generate">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="md:col-span-1">
                         <Card>
                           <CardHeader>
                             <CardTitle>Document Center</CardTitle>
                           </CardHeader>
                           <CardContent className="flex flex-col gap-2">
                             {reportTemplates.map(template => (
                                 <Button
                                    key={template.name}
                                    variant={selectedReport === template.name ? "default" : "ghost"}
                                    className="justify-start gap-2"
                                    onClick={() => setSelectedReport(template.name)}
                                    disabled={template.isPro && !isProUser}
                                 >
                                    <template.icon className="w-4 h-4" />
                                    <span>{template.name}</span>
                                    {template.isPro && <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">✨ Pro</Badge>}
                                    {template.isNew && <Badge variant="secondary" className="ml-auto">New</Badge>}
                                 </Button>
                             ))}
                           </CardContent>
                         </Card>
                       </div>
                       <div className="md:col-span-2">
                            <Card>
                                 <CardHeader>
                                    <CardTitle>Configuration & Preview</CardTitle>
                                    <CardDescription>Configure and preview your '{selectedReport}'.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 p-4 border rounded-lg mb-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Date Range</Label>
                                                <Select defaultValue="last-quarter">
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="last-quarter">Last Quarter</SelectItem>
                                                        <SelectItem value="last-month">Last Month</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Compare to</Label>
                                                <Select defaultValue="none">
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="none">None</SelectItem>
                                                        <SelectItem value="prev-quarter">Previous Quarter</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Accounting Basis</Label>
                                            <Select defaultValue="cash">
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="accrual">Accrual</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button className="w-full">Run Report</Button>
                                    </div>
                                    <PnlPreview />
                                </CardContent>
                            </Card>
                       </div>
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
