'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function BusinessDetailsPage() {
    const { toast } = useToast();
    const [details, setDetails] = useState({
        name: '',
        tin: '',
        address: ''
    });

    useEffect(() => {
        const savedDetails = localStorage.getItem('businessDetails');
        if (savedDetails) {
            setDetails(JSON.parse(savedDetails));
        }
    }, []);

    const handleSave = () => {
         if (!details.name || !details.address) {
             toast({
                title: "Incomplete Details",
                description: "Please provide at least a business name and address.",
                variant: "destructive",
            });
            return;
        }
        localStorage.setItem('businessDetails', JSON.stringify(details));
        toast({
            title: "✅ Details Saved!",
            description: "Your business details have been updated.",
        });
    };

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.header initial="hidden" animate="visible" variants={itemVariants} className="flex items-center gap-2 mb-8">
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Business Details</h1>
            </motion.header>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex-grow space-y-6">
                <motion.div variants={itemVariants} className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-foreground/80">Gabi's Tip:</span> This information will appear on your official receipts to make them BIR-compliant.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Business Name (as registered)</Label>
                        <Input id="name" value={details.name} onChange={(e) => setDetails({...details, name: e.target.value})} className="bg-background/30 h-12" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="tin">TIN (Taxpayer Identification Number)</Label>
                        <Input id="tin" placeholder="e.g. 123-456-789-000" value={details.tin} onChange={(e) => setDetails({...details, tin: e.target.value})} className="bg-background/30 h-12" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Registered Address</Label>
                        <Input id="address" value={details.address} onChange={(e) => setDetails({...details, address: e.target.value})} className="bg-background/30 h-12" />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="pt-8">
                <Button onClick={handleSave} className="w-full bg-black text-primary-foreground rounded-full h-14 text-lg font-semibold hover:bg-black/90">
                    Save Changes
                </Button>
            </motion.div>
        </main>
    );
}
