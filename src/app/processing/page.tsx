'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bot, FileText, ArrowRight, BarChart3, Lightbulb, Receipt } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'seller'; // Default to seller

  useEffect(() => {
    const timer = setTimeout(() => {
      if (from === 'seller') {
        router.push(`/first-look?from=seller`);
      } else {
        router.push('/confirm-income');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [router, from]);

  const sellerContent = {
      message: "Analyzing your report... I'm categorizing your sales, calculating your initial profit, and finding your top-selling items...",
      animation: (
        <>
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                <FileText className="h-20 w-20 text-foreground/60" />
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
             >
                <ArrowRight className="h-10 w-10 text-foreground/80" />
            </motion.div>
             <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
             >
                <BarChart3 className="h-20 w-20 text-accent" />
             </motion.div>
        </>
      ),
       tip: "Tracking your income is the first step to scaling your business."
  };
  
  const freelancerContent = {
      message: "Okay, reading the screenshot... I see a payment, the sender's name, and the amount...",
      animation: (
         <>
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                <Receipt className="h-20 w-20 text-foreground/60" />
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
             >
                <ArrowRight className="h-10 w-10 text-foreground/80" />
            </motion.div>
             <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
             >
                <BarChart3 className="h-20 w-20 text-accent" />
             </motion.div>
        </>
      ),
       tip: "Gabi can help you turn payments into BIR-ready official receipts in seconds."
  };

  const content = from === 'seller' ? sellerContent : freelancerContent;

  return (
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground overflow-hidden">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ChatBubble>
            <p>{content.message}</p>
          </ChatBubble>

          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 my-16">
            {content.animation}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
            <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p><span className="font-semibold text-foreground/80">Did you know?</span> {content.tip}</p>
        </div>
      </motion.div>
    </main>
  );
}
