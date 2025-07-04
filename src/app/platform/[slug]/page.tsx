
'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Loader2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { AppFooter } from '@/components/layout/AppFooter';
import { cn } from '@/lib/utils';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
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
        ],
        projectBreakdown: { 'Fixed-Price': 30000, Hourly: 15000 },
        upcomingMilestones: [
            { project: 'Project Gamma', amount: 5000, dueDate: '2024-08-15' },
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


const KpiCard = ({ title, value, growth, isCurrency = true }: { title: string, value: number, growth?: number, isCurrency?: boolean }) => (
    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{isCurrency ? formatCurrency(value) : `${value}%`}</p>
            {growth && (
                 <p className={cn("text-xs text-muted-foreground flex items-center", growth > 0 ? "text-emerald-500" : "text-red-500")}>
                    <TrendingUp className={cn("w-3 h-3 mr-1", growth < 0 && "rotate-180")} />
                    {growth > 0 ? '+' : ''}{growth}% MoM
                </p>
            )}
        </CardContent>
    </Card>
);

// --- Dynamic Components ---
const EcommerceSpecifics = ({ data }: { data: any }) => (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Top-Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    {data.topProducts.map((p: any, i: number) => (
                        <li key={p.name} className="flex justify-between items-center">
                            <span className="font-medium">{i + 1}. {p.name}</span>
                            <span className="font-semibold">{formatCurrency(p.sales)}</span>
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
         <div className="grid grid-cols-2 gap-4">
            <Card><CardHeader className="pb-1"><CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle></CardHeader><CardContent><p className="text-xl font-bold">{formatCurrency(data.avgOrderValue)}</p></CardContent></Card>
            <Card><CardHeader className="pb-1"><CardTitle className="text-sm font-medium">Refund Rate</CardTitle></CardHeader><CardContent><p className="text-xl font-bold">{data.refundRate}%</p></CardContent></Card>
        </div>
    </>
);

const FreelanceSpecifics = ({ data }: { data: any }) => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Top Clients</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3 text-sm">
                        {data.topClients.map((c: any, i: number) => (
                            <li key={c.name} className="flex justify-between items-center">
                                <span className="font-medium">{i + 1}. {c.name}</span>
                                <span className="font-semibold">{formatCurrency(c.earnings)}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                 <CardContent>
                    <Table>
                        <TableBody>
                            {data.upcomingMilestones.map((m: any) => (
                                <TableRow key={m.project} className="border-b-0">
                                    <TableCell className="font-medium p-1">{m.project}</TableCell>
                                    <TableCell className="p-1 text-right">{formatCurrency(m.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

function PlatformDetailsContent() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : 'default';
  const data = mockPlatformData[slug] || mockPlatformData.shopee;

  const chartConfig: ChartConfig = {
    sales: { label: "Sales", color: "hsl(var(--primary))" },
  };

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.header variants={itemVariants} className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
              <Link href="/dashboard">
                <ArrowLeft />
              </Link>
            </Button>
             <Image src={data.icon} width={32} height={32} alt={`${data.name} logo`} className="p-1 bg-black rounded-lg filter brightness-0 invert" />
            <h1 className="text-2xl font-bold">{data.name}</h1>
          </motion.header>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <KpiCard title="Gross Revenue" value={data.kpis.grossRevenue} growth={data.kpis.growth} />
              <KpiCard title="Net After Fees" value={data.kpis.netRevenue} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle>30-Day Sales Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] -ml-6">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer>
                            <LineChart data={thirtyDaySales} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <YAxis tickFormatter={formatCurrencyForChart} tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                                <Tooltip content={<ChartTooltipContent indicator="line" />} />
                                <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {slug === 'upwork' ? <FreelanceSpecifics data={data} /> : <EcommerceSpecifics data={data} />}
          </motion.div>

        </motion.div>
      </main>
      <AppFooter />
    </div>
  );
}

const LoadingFallback = () => (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading Page...</p>
    </div>
);

export default function PlatformDetailsPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <PlatformDetailsContent />
        </Suspense>
    );
}


    