'use client';

import { useRef, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type BusinessDetails = { name: string; tin: string; address: string; };

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function ReceiptPreviewPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const receiptRef = useRef<HTMLDivElement>(null);

    const [businessDetails, setBusinessDetails] = useState<BusinessDetails | null>(null);
    const [receiptNumber, setReceiptNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const transaction = {
        name: searchParams.get('name') || 'N/A',
        value: searchParams.get('value') || '0',
        date: searchParams.get('date') || 'N/A',
        project: searchParams.get('project') || 'N/A'
    };
    
    useEffect(() => {
        const savedDetails = localStorage.getItem('businessDetails');
        if (savedDetails) {
            setBusinessDetails(JSON.parse(savedDetails));
        } else {
            router.push('/dashboard');
        }

        let currentReceiptNumber = Number(localStorage.getItem('receiptCounter') || '0') + 1;
        localStorage.setItem('receiptCounter', String(currentReceiptNumber));
        setReceiptNumber(`OR-${String(currentReceiptNumber).padStart(4, '0')}`);

    }, [router]);

    const handleGenerateAndSend = async () => {
        if (!receiptRef.current) return;
        
        setIsLoading(true);

        try {
            const canvas = await html2canvas(receiptRef.current, { scale: 2 });
            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

            if (!blob) {
                throw new Error("Could not create image blob.");
            }

            const fileName = `Official_Receipt_${receiptNumber}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.share) {
                await navigator.share({
                    title: `Official Receipt ${receiptNumber}`,
                    text: `Here is the official receipt for ${transaction.project}.`,
                    files: [file],
                });
            } else {
                // Fallback to download
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }
        } catch (error) {
            console.error('Error generating or sharing receipt:', error);
            // In a real app, you might want to show a toast notification here
        } finally {
            setIsLoading(false);
        }
    };

     const formatCurrency = (value: string) => {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(Number(value));
    };

    if (!businessDetails) {
        return <div className="flex-grow flex items-center justify-center"><p>Loading...</p></div>;
    }

    return (
         <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
             <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                <motion.header variants={itemVariants} className="flex items-center gap-2 mb-4">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                        <Link href="/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Review Your Receipt</h1>
                </motion.header>
                
                <motion.div variants={itemVariants}>
                    <div ref={receiptRef} className="bg-white p-8 rounded-lg shadow-lg text-black">
                        <header className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold">{businessDetails.name}</h2>
                                <p className="text-sm text-gray-600">{businessDetails.address}</p>
                                {businessDetails.tin && <p className="text-sm text-gray-600">TIN: {businessDetails.tin}</p>}
                            </div>
                            <div className="text-right">
                                <h3 className="text-xl font-semibold text-gray-700">OFFICIAL RECEIPT</h3>
                                <p className="font-mono text-lg">{receiptNumber}</p>
                            </div>
                        </header>
                        <Separator className="my-6"/>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <p className="text-sm text-gray-500">BILLED TO</p>
                                <p className="font-semibold">{transaction.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">DATE ISSUED</p>
                                <p className="font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 font-semibold">Description</th>
                                    <th className="p-3 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3">{transaction.project}</td>
                                    <td className="p-3 text-right">{formatCurrency(transaction.value)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end mt-8">
                            <div className="w-full max-w-xs">
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatCurrency(transaction.value)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between py-2 font-bold text-lg">
                                    <span>TOTAL</span>
                                    <span>{formatCurrency(transaction.value)}</span>
                                </div>
                            </div>
                        </div>
                        <footer className="text-center mt-12 text-xs text-gray-400">
                            <p>Thank you for your business!</p>
                            <p>This is an official receipt issued by {businessDetails.name}.</p>
                        </footer>
                    </div>
                </motion.div>
             </motion.div>

             <motion.div
                className="w-full pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Button onClick={handleGenerateAndSend} disabled={isLoading} className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
                    {isLoading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Check className="mr-2" />
                            Generate & Send
                        </>
                    )}
                </Button>
            </motion.div>
        </main>
    )
}
