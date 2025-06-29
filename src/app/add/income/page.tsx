'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from "date-fns"
import { Calendar as CalendarIcon, Bot, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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
    const router = useRouter();
    const { toast } = useToast();

    const handleLogIncome = () => {
        toast({
            title: "✅ Income Logged!",
            description: "Your transaction has been added to the dashboard.",
        });
        router.push('/dashboard');
    }

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
        <header className="flex items-center gap-2 mb-4 -ml-2">
            <Button asChild variant="ghost" size="icon">
                <Link href="/add">
                    <ArrowLeft />
                </Link>
            </Button>
            <h1 className="text-2xl font-bold">Log Income</h1>
        </header>

      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name / Payer</Label>
                    <Input id="client-name" placeholder="e.g., Awesome Client Inc." className="bg-background/30 backdrop-blur-md border" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="project">Project/Service/Item</Label>
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
         <Button onClick={handleLogIncome} className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
            + Log Income
         </Button>
      </motion.div>
    </main>
  );
}
