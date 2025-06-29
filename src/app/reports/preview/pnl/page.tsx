
import { Suspense } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { ArrowLeft, Bot, Loader2, Upload, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

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

const PnlData = {
  revenue: {
    'Product Sales': 55231.84,
    'Service Fees': 10000.00,
  },
  cogs: {
    'Cost of Goods': 21450.30,
    'Shipping Supplies': 2500.00,
  },
  expenses: {
    'Marketing & Ads': 5500.00,
    'Software & Subscriptions': 1200.00,
    'Platform Fees': 4500.12,
  },
};

function PnlPreviewContent() {
  'use client';

  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [businessName, setBusinessName] = useState('Your Business Name');

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const dateRange = from && to ? `${from} to ${to}` : 'the selected period';

  useEffect(() => {
    const savedDetails = localStorage.getItem('businessDetails');
    if (savedDetails) {
      setBusinessName(JSON.parse(savedDetails).name);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  
  const handleExport = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
        const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#ffffff' });
        const dataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('receiptImage', dataUrl); // Reusing the same local storage key
        router.push('/share');
    } catch (error) {
        console.error('Error exporting report:', error);
        toast({
            title: "Export Failed",
            description: "Could not create the report image. Please try again.",
            variant: "destructive",
        });
        setIsExporting(false);
    }
  };

  const handleEmail = () => {
    toast({
        title: "Report Sent!",
        description: "The P&L statement has been sent to your registered email.",
    });
  };

  const totalRevenue = Object.values(PnlData.revenue).reduce((a, b) => a + b, 0);
  const totalCogs = Object.values(PnlData.cogs).reduce((a, b) => a + b, 0);
  const grossProfit = totalRevenue - totalCogs;
  const totalExpenses = Object.values(PnlData.expenses).reduce((a, b) => a + b, 0);
  const netProfit = grossProfit - totalExpenses;

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground bg-muted">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-grow"
          >
            <div className="flex items-start gap-3 mb-8 self-start">
                <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
                    <Bot className="h-6 w-6 text-accent" />
                </div>
                <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
                    <p>Gabi is preparing your document...</p>
                </div>
            </div>
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col flex-grow"
          >
            <motion.header
              variants={itemVariants}
              className="flex items-center gap-2 mb-4"
            >
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                <Link href="/reports/generate/pnl">
                  <ArrowLeft />
                </Link>
              </Button>
              <h1 className="text-xl font-bold">P&L for {dateRange}</h1>
            </motion.header>

            <div className="flex-grow overflow-y-auto no-scrollbar rounded-lg">
                <div ref={reportRef} className="bg-white p-6 text-black rounded-lg">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">{businessName}</h2>
                        <p className="text-lg font-semibold">Profit and Loss Statement</p>
                        <p className="text-sm text-gray-500">For the period of {dateRange}</p>
                    </div>

                    {/* Revenue */}
                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">Revenue</h3>
                        {Object.entries(PnlData.revenue).map(([key, value]) => (
                             <div key={key} className="flex justify-between text-sm py-1"><span>{key}</span><span>{formatCurrency(value)}</span></div>
                        ))}
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total Revenue</span><span>{formatCurrency(totalRevenue)}</span></div>
                    </div>

                    {/* Cost of Goods Sold */}
                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">Cost of Goods Sold</h3>
                         {Object.entries(PnlData.cogs).map(([key, value]) => (
                             <div key={key} className="flex justify-between text-sm py-1"><span>{key}</span><span>{formatCurrency(value)}</span></div>
                        ))}
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total COGS</span><span>{formatCurrency(totalCogs)}</span></div>
                    </div>
                    
                    <Separator className="my-2"/>
                    <div className="flex justify-between font-bold text-lg py-2 mb-4"><span>Gross Profit</span><span>{formatCurrency(grossProfit)}</span></div>


                    {/* Operating Expenses */}
                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">Operating Expenses</h3>
                         {Object.entries(PnlData.expenses).map(([key, value]) => (
                             <div key={key} className="flex justify-between text-sm py-1"><span>{key}</span><span>{formatCurrency(value)}</span></div>
                        ))}
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total Operating Expenses</span><span>{formatCurrency(totalExpenses)}</span></div>
                    </div>

                    <Separator className="my-2 bg-black h-0.5"/>
                    <div className="flex justify-between font-bold text-xl py-2"><span>Net Profit</span><span>{formatCurrency(netProfit)}</span></div>

                </div>
            </div>

            <motion.div variants={itemVariants} className="pt-4 flex gap-3">
                <Button onClick={handleEmail} variant="outline" className="w-full bg-black text-white rounded-full h-14 text-lg font-semibold">
                    <Mail className="mr-2"/>
                    Email to Me
                </Button>
                <Button onClick={handleExport} disabled={isExporting} className="w-full bg-black text-primary-foreground rounded-full h-14 text-lg font-semibold hover:bg-black/90">
                    {isExporting ? <Loader2 className="animate-spin mr-2"/> : <Upload className="mr-2" />}
                    Export
                </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const LoadingFallback = () => (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading Page...</p>
    </div>
);

export default function PnlPreviewPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <PnlPreviewContent />
        </Suspense>
    );
}
