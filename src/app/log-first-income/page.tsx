'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, ArrowRight, BarChart3, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
        className="flex items-start gap-3 mb-8"
    >
        <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full flex-shrink-0" data-ai-hint="robot assistant" />
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

export default function LogFirstIncomePage() {
  return (
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ChatBubble>
            <p>Great! Now let's log your first payment. You can use a screenshot of a payment notification (GCash, Maya, etc.) to do this instantly.</p>
          </ChatBubble>

          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 my-8">
             <Receipt className="h-16 w-16 text-foreground/50" />
             <ArrowRight className="h-8 w-8 text-foreground/70" />
             <BarChart3 className="h-16 w-16 text-accent" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold mb-2">Log your first income</h1>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4 my-8">
            <Button asChild className="w-full h-14 text-lg font-semibold rounded-full bg-black text-primary-foreground hover:bg-black/90">
              <Link href="/processing?from=freelancer">
                <Camera className="mr-2" />
                Scan Payment Screenshot
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full h-14 text-lg font-semibold rounded-full text-foreground hover:bg-foreground/10">
              <Link href="/add/income">
                Enter Manually
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
