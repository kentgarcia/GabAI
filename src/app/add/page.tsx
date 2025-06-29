'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { AppFooter } from '@/components/layout/AppFooter';
import { Card, CardContent } from '@/components/ui/card';

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

export default function AddTransactionTypePage() {
  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
        <main className="flex-1 p-6 flex flex-col justify-center items-center">
            <motion.div
                className="w-full max-w-sm text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">
                    What would you like to add?
                </motion.h1>
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <Link href="/add/income">
                        <Card className="h-full bg-emerald-500/20 border-emerald-500/30 rounded-2xl group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4 aspect-square">
                            <ArrowUp className="w-12 h-12 text-emerald-500 mb-2" />
                            <h3 className="text-xl font-semibold text-emerald-600">Add Income</h3>
                        </Card>
                    </Link>
                    <Link href="/add/expense">
                         <Card className="h-full bg-red-500/10 border-red-500/20 rounded-2xl group transition-transform hover:scale-105 flex flex-col justify-center items-center text-center p-4 aspect-square">
                            <ArrowDown className="w-12 h-12 text-red-500 mb-2" />
                            <h3 className="text-xl font-semibold text-red-600">Add Expense</h3>
                        </Card>
                    </Link>
                </motion.div>
            </motion.div>
        </main>
        <AppFooter />
    </div>
  );
}
