'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Briefcase, Store, CreditCard, Upload, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const platforms = [
  { id: 'upwork', name: 'Upwork', icon: Briefcase },
  { id: 'ecommerce', name: 'Shopee / Lazada', icon: Store },
  { id: 'wallets', name: 'PayPal / Wise / GCash', icon: CreditCard },
  { id: 'csv', name: 'Upload CSV manually', icon: Upload },
];

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

const PlatformCard = ({ name, icon: Icon, onConnect }: { name: string, icon: React.ElementType, onConnect: () => void }) => {
    return (
        <Card onClick={onConnect} className="bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-black rounded-lg">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-grow">
                    <p className="font-bold">{name}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function SyncWalletsPage() {
    const router = useRouter();

    const handleConnect = () => {
        // For simulation, all connections lead to the processing page
        router.push('/processing?from=freelancer');
    };

    const handleSkip = () => {
        // Skip and go to the dashboard or next step
        router.push('/dashboard');
    }

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
                        <p>Let's get your accounts in sync. Connect your platforms to automatically track your income and payments. It's secure and makes bookkeeping a breeze!</p>
                    </ChatBubble>

                    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-center my-6">Connect Your Platforms</motion.h1>

                    <motion.div variants={containerVariants} className="space-y-3">
                        {platforms.map(platform => (
                            <motion.div key={platform.id} variants={itemVariants}>
                                <PlatformCard
                                    name={platform.name}
                                    icon={platform.icon}
                                    onConnect={handleConnect}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
             </div>

            <motion.div
                className="w-full pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Button onClick={handleSkip} variant="ghost" className="w-full text-muted-foreground">
                    <SkipForward className="mr-2" />
                    I'll do this later
                </Button>
            </motion.div>
        </main>
    );
}
