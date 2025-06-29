'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

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

const ChatBubble = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        className="flex items-start gap-3 mb-6"
    >
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);


export default function TransactionDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [isSetupDialogOpen, setIsSetupDialogOpen] = useState(false);
    const [businessDetails, setBusinessDetails] = useState({ name: '', tin: '', address: '' });

    const transaction = {
        id: params.id,
        name: searchParams.get('name') || 'N/A',
        value: searchParams.get('value') || '0',
        date: searchParams.get('date') || 'N/A',
        project: searchParams.get('project') || 'N/A'
    };

    const handleCreateReceipt = () => {
        const savedDetails = localStorage.getItem('businessDetails');
        if (savedDetails) {
            router.push(`/receipt/preview?${searchParams.toString()}`);
        } else {
            setIsSetupDialogOpen(true);
        }
    };
    
    const handleSaveDetails = () => {
        if (!businessDetails.name || !businessDetails.address) {
             toast({
                title: "Incomplete Details",
                description: "Please fill in at least your name and address.",
                variant: "destructive",
            });
            return;
        }
        localStorage.setItem('businessDetails', JSON.stringify(businessDetails));
        setIsSetupDialogOpen(false);
        toast({
            title: "Details Saved!",
            description: "Your business details have been saved.",
        });
        router.push(`/receipt/preview?${searchParams.toString()}`);
    };

    const formatCurrency = (value: string) => {
      return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
      }).format(Number(value)).replace('₱', '₱ ');
    };

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.header variants={itemVariants} className="flex items-center gap-2 mb-8">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                        <Link href="/dashboard">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Transaction Details</h1>
                </motion.header>

                <motion.div variants={itemVariants}>
                    <Card className="w-full bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-3xl">{formatCurrency(transaction.value)}</CardTitle>
                            <CardDescription>{transaction.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Project/Service</span>
                                <span className="font-semibold">{transaction.project}</span>
                            </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Date</span>
                                <span className="font-semibold">{transaction.date}</span>
                            </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Transaction ID</span>
                                <span className="font-semibold text-right">TXN-{transaction.id}</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8">
                    <Button onClick={handleCreateReceipt} className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
                        <FileText className="mr-2" />
                        Create Official Receipt
                    </Button>
                </motion.div>
            </motion.div>

             <Dialog open={isSetupDialogOpen} onOpenChange={setIsSetupDialogOpen}>
                <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border">
                    <DialogHeader>
                        <ChatBubble>
                           <p>Let's set up your BIR-ready receipts. You only need to do this once!</p>
                        </ChatBubble>
                        <DialogTitle className="text-center text-xl">Your Business Details for Official Receipts</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Full Name / Business Name</Label>
                            <Input id="name" value={businessDetails.name} onChange={(e) => setBusinessDetails({...businessDetails, name: e.target.value})} className="bg-background/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tin">Your TIN (Taxpayer Identification Number)</Label>
                            <Input id="tin" value={businessDetails.tin} onChange={(e) => setBusinessDetails({...businessDetails, tin: e.target.value})} className="bg-background/30" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Your Registered Address</Label>
                            <Input id="address" value={businessDetails.address} onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})} className="bg-background/30" />
                        </div>
                         <p className="text-xs text-muted-foreground text-center pt-2">
                           Don't have these yet? No problem! You can still create a professional, non-BIR receipt. Gabi can guide you on how to register your business later.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveDetails} type="button" className="w-full bg-black text-primary-foreground">Save Details</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
