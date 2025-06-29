'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const NotificationItem = ({ id, label, description, defaultChecked = true }: { id: string, label: string, description: string, defaultChecked?: boolean }) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Label htmlFor={id} className="flex flex-col gap-1 flex-grow pr-4">
                <span className="font-semibold">{label}</span>
                <span className="text-sm font-normal text-muted-foreground">{description}</span>
            </Label>
            <Switch
                id={id}
                checked={isChecked}
                onCheckedChange={setIsChecked}
            />
        </motion.div>
    )
}

export default function NotificationSettingsPage() {
    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.header initial="hidden" animate="visible" variants={itemVariants} className="flex items-center gap-2 mb-8">
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Notifications</h1>
            </motion.header>

            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex-grow space-y-6">
                <NotificationItem 
                    id="tax-reminders"
                    label="Tax & Filing Reminders"
                    description="Get alerts for quarterly tax deadlines."
                />
                <Separator />
                <NotificationItem 
                    id="weekly-summary"
                    label="Weekly Summary"
                    description="A push notification every Monday with your profit summary."
                />
                 <Separator />
                <NotificationItem 
                    id="growth-milestones"
                    label="Growth Milestone Alerts"
                    description="Get notified when you unlock a new achievement."
                />
            </motion.div>
        </main>
    );
}
