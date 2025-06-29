
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { ArrowLeft, Bot, Loader2, Upload, Mail, AlertTriangle, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

const TaxSummaryData = {
  grossReceipts: {
    'Total Sales from Products': 55231.84,
    'Total Revenue from Services': 10000.00,
  },
  deductions: {
    'Cost of Goods/Sales': 23950.30,
    'Salaries & Wages': 0.00,
    'Rent / Utilities': 3200.00,
    'Software & Subscriptions': 1200.00,
    'Marketing & Advertising': 5500.00,
  },
};

const ContributionsData = {
    sss: 1800.00,
    philhealth: 600.00,
    pagibig: 200.00,
};

export default function TaxSummaryPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [businessName, setBusinessName] = useState('Your Business Name');
  const [taxPreference, setTaxPreference] = useState<'8_percent' | 'graduated' | null>(null);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const dateRange = from && to ? `${from.replace(/,/g, '')} to ${to.replace(/,/g, '')}` : 'the selected period';


  useEffect(() => {
    const savedDetails = localStorage.getItem('businessDetails');
    if (savedDetails) {
      setBusinessName(JSON.parse(savedDetails).name);
    }
    const savedPreference = localStorage.getItem('taxPreference');
    if (savedPreference === '8_percent' || savedPreference === 'graduated') {
        setTaxPreference(savedPreference);
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
        localStorage.setItem('receiptImage', dataUrl);
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
        title: "Summary Sent!",
        description: "The tax summary has been sent to your registered email.",
    });
  };

  const totalGrossReceipts = Object.values(TaxSummaryData.grossReceipts).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(TaxSummaryData.deductions).reduce((a, b) => a + b, 0);
  const netTaxableIncome = totalGrossReceipts - totalDeductions;
  
  const estimatedTaxDue = taxPreference === '8_percent'
    ? totalGrossReceipts * 0.08
    : netTaxableIncome * 0.15; // Placeholder calculation for graduated tax
    
  const totalContributions = Object.values(ContributionsData).reduce((a, b) => a + b, 0);

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
                <Link href="/reports/generate/tax-summary">
                  <ArrowLeft />
                </Link>
              </Button>
              <h1 className="text-xl font-bold truncate">Tax Summary: {dateRange}</h1>
            </motion.header>

            <div className="flex-grow overflow-y-auto no-scrollbar rounded-lg">
                <div ref={reportRef} className="bg-white p-6 text-black rounded-lg">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold">{businessName}</h2>
                        <p className="text-lg font-semibold">Tax & Contributions Summary</p>
                        <p className="text-sm text-gray-500">For the period of {dateRange}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">1. Gross Income / Receipts</h3>
                        {Object.entries(TaxSummaryData.grossReceipts).map(([key, value]) => (
                             <div key={key} className="flex justify-between text-sm py-1"><span>{key}</span><span>{formatCurrency(value)}</span></div>
                        ))}
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total Gross Receipts</span><span>{formatCurrency(totalGrossReceipts)}</span></div>
                    </div>
                    
                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">2. Allowable Deductions</h3>
                         {Object.entries(TaxSummaryData.deductions).map(([key, value]) => (
                            value > 0 && <div key={key} className="flex justify-between text-sm py-1"><span>{key}</span><span>{formatCurrency(value)}</span></div>
                        ))}
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total Allowable Deductions</span><span>{formatCurrency(totalDeductions)}</span></div>
                    </div>
                    
                    <Separator className="my-2"/>
                    <div className="flex justify-between font-bold text-lg py-2 mb-4"><span>3. Net Taxable Income</span><span>{formatCurrency(netTaxableIncome)}</span></div>

                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">4. Estimated Tax Due</h3>
                        <div className="flex justify-between font-semibold py-1">
                            <span>Based on {taxPreference === '8_percent' ? '8% Flat Tax' : 'Graduated Tax'}</span>
                            <span>{formatCurrency(estimatedTaxDue)}</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold border-b pb-1 mb-2">5. Estimated Government Contributions</h3>
                         <div className="flex justify-between text-sm py-1"><span>SSS Contribution</span><span>{formatCurrency(ContributionsData.sss)}</span></div>
                         <div className="flex justify-between text-sm py-1"><span>PhilHealth Contribution</span><span>{formatCurrency(ContributionsData.philhealth)}</span></div>
                         <div className="flex justify-between text-sm py-1"><span>Pag-IBIG Contribution</span><span>{formatCurrency(ContributionsData.pagibig)}</span></div>
                        <Separator className="my-1"/>
                         <div className="flex justify-between font-semibold py-1"><span>Total Contributions</span><span>{formatCurrency(totalContributions)}</span></div>
                    </div>
                    
                    <div className="mt-8 bg-yellow-100/60 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-r-lg">
                        <div className="flex">
                            <div className="py-1"><AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" /></div>
                            <div>
                                <h4 className="font-bold">Disclaimer</h4>
                                <p className="text-xs">This is a summary to aid your tax preparation. It is not an official tax return. Please consult with a qualified tax professional for advice and final filing.</p>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg mt-4">
                    <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-foreground/80">Gabi's Tip:</span> These are estimates based on your income and can be adjusted in your Tax Settings. Gabi will send you a reminder before the payment deadlines.</p>
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
