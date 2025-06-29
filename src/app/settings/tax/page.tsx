'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function TaxSettingsPage() {
    const { toast } = useToast();
    const [taxPreference, setTaxPreference] = useState<string | null>(null);

    useEffect(() => {
        const savedPreference = localStorage.getItem('taxPreference');
        setTaxPreference(savedPreference);
    }, []);

    const handlePreferenceChange = (value: string) => {
        setTaxPreference(value);
        localStorage.setItem('taxPreference', value);
        toast({
            title: "✅ Preference Saved",
            description: `Tax estimation method set to ${value === '8_percent' ? '8% Flat Tax' : 'Graduated Income Tax'}.`
        });
    }

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.header initial="hidden" animate="visible" variants={itemVariants} className="flex items-center gap-2 mb-4">
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Tax Estimation Method</h1>
            </motion.header>
            
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex-grow space-y-6">
                <motion.p variants={itemVariants} className="text-muted-foreground">
                    Choose the method Gabi will use to calculate your estimated taxes. This can be changed anytime.
                </motion.p>
                
                <motion.div variants={itemVariants}>
                    <RadioGroup value={taxPreference || ''} onValueChange={handlePreferenceChange} className="space-y-3">
                        <Label htmlFor="8_percent">
                            <Card className={cn("transition-all", taxPreference === '8_percent' && 'ring-2 ring-primary')}>
                                <CardContent className="p-4 flex items-start gap-4">
                                    <RadioGroupItem value="8_percent" id="8_percent" className="mt-1" />
                                    <div className="grid gap-1.5 leading-normal">
                                        <p className="font-semibold">8% Flat Tax Rate</p>
                                        <p className="text-sm text-muted-foreground">
                                            A simple 8% tax on gross receipts, often best for new businesses with low expenses. (Note: A ₱250,000 annual income exemption applies).
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Label>
                        <Label htmlFor="graduated">
                            <Card className={cn("transition-all", taxPreference === 'graduated' && 'ring-2 ring-primary')}>
                                <CardContent className="p-4 flex items-start gap-4">
                                    <RadioGroupItem value="graduated" id="graduated" className="mt-1" />
                                    <div className="grid gap-1.5 leading-normal">
                                        <p className="font-semibold">Graduated Income Tax</p>
                                        <p className="text-sm text-muted-foreground">
                                            Tax rates from 0% to 35% on your net income (after expenses). This may be better if you have high business costs.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Label>
                    </RadioGroup>
                </motion.div>

                 <motion.div variants={itemVariants} className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p><span className="font-semibold text-foreground/80">Gabi's Tip:</span> Unsure which to choose? The 8% rate is a popular starting point. We strongly recommend consulting a tax professional for official advice.</p>
                </motion.div>
            </motion.div>
        </main>
    );
}
