
'use client';

import Link from 'next/link';
import {
  MessageSquare,
  Mic,
  Sparkles,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  History,
  PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';

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

const proactiveInsights = [
    { type: 'alert', icon: AlertTriangle, text: "Your 'Software' spending is up 30% this month. Tap to review.", href: '#', iconColor: 'text-yellow-500' },
    { type: 'opportunity', icon: TrendingUp, text: "Your top client, 'Innovate Corp', hasn't had a new project in 60 days. Time for a follow-up?", href: '#', iconColor: 'text-emerald-500' },
    { type: 'forecast', icon: Lightbulb, text: "Looking ahead, next month could be slow. Let's plan a promo to boost sales.", href: '#', iconColor: 'text-blue-500' },
];

const historyItems = [
  {
    prompt: 'Show my top expenses.',
    response: 'Your top expense was Product Costs at ₱8,500...',
    href: '/chat/session',
  },
  {
    prompt: 'Draft an invoice reminder.',
    response: 'Okay, here is the draft of your invoice...',
    href: '/chat/session',
  },
];

export default function ChatHubPage() {
  const userName = "Juan";

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
            <motion.div variants={itemVariants}>
                <AppHeader userName={`${userName} dela Cruz`} />
            </motion.div>

            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">Hi {userName}, I'm ready to help.</h1>
            </motion.div>

            <motion.section variants={itemVariants}>
                <div className="grid grid-cols-2 gap-4 h-40">
                    <Link href="/chat/session">
                        <Card className="h-full bg-primary/20 border-primary/30 rounded-2xl group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4">
                            <MessageSquare className="w-10 h-10 text-primary mb-2" />
                            <h3 className="text-lg font-semibold text-primary">Chat with Gabi</h3>
                            <p className="text-xs text-primary/80 mt-1">Type your questions.</p>
                        </Card>
                    </Link>
                    <Link href="/chat/talk">
                         <Card className="h-full bg-primary/10 border-primary/20 rounded-2xl group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4">
                            <Mic className="w-10 h-10 text-primary mb-2" />
                            <h3 className="text-lg font-semibold text-primary">Talk to Gabi</h3>
                            <p className="text-xs text-primary/80 mt-1">Use voice commands.</p>
                        </Card>
                    </Link>
                </div>
            </motion.section>

             <motion.section variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Here's What I'm Seeing...
                    <Badge variant="default" className="bg-primary/80">Pro</Badge>
                </h2>
                <div className="space-y-3">
                    {proactiveInsights.map((insight, index) => (
                        <Link href={insight.href} key={index}>
                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Card className="rounded-2xl mb-2 bg-background/30 transition-colors hover:bg-muted/40">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <insight.icon className={cn("w-6 h-6 flex-shrink-0", insight.iconColor)} />
                                        <p className="font-medium text-sm flex-grow">{insight.text}</p>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.section>
            
            <motion.section variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Automations & Shortcuts
                </h2>
                <Card className="rounded-2xl bg-background/30 transition-colors hover:bg-muted/40">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                        <div className="p-3 bg-muted rounded-full">
                           <Sparkles className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="font-semibold">Automate your recurring tasks.</p>
                        <p className="text-sm text-muted-foreground">"Generate my standard monthly report for my boss."</p>
                        <Button variant="outline" className="rounded-full mt-2 bg-background/50" disabled>
                            <PlusCircle className="mr-2" />
                            Create New Shortcut
                        </Button>
                    </CardContent>
                </Card>
            </motion.section>
            
            <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2"><History className="w-5 h-5"/>Recent Conversations</h2>
                    <Link href="#" className="text-sm text-primary">See all</Link>
                </div>
                <div className="space-y-3">
                    {historyItems.map((item, index) => (
                        <Link href={item.href} key={index}>
                            <motion.div
                                className="p-3 rounded-2xl bg-background/30 transition-colors hover:bg-muted/40"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <p className="font-semibold"><span className="text-muted-foreground">You:</span> {item.prompt}</p>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-muted-foreground mt-1">
                                    <p className="truncate"><span className="text-accent font-semibold">Gabi:</span> {item.response}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.section>
        </motion.div>
      </main>
      <AppFooter />
    </div>
  );
}
