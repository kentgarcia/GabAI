
'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2, TrendingUp, DollarSign, Percent, BarChartHorizontal, ArrowDown, Users, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// --- Helper Functions ---
const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
const formatCurrencyForChart = (value: number) => value >= 1000 ? `₱${(value / 1000).toFixed(0)}k` : `₱${value}`;

// --- Mock Data ---
const thirtyDaySales = Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    sales: 500 + Math.random() * 1500 + (i * 50),
}));

const mockPlatformData: { [key: string]: any } = {
    shopee: {
        name: 'Shopee',
        icon: '/logo/shopee.svg',
        kpis: { grossRevenue: 28500, netRevenue: 26220, percentageOfTotal: 35, growth: 12.5 },
        topProducts: [
            { name: 'Vintage T-Shirt', sales: 7500 },
            { name: 'Gadget Pro Stand', sales: 5200 },
            { name: 'Organic Coffee Beans', sales: 3800 },
        ],
        feeBreakdown: { transaction: 570, service: 1200, shipping: 510 },
        avgOrderValue: 450,
        refundRate: 1.5,
    },
    lazada: {
        name: 'Lazada',
        icon: '/logo/lazada.svg',
        kpis: { grossRevenue: 18900, netRevenue: 17200, percentageOfTotal: 22, growth: 8.1 },
        topProducts: [
            { name: 'Handmade Leather Wallet', sales: 8100 },
            { name: 'Smart Home Hub', sales: 6300 },
        ],
        feeBreakdown: { transaction: 378, service: 945, shipping: 377 },
        avgOrderValue: 630,
        refundRate: 2.1,
    },
    upwork: {
        name: 'Upwork',
        icon: '/logo/upwork.svg',
        kpis: { grossRevenue: 45000, netRevenue: 36000, percentageOfTotal: 55, growth: -5.2 },
        topClients: [
            { name: 'Innovate Corp.', earnings: 20000 },
            { name: 'Creative Minds Co.', earnings: 15000 },
            { name: 'Tech Solutions Ltd.', earnings: 10000 },
        ],
        projectBreakdown: { 'Fixed-Price': 30000, Hourly: 15000 },
        upcomingMilestones: [
            { project: 'Project Gamma', amount: 5000, dueDate: '2024-08-15' },
            { project: 'Website Revamp', amount: 7500, dueDate: '2024-09-01' },
        ],
    },
    tiktok: {
        name: 'TikTok Shop',
        icon: '/logo/tiktok.svg',
        kpis: { grossRevenue: 9800, netRevenue: 8500, percentageOfTotal: 12, growth: 25.0 },
        topProducts: [
            { name: 'Lip Tint', sales: 2500 },
            { name: 'Phone Case', sales: 1800 },
        ],
        feeBreakdown: { transaction: 196, service: 490, shipping: 614 },
        avgOrderValue: 250,
        refundRate: 3.2,
    },
};

const projectChartConfig: ChartConfig = {
    value: { label: 'Value' },
    "Fixed-Price": { label: "Fixed-Price", color: "hsl(var(--chart-1))" },
    Hourly: { label: "Hourly", color: "hsl(var(--chart-2))" },
}

// --- Dynamic Components ---
const EcommerceSpecifics = ({ data }: { data: any }) => (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Top-Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm">
                    {data.topProducts.map((p: any) => (
                        <li key={p.name} className="flex justify-between">
                            <span className="font-medium">{p.name}</span>
                            <span className="text-muted-foreground">{formatCurrency(p.sales)}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Fees</span>
                    <span className="font-medium">{formatCurrency(data.feeBreakdown.transaction)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fees</span>
                    <span className="font-medium">{formatCurrency(data.feeBreakdown.service)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Fees</span>
                    <span className="font-medium">{formatCurrency(data.feeBreakdown.shipping)}</span>
                </div>
            </CardContent>
        </Card>
    </>
);

const FreelanceSpecifics = ({ data }: { data: any }) => {
    const projectData = Object.entries(data.projectBreakdown).map(([name, value]) => ({ name, value, fill: name === 'Fixed-Price' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))' }));
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Top Clients</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-2 text-sm">
                        {data.topClients.map((c: any) => (
                            <li key={c.name} className="flex justify-between">
                                <span className="font-medium">{c.name}</span>
                                <span className="text-muted-foreground">{formatCurrency(c.earnings)}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Project Type Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[150px]">
                    <ChartContainer config={projectChartConfig} className="w-full h-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie data={projectData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} strokeWidth={2}>
                                    {projectData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                                </Pie>
                                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.upcomingMilestones.map((m: any) => (
                                <TableRow key={m.project}>
                                    <TableCell className="font-medium">{m.project}</TableCell>
                                    <TableCell>{m.dueDate}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(m.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

// --- Main Page Component ---
function PlatformDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const slug = Array.isArray(params.slug) ? params.slug[0] : 'default';
    const data = mockPlatformData[slug] || mockPlatformData.shopee;

    const chartConfig: ChartConfig = {
        sales: { label: "Sales", color: "hsl(var(--primary))" },
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon" className="h-10 w-10">
                    <Link href="/web">
                        <ArrowLeft />
                    </Link>
                </Button>
                <Image src={data.icon} width={40} height={40} alt={`${data.name} logo`} className="p-1 bg-black rounded-lg filter brightness-0 invert" />
                <h1 className="text-3xl font-bold">{data.name} Performance</h1>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Gross Revenue</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{formatCurrency(data.kpis.grossRevenue)}</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Net After Fees</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-emerald-600">{formatCurrency(data.kpis.netRevenue)}</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">% of Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.kpis.percentageOfTotal}%</p></CardContent></Card>
                <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Growth (MoM)</CardTitle></CardHeader><CardContent><p className={cn("text-2xl font-bold", data.kpis.growth > 0 ? "text-emerald-600" : "text-red-600")}>{data.kpis.growth > 0 ? '+' : ''}{data.kpis.growth}%</p></CardContent></Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>30-Day Sales Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] -ml-2">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer>
                            <LineChart data={thirtyDaySales} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                <Tooltip content={<ChartTooltipContent indicator="line" />} />
                                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {slug === 'upwork' ? <FreelanceSpecifics data={data} /> : <EcommerceSpecifics data={data} />}
            </div>
        </div>
    );
}

const LoadingFallback = () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading Platform Data...</p>
    </div>
);

export default function PlatformDetailsPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <PlatformDetailsContent />
        </Suspense>
    );
}
