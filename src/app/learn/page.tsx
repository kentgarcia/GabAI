
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppFooter } from '@/components/layout/AppFooter';
import { AppHeader } from '@/components/layout/AppHeader';
import { motion } from 'framer-motion';

export default function LearnPage() {
  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
        <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
            <AppHeader userName="Juan dela Cruz" />
            <div className="flex-grow flex items-center justify-center flex-col text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <h1 className="text-2xl font-bold mb-4">Learn Hub</h1>
                    <p className="text-muted-foreground mb-8 max-w-xs">This page is under construction. Come back soon for helpful articles and guides!</p>
                    <Button asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2" />
                            Back to Dashboard
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </main>
        <AppFooter />
    </div>
  );
}
