
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Zap, Banknote, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

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

const proFeatures = [
    { text: "Unlimited Secure Bank Syncs", icon: Banknote },
    { text: "AI-Powered Revenue Forecasting", icon: Zap },
    { text: "Smart Inventory & Sales Suggestions", icon: Lightbulb },
    { text: "Priority Gabi AI Support", icon: Sparkles },
];

export default function SubscriptionPage() {
    const { toast } = useToast();
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: '🎉 Welcome to Pro!',
                description: 'You have successfully upgraded to GabAI Pro.'
            });
        }, 2000);
    }

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col flex-grow"
            >
                <motion.header variants={itemVariants} className="flex items-center gap-2 mb-8">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                        <Link href="/settings">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">GabAI Pro</h1>
                </motion.header>

                <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6 space-y-6">
                    <motion.div variants={itemVariants}>
                        <Card className="bg-gradient-to-tr from-primary/90 to-primary-dark text-primary-foreground shadow-xl rounded-2xl">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Unlock Your Full Potential</CardTitle>
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <CardDescription className="text-primary-foreground/80">
                                    Supercharge your financial management with exclusive features.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {proFeatures.map((feature) => (
                                        <li key={feature.text} className="flex items-center gap-3">
                                            <div className="p-1.5 bg-primary-foreground/20 rounded-full">
                                                <feature.icon className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3">
                        <Label htmlFor="billing-cycle" className={cn(!isYearly && "text-primary font-semibold")}>
                            Monthly
                        </Label>
                        <Switch
                            id="billing-cycle"
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <Label htmlFor="billing-cycle" className={cn(isYearly && "text-primary font-semibold")}>
                            Yearly
                        </Label>
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 border-none">Save 20%</Badge>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isYearly ? 'yearly' : 'monthly'}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-4xl font-bold tracking-tight">
                                    {isYearly ? '₱1,999' : '₱199'}
                                </p>
                                <p className="text-muted-foreground">
                                    per {isYearly ? 'year' : 'month'}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="pt-8">
                    <Button onClick={handleUpgrade} disabled={isLoading} className="w-full bg-black text-primary-foreground rounded-full h-14 text-lg font-semibold hover:bg-black/90">
                         {isLoading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                                Processing...
                            </>
                        ) : (
                             <>
                                <Check className="mr-2" />
                                Upgrade to Pro
                            </>
                        )}
                    </Button>
                    <Button variant="link" className="w-full mt-2 text-muted-foreground">Restore Purchases</Button>
                </motion.div>
            </motion.div>
        </main>
    );
}
