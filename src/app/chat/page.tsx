
'use client';

import Link from 'next/link';
import {
  MessageSquare,
  Mic,
  Bot,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const suggestedPrompts = [
    { title: "What was my profit last month?", href: "/chat/session" },
    { title: "Create a receipt for my latest sale.", href: "/chat/session" },
    { title: "How can I reduce my expenses?", href: "/chat/session" },
    { title: "Draft a follow-up email to a client.", href: "/chat/session" },
];

const historyItems = [
  {
    prompt: 'Show my top expenses.',
    response: 'Your top expense was Product Costs at ₱8,500...',
    href: '#',
  },
  {
    prompt: 'Draft a payment reminder.',
    response: 'Subject: Friendly Reminder: Invoice #123 Due',
    href: '#',
  },
  {
    prompt: 'Is it a good time to run a promo?',
    response: 'Based on your current sales trend, running a promo this weekend could boost engagement.',
    href: '#',
  },
];

export default function ChatHubPage() {
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
                <AppHeader userName="Juan dela Cruz" />
            </motion.div>

            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">Hi there, I'm Gabi.</h1>
                <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">
                    Your financial co-pilot. How can I help?
                </h2>
            </motion.div>

            <motion.section variants={itemVariants}>
                <div className="grid grid-cols-2 gap-4 h-40">
                    <Link href="/chat/session">
                        <Card className="h-full bg-primary/20 border-primary/30 rounded-2xl relative group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4">
                            <MessageSquare className="w-10 h-10 text-primary mb-2" />
                            <h3 className="text-lg font-semibold text-primary">Chat with Gabi</h3>
                            <p className="text-xs text-primary/80 mt-1">Type your questions and commands.</p>
                        </Card>
                    </Link>
                    <Link href="/chat/talk">
                         <Card className="h-full bg-primary/10 border-primary/20 rounded-2xl relative group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4">
                            <Mic className="w-10 h-10 text-primary mb-2" />
                            <h3 className="text-lg font-semibold text-primary">Talk to Gabi</h3>
                            <p className="text-xs text-primary/80 mt-1">Go hands-free with voice commands.</p>
                        </Card>
                    </Link>
                </div>
            </motion.section>

             <motion.section variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Things I Can Help With
                </h2>
                <div className="space-y-3">
                    {suggestedPrompts.map((prompt, index) => (
                        <Link href={prompt.href} key={index}>
                            <motion.div whileTap={{ scale: 0.98 }}>
                                <Card className="rounded-2xl bg-background/30 transition-colors hover:bg-muted/40">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <p className="font-semibold">{prompt.title}</p>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.section>
            
            <motion.section variants={itemVariants} className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Recent Conversations</h2>
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
