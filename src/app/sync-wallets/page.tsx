'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Store, CreditCard, Upload, ArrowRight, Check, Loader2, Link as LinkIcon, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const platforms = [
  { id: 'upwork', name: 'Upwork', icon: Briefcase },
  { id: 'ecommerce', name: 'Shopee / Lazada', icon: Store },
  { id: 'wallets', name: 'PayPal / Wise / GCash', icon: CreditCard },
  { id: 'csv', name: 'Enter transactions manually', icon: Upload },
];

type SyncStatus = 'idle' | 'connecting' | 'syncing' | 'synced';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } };

const ChatBubble = ({ children }: { children: React.ReactNode }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-3 mb-8">
        <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full flex-shrink-0" data-ai-hint="robot assistant" />
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">{children}</div>
    </motion.div>
);

const PlatformCard = ({ name, icon: Icon, status, onConnect }: { name: string; icon: React.ElementType; status: SyncStatus; onConnect: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === 'syncing') {
            const interval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 100));
            }, 200);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-black rounded-lg"><Icon className="w-6 h-6 text-primary-foreground" /></div>
                <div className="flex-grow">
                    <p className="font-bold">{name}</p>
                    <AnimatePresence mode="wait">
                        {status === 'syncing' && (
                             <motion.div key="syncing-progress" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-2">
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">Pulling transactions...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="w-28 text-right">
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                         <motion.div key="idle" exit={{ opacity: 0, scale: 0.8 }}>
                            <Button onClick={onConnect} variant="outline" className="shrink-0 w-full justify-center">
                                <LinkIcon className="mr-2 h-4 w-4" /> Connect
                            </Button>
                         </motion.div>
                    )}
                     {status === 'connecting' && (
                         <motion.div key="connecting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
                            <Loader2 className="animate-spin h-4 w-4" /> Connecting...
                         </motion.div>
                    )}
                    {status === 'syncing' && (
                         <motion.div key="syncing-text" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
                            <Loader2 className="animate-spin h-4 w-4" /> Syncing...
                         </motion.div>
                    )}
                     {status === 'synced' && (
                         <motion.div key="synced" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-end gap-2 text-emerald-500 font-semibold text-sm">
                            <Check className="h-4 w-4" /> Synced
                         </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}

export default function SyncWalletsPage() {
    const router = useRouter();
    const [statuses, setStatuses] = useState<Record<string, SyncStatus>>(platforms.reduce((acc, p) => ({ ...acc, [p.id]: 'idle' }), {}));

    const handleConnect = (platformId: string) => {
        if (statuses[platformId] !== 'idle') return;

        if (platformId === 'csv') {
            router.push('/add/income');
            return;
        }

        setStatuses(prev => ({ ...prev, [platformId]: 'connecting' }));
        setTimeout(() => {
            setStatuses(prev => ({ ...prev, [platformId]: 'syncing' }));
            setTimeout(() => {
                setStatuses(prev => ({ ...prev, [platformId]: 'synced' }));
            }, 2500);
        }, 1500);
    };

    const handleSkip = () => router.push('/dashboard');

    const hasSynced = Object.values(statuses).some(s => s === 'synced');

    return (
        <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
             <div className="flex-grow flex flex-col justify-center">
                <motion.div className="w-full" variants={containerVariants} initial="hidden" animate="visible">
                    <ChatBubble>
                        <p>Let's get your accounts in sync. Connect your platforms to automatically track your income and payments. It's secure and makes bookkeeping a breeze!</p>
                    </ChatBubble>
                    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-center my-6">Connect Your Platforms</motion.h1>
                    <motion.div variants={containerVariants} className="space-y-3">
                        {platforms.map(platform => (
                            <motion.div key={platform.id} variants={itemVariants}>
                                <PlatformCard name={platform.name} icon={platform.icon} status={statuses[platform.id]} onConnect={() => handleConnect(platform.id)} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
             </div>
            <motion.div className="w-full pt-8 flex flex-col gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <AnimatePresence>
                    {hasSynced && (
                         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                            <Button onClick={() => router.push('/first-look?from=freelancer')} className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
                                Finish & Go to Dashboard <ArrowRight className="ml-2" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button onClick={handleSkip} variant="ghost" className="w-full text-muted-foreground">
                    <SkipForward className="mr-2" /> I'll do this later
                </Button>
            </motion.div>
        </main>
    );
}
