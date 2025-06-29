'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Upload, ArrowRight, Info, Sheet, BarChart3, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

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
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="bg-foreground/10 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

export default function SyncDataPage() {
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
            <p>Great choice! We'll upload a sales report to instantly see your numbers. Don't worry, I'll show you exactly how.</p>
          </ChatBubble>

          <motion.div variants={itemVariants} className="flex justify-center items-center gap-4 my-8">
             <Sheet className="h-16 w-16 text-foreground/50" />
             <ArrowRight className="h-8 w-8 text-foreground/70" />
             <BarChart3 className="h-16 w-16 text-accent" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold mb-2">Upload your Shopee Income Report</h1>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4 my-8">
            <Button className="w-full h-14 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="mr-2" />
              Upload Report (.csv/.xlsx)
            </Button>
            <Button asChild variant="ghost" className="w-full h-14 text-lg font-semibold rounded-full text-foreground hover:bg-foreground/10">
              <Link href="/dashboard">
                I'll do this later
              </Link>
            </Button>
          </motion.div>

           <motion.div variants={itemVariants} className="text-sm text-muted-foreground">
             <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm text-foreground">
                  <Info className="h-4 w-4 mr-1" />
                  Show me how to get this file from Shopee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-md border-white/20">
                <DialogHeader>
                  <DialogTitle>How to get your report</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-muted-foreground">
                    <p>Follow these simple steps in your Shopee Seller Centre:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Go to <strong>My Income</strong>.</li>
                        <li>Click on <strong>Income Details</strong>.</li>
                        <li>Select your date range and click <strong>Export</strong>.</li>
                        <li>The file will be downloaded to your device.</li>
                    </ol>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Got it
                        </Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
           </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
