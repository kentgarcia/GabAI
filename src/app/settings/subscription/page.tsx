
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
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

const plans = {
    monthly: [
        {
            name: 'Free',
            price: '₱0',
            priceSuffix: '',
            features: [
                'Sync up to 2 platforms/accounts',
                'Limited AI usage (slower response)',
                'Basic forecasting & reporting',
                'Manual receipt generation',
                'Access to free certifications'
            ],
            isCurrent: true,
        },
        {
            name: 'Premium Lite',
            price: '₱149',
            priceSuffix: '/ month',
            features: [
                'Sync up to 5 platforms/accounts',
                'Faster AI (2x query limit)',
                'Downloadable trend reports',
                'Generate global payment links',
                'Access to select premium certifications',
                'Standard email support'
            ],
            isCurrent: false,
        },
        {
            name: 'Premium',
            price: '₱299',
            priceSuffix: '/ month',
            features: [
                'Unlimited platform syncs',
                'Desktop GabAI web access',
                'Priority & unlimited AI Assistant',
                'Automated receipts & links',
                'Advanced real-time forecasting',
                'Full access to all certifications',
                'Personalized financial coaching',
                'Priority support'
            ],
            isCurrent: false,
            isFeatured: true,
        },
    ],
    yearly: [
        {
            name: 'Free',
            price: '₱0',
            priceSuffix: '',
            features: [
                'Sync up to 2 platforms/accounts',
                'Limited AI usage (slower response)',
                'Basic forecasting & reporting',
                'Manual receipt generation',
                'Access to free certifications'
            ],
            isCurrent: true,
        },
        {
            name: 'Premium Lite',
            price: '₱1,490',
            priceSuffix: '/ year',
            features: [
                'Sync up to 5 platforms/accounts',
                'Faster AI (2x query limit)',
                'Downloadable trend reports',
                'Generate global payment links',
                'Access to select premium certifications',
                'Standard email support'
            ],
            isCurrent: false,
        },
        {
            name: 'Premium',
            price: '₱2,990',
            priceSuffix: '/ year',
            features: [
                'Unlimited platform syncs',
                'Desktop GabAI web access',
                'Priority & unlimited AI Assistant',
                'Automated receipts & links',
                'Advanced real-time forecasting',
                'Full access to all certifications',
                'Personalized financial coaching',
                'Priority support'
            ],
            isCurrent: false,
            isFeatured: true,
        },
    ]
};

const PlanCard = ({ plan, onUpgrade, isLoading, isUpgrading }: { plan: any, onUpgrade: (planName: string) => void, isLoading: boolean, isUpgrading: boolean }) => (
    <Card className={cn(
        "bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl flex flex-col",
        plan.isFeatured && "border-primary ring-1 ring-primary"
    )}>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>{plan.name}</CardTitle>
                {plan.isFeatured && <Badge>Most Popular</Badge>}
            </div>
            <CardDescription className="flex items-baseline gap-1 pt-2">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="font-semibold">{plan.priceSuffix}</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
            <p className="text-sm font-semibold">Includes:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <div className="p-4 mt-auto">
             <Button 
                onClick={() => onUpgrade(plan.name)}
                disabled={plan.isCurrent || isLoading}
                className={cn(
                    "w-full h-12 text-lg",
                    plan.isFeatured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-black text-white hover:bg-black/90",
                    plan.isCurrent && "bg-muted text-muted-foreground cursor-default hover:bg-muted"
                )}
            >
                {isUpgrading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                    </>
                ) : plan.isCurrent ? "Current Plan" : "Upgrade"}
            </Button>
        </div>
    </Card>
);

export default function SubscriptionPage() {
    const { toast } = useToast();
    const [isYearly, setIsYearly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);

    const handleUpgrade = (planName: string) => {
        if (planName === 'Free' || isLoading) return;
        
        setIsLoading(true);
        setUpgradingPlan(planName);

        setTimeout(() => {
            setIsLoading(false);
            setUpgradingPlan(null);
            toast({
                title: `🎉 Welcome to ${planName}!`,
                description: 'You have successfully upgraded your plan.'
            });
        }, 2000);
    }

    const currentPlans = isYearly ? plans.yearly : plans.monthly;

    return (
        <main className="flex flex-col p-6 text-foreground h-screen">
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="flex items-center gap-2 mb-4 shrink-0"
            >
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Subscription Plans</h1>
            </motion.header>

            <div className="flex-1 overflow-y-auto no-scrollbar -mx-6 px-6 min-h-0">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3 py-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
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
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 border-none">Save ~17%</Badge>
                    </motion.div>

                    {currentPlans.map(plan => (
                         <motion.div key={plan.name} variants={itemVariants}>
                            <PlanCard 
                                plan={plan}
                                onUpgrade={handleUpgrade}
                                isLoading={isLoading}
                                isUpgrading={isLoading && upgradingPlan === plan.name}
                            />
                         </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                className="pt-4 text-center shrink-0"
            >
                <Button variant="link" className="w-full mt-2 text-muted-foreground">Restore Purchases</Button>
            </motion.div>
        </main>
    );
}

