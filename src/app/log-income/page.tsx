'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { format } from "date-fns"
import { Calendar as CalendarIcon, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

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
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

export default function LogIncomePage() {
    const [date, setDate] = useState<Date>();

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <ChatBubble>
                <p>Got it. Let's log your first-ever project in GabAI to see it in action. Let's start with a recent one!</p>
            </ChatBubble>

            <motion.div variants={itemVariants} className='text-center'>
                 <h1 className="text-3xl font-bold mb-8">Log your first client payment</h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="e.g., Awesome Client Inc." className="bg-background/30 backdrop-blur-md border" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="project">Project/Service</Label>
                    <Input id="project" placeholder="e.g., Logo Design Package" className="bg-background/30 backdrop-blur-md border" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="amount">Amount Received (PHP)</Label>
                    <Input id="amount" type="number" placeholder="e.g., 10000" className="bg-background/30 backdrop-blur-md border" />
                </div>
                <div className="space-y-2">
                    <Label>Date Received</Label>
                     <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal bg-background/30 backdrop-blur-md border",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-background/80 backdrop-blur-md border">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </motion.div>
        </motion.div>
      </div>
      
      <motion.div
            className="w-full pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
       >
        <div className="space-y-3">
             <Button asChild className="w-full bg-primary text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-primary/90">
                <Link href="/processing">
                    + Log Income
                </Link>
             </Button>
             <Button asChild variant="ghost" className="w-full h-14 text-lg font-semibold rounded-full text-foreground hover:bg-foreground/10">
                <Link href="/dashboard">
                    I'll do this later
                </Link>
             </Button>
        </div>
      </motion.div>
    </main>
  );
}
