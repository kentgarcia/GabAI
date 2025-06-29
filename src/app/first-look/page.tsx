
'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Bot, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
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
        className="flex items-start gap-3 mt-8"
    >
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground text-left">
            {children}
        </div>
    </motion.div>
);

function FirstLookContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const content = {
    seller: {
      metric: 'Total Sales',
      value: '₱45,231.84',
      subMetric: 'from your Shopee report for Jan 2024'
    },
    freelancer: {
      metric: 'Total Income Logged',
      value: '₱10,000.00',
      subMetric: 'from your project with Awesome Client Inc.'
    }
  };

  const currentContent = from === 'freelancer' ? content.freelancer : content.seller;

  return (
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">
            Ready! Here's your first look.
          </motion.h1>

          <motion.div variants={itemVariants} className="bg-primary/10 backdrop-blur-md border border-primary/20 rounded-2xl p-6 my-8">
            <p className="text-sm text-primary/80">{currentContent.metric}</p>
            <p className="text-5xl font-bold text-primary my-2">{currentContent.value}</p>
            <p className="text-xs text-muted-foreground">{currentContent.subMetric}</p>
          </motion.div>

          <ChatBubble>
            <p>Congratulations on taking your first step! Let's go to your main dashboard to see the full picture.</p>
          </ChatBubble>

        </motion.div>
      </div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button asChild className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
          <Link href="/dashboard">
            Show Me My Dashboard!
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}

const LoadingFallback = () => (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading Page...</p>
    </div>
);

export default function FirstLookPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FirstLookContent />
    </Suspense>
  );
}
