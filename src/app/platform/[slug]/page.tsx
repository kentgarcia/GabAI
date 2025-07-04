
'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { AppFooter } from '@/components/layout/AppFooter';
import { cn } from '@/lib/utils';

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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(value);
};

// Mock data for recent transactions, can be expanded
const mockTransactions: { [key: string]: any[] } = {
    default: [
        { id: 1, desc: 'Order #12345678', amount: 350.50, type: 'income' },
        { id: 2, desc: 'Platform Fee', amount: -25.50, type: 'expense' },
        { id: 3, desc: 'Order #12345699', amount: 899.00, type: 'income' },
    ],
    shopee: [
        { id: 1, desc: 'Order #240720ABCDE1', amount: 1250.00, type: 'income' },
        { id: 2, desc: 'Shipping Fee Rebate', amount: 50.00, type: 'income' },
        { id: 3, desc: 'Transaction Fee', amount: -65.20, type: 'expense' },
        { id: 4, desc: 'Order #240720FGHIJ2', amount: 450.75, type: 'income' },
    ],
    lazada: [
        { id: 1, desc: 'Order #987654321', amount: 799.00, type: 'income' },
        { id: 2, desc: 'Payment Fee', amount: -40.00, type: 'expense' },
        { id: 3, desc: 'Order #987654322', amount: 1999.00, type: 'income' },
    ],
    upwork: [
        { id: 1, desc: 'Milestone: Project Alpha', amount: 15000.00, type: 'income' },
        { id: 2, desc: 'Service Fee', amount: -1500.00, type: 'expense' },
        { id: 3, desc: 'Client Bonus', amount: 2500.00, type: 'income' },
    ],
     tiktok: [
        { id: 1, desc: 'Order #TTS-98765', amount: 350.00, type: 'income' },
        { id: 2, desc: 'Creator Payout', amount: 875.00, type: 'income' },
        { id: 3, desc: 'Shipping Fee', amount: -45.00, type: 'expense' },
    ],
};

function PlatformDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = Array.isArray(params.slug) ? params.slug[0] : 'default';
  
  const name = searchParams.get('name') || 'Platform';
  const value = Number(searchParams.get('value') || 0);
  const icon = searchParams.get('icon') || '';
  const period = searchParams.get('period') || 'This Month';

  if (!name || !icon) {
      // Could add a more robust loading/error state here
      return <div className="flex-grow flex items-center justify-center"><p>Loading platform data...</p></div>;
  }
  
  const transactions = mockTransactions[slug] || mockTransactions.default;
  const totalOrders = transactions.filter(t => t.type === 'income').length;
  const avgOrderValue = totalOrders > 0 ? value / totalOrders : 0;

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.header variants={itemVariants} className="flex items-center gap-2 mb-4">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
              <Link href="/dashboard">
                <ArrowLeft />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{name}</h1>
          </motion.header>

          <motion.div variants={itemVariants}>
            <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                <div className="w-16 h-16 bg-[#131313] rounded-xl flex items-center justify-center p-2">
                  <Image src={icon} width={48} height={48} alt={`${name} logo`} className="filter brightness-0 invert" />
                </div>
                <div>
                    <CardDescription>{period} Sales</CardDescription>
                    <CardTitle className="text-4xl font-bold">{formatCurrency(value)}</CardTitle>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2">Performance Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                 <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                    </CardContent>
                 </Card>
                 <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</p>
                    </CardContent>
                 </Card>
              </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
              <CardContent className="p-4 space-y-1">
                {transactions.map((item) => (
                    <div key={item.id} className="p-2 flex items-center gap-4 rounded-lg hover:bg-muted/40">
                         <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            item.type === 'income' ? "bg-emerald-500/20" : "bg-red-500/20"
                        )}>
                            {item.type === 'income' ? <TrendingUp className="w-5 h-5 text-emerald-500" /> : <TrendingDown className="w-5 h-5 text-red-500" />}
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">{item.desc}</p>
                        </div>
                        <p className={cn(
                            "font-semibold text-lg",
                            item.type === 'income' ? "text-emerald-500" : "text-red-500"
                          )}
                        >{formatCurrency(item.amount)}</p>
                    </div>
                ))}
              </CardContent>
            </Card>
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
