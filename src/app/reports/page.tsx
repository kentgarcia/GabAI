
'use client';

import Link from 'next/link';
import { Bot, Gift, Home, Trophy, FileText, Landmark, BarChart3, ScrollText, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const reportOptions = [
  {
    icon: FileText,
    title: 'Profit & Loss Statement (P&L)',
    description: 'Your official income, expenses, and net profit. Perfect for business check-ups and loan applications.',
    href: '#',
  },
  {
    icon: Landmark,
    title: 'Tax Data Summary',
    description: 'A summary of your gross income and tax-deductible expenses to help you with BIR filings.',
    href: '#',
  },
  {
    icon: BarChart3,
    title: 'Sales Report',
    description: "Breakdown of sales by product or platform to see what's selling best.",
    href: '#',
  },
  {
    icon: ScrollText,
    title: 'Receipt & Invoice History',
    description: "View, resend, or download all the official receipts you've created.",
    href: '#',
  },
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

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 px-6 py-8 space-y-8 overflow-y-auto no-scrollbar pb-28">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">Generate a Report</h1>
                <p className="text-muted-foreground">Turn your data into professional documents.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {reportOptions.map((option) => (
                <Link href={option.href} key={option.title}>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 transition-colors hover:bg-muted/40">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                          <option.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">{option.title}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-black rounded-full h-14 flex justify-around items-center shadow-lg">
          <Link href="/dashboard" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="/reports" className="flex flex-col items-center text-primary hover:text-primary/90 transition-colors">
            <FileText className="w-5 h-5" />
          </Link>
          <Link href="/chat" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Gift className="w-5 h-5" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Trophy className="w-5 h-5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
