
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { ArrowLeft, Bot, Loader2, Upload, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

const salesDataByProduct = [
  { name: 'Gadget Pro Stand', sku: 'GPS-001', unitsSold: 50, grossRevenue: 25000 },
  { name: 'Vintage T-Shirt (Large)', sku: 'VTS-L-01', unitsSold: 30, grossRevenue: 15000 },
  { name: 'Organic Coffee Beans (250g)', sku: 'OCB-250', unitsSold: 120, grossRevenue: 48000 },
  { name: 'Handmade Leather Wallet', sku: 'HLW-BRN', unitsSold: 25, grossRevenue: 37500 },
];

const salesDataByPlatform = [
  { name: 'Shopee', orders: 80, grossRevenue: 30000 },
  { name: 'TikTok Shop', orders: 50, grossRevenue: 18000 },
  { name: 'Lazada', orders: 45, grossRevenue: 22000 },
  { name: 'Facebook (Manual)', orders: 10, grossRevenue: 5000 },
];

const salesDataByCategory = [
  { name: 'Electronics', unitsSold: 120, grossRevenue: 45000 },
  { name: 'Apparel', unitsSold: 85, grossRevenue: 32000 },
  { name: 'Home Goods', unitsSold: 60, grossRevenue: 18000 },
  { name: 'Services', unitsSold: 15, grossRevenue: 50000 },
];


export default function SalesReportPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const groupBy = decodeURIComponent(searchParams.get('groupBy') || 'Product / SKU');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const dateRange = from && to ? `${from} to ${to}` : 'the selected period';

  useEffect(() => {
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
        description: `The Sales Report has been sent to your registered email.`,
    });
  };

  const renderReportContent = () => {
    switch (groupBy) {
        case 'Platform':
            return salesDataByPlatform.map((item, index) => (
                <Card key={index} className="mb-3">
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">{index + 1}. {item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Total Orders</p>
                            <p className="font-semibold">{item.orders}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Gross Revenue</p>
                            <p className="font-semibold">{formatCurrency(item.grossRevenue)}</p>
                        </div>
                    </CardContent>
                </Card>
            ));
        case 'Category':
            return salesDataByCategory.map((item, index) => (
                <Card key={index} className="mb-3">
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">{index + 1}. {item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Units Sold</p>
                            <p className="font-semibold">{item.unitsSold}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Gross Revenue</p>
                            <p className="font-semibold">{formatCurrency(item.grossRevenue)}</p>
                        </div>
                    </CardContent>
                </Card>
            ));
        case 'Product / SKU':
        default:
            return salesDataByProduct.map((item, index) => (
                <Card key={index} className="mb-3">
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">{index + 1}. {item.name}</CardTitle>
                        <CardDescription>SKU: {item.sku}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Units Sold</p>
                            <p className="font-semibold">{item.unitsSold}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Gross Revenue</p>
                            <p className="font-semibold">{formatCurrency(item.grossRevenue)}</p>
                        </div>
                    </CardContent>
                </Card>
            ));
    }
  };


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
                <Link href="/reports/generate/sales">
                  <ArrowLeft />
                </Link>
              </Button>
              <h1 className="text-xl font-bold truncate">Sales Report by {groupBy}</h1>
            </motion.header>

            <div className="flex-grow overflow-y-auto no-scrollbar rounded-lg">
                <div ref={reportRef} className="bg-white p-6 text-black rounded-lg">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">Sales Report</h2>
                        <p className="text-lg font-semibold">Grouped by {groupBy}</p>
                        <p className="text-sm text-gray-500">For the period of {dateRange}</p>
                    </div>
                    <Separator className="mb-4" />
                    {renderReportContent()}
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
