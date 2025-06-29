'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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

export default function MeetGabiPage() {
  return (
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl font-bold tracking-tighter mb-16">
            Meet <span className="text-primary">Gabi!</span>
          </motion.h1>
          
          <div className="relative flex justify-center items-center my-10">
            <motion.div 
                variants={itemVariants}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
            >
                <Image src="/gabi-avatar.png" width={224} height={224} alt="Gabi" className="rounded-full" data-ai-hint="robot assistant" />
            </motion.div>
            
            <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, type: 'spring', stiffness: 120 } }}
                className="absolute -top-4 right-0 sm:right-4 bg-background/50 backdrop-blur-md py-3 px-5 rounded-2xl rounded-tr-none shadow-lg"
            >
                <p className="text-lg font-semibold text-foreground">Need our help now?</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button asChild className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
          <Link href="/auth">
            Let's Get Started!
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
