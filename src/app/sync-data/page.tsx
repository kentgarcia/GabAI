'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ArrowRight, Check, Loader2, Link as LinkIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

const platforms = [
  { id: 'shopee', name: 'Shopee' },
  { id: 'lazada', name: 'Lazada' },
  { id: 'zalora', name: 'Zalora' },
  { id: 'tiktok', name: 'TikTok Shop' },
];

type SyncStatus = 'idle' | 'connecting' | 'syncing' | 'synced';

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
        variants={itemVariants}
        className="flex items-start gap-3 mb-8"
    >
        <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full flex-shrink-0" data-ai-hint="robot assistant" />
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

const PlatformCard = ({ name, status, onConnect }: { name: string, status: SyncStatus, onConnect: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === 'syncing') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-black rounded-lg">
                    <Store className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-grow">
                    <p className="font-bold">{name}</p>
                    <AnimatePresence mode="wait">
                        {status === 'syncing' && (
                             <motion.div
                                key="syncing"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-2"
                            >
                                <Progress value={progress} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">Pulling 2,345 transactions...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                         <motion.div key="idle" exit={{ opacity: 0, scale: 0.8 }}>
                            <Button onClick={onConnect} variant="outline" className="shrink-0">
                                <LinkIcon className="mr-2 h-4 w-4" /> Connect
                            </Button>
                         </motion.div>
                    )}
                     {status === 'connecting' && (
                         <motion.div key="connecting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="animate-spin h-5 w-5" /> Connecting...
                         </motion.div>
                    )}
                    {status === 'syncing' && (
                         <motion.div key="syncing" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="animate-spin h-5 w-5" /> Syncing...
                         </motion.div>
                    )}
                     {status === 'synced' && (
                         <motion.div key="synced" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 text-emerald-500 font-semibold">
                            <Check className="h-5 w-5" /> Synced
                         </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}


export default function SyncDataPage() {
    const router = useRouter();
    const [statuses, setStatuses] = useState<Record<string, SyncStatus>>(
        platforms.reduce((acc, p) => ({ ...acc, [p.id]: 'idle' }), {})
    );

    const handleConnect = (platformId: string) => {
        setStatuses(prev => ({ ...prev, [platformId]: 'connecting' }));
        setTimeout(() => {
            setStatuses(prev => ({ ...prev, [platformId]: 'syncing' }));
            setTimeout(() => {
                setStatuses(prev => ({ ...prev, [platformId]: 'synced' }));
            }, 2500); // Syncing duration
        }, 1500); // Connecting duration
    };

    const hasSynced = Object.values(statuses).some(s => s === 'synced');

    return (
        <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
             <div className="flex-grow flex flex-col justify-center">
                <motion.div
                    className="w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <ChatBubble>
                        <p>Let's connect your sales channels. I'll automatically sync your transactions to keep your books updated. Securely, of course!</p>
                    </ChatBubble>

                    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-center my-6">Connect Your Stores</motion.h1>

                    <motion.div variants={containerVariants} className="space-y-3">
                        {platforms.map(platform => (
                            <motion.div key={platform.id} variants={itemVariants}>
                                <PlatformCard
                                    name={platform.name}
                                    status={statuses[platform.id]}
                                    onConnect={() => handleConnect(platform.id)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg mt-8">
                        <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p><span className="font-semibold text-foreground/80">Pro Tip:</span> Connect all your stores to get a complete, unified view of your business performance on the dashboard.</p>
                    </motion.div>
                </motion.div>
             </div>

            <AnimatePresence>
                {hasSynced && (
                     <motion.div
                        className="w-full pt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            onClick={() => router.push('/first-look?from=seller')}
                            className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90"
                        >
                            Finish & Go to Dashboard
                            <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}