'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bot, FileText, ArrowRight, BarChart3, Lightbulb } from 'lucide-react';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3500); // 3.5 seconds for the animation to play out a bit

    return () => clearTimeout(timer);
  }, [router]);

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
            <p>Okay, let me work my magic... Gabi is organizing your data and crunching the numbers!</p>
          </ChatBubble>

          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 my-16">
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
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
            <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <p><span className="font-semibold text-foreground/80">Did you know?</span> Tracking your income is the first step to scaling your business.</p>
        </div>
      </motion.div>
    </main>
  );
}
