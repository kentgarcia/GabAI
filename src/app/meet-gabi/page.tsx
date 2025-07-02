'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground overflow-hidden">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
           <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight mb-4">
            Meet Gabi — Your Smart <span className="text-primary">Kasangga sa Finances</span>
          </motion.h1>

           <motion.div 
                variants={itemVariants}
                className="relative flex justify-center items-center my-8"
            >
                 <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    <Image src="/onboarding/img_hi.png" width={300} height={300} alt="Gabi" data-ai-hint="robot mascot" />
                </motion.div>
                
                {/* Particles */}
                <motion.div
                    className="absolute top-0 left-5 text-accent"
                    animate={{ scale: [0, 1, 1.2, 1, 0], y: [0, -20, 0], opacity: [0, 1, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                    <Sparkles className="w-8 h-8" fill="currentColor" />
                </motion.div>
                
                <motion.div
                    className="absolute bottom-10 right-5 text-primary"
                    animate={{ scale: [0, 1, 0], rotate: [0, 15, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    <Sparkles className="w-6 h-6" fill="currentColor" />
                </motion.div>

                <motion.div
                    className="absolute top-1/2 -right-2 text-accent"
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                >
                    <Sparkles className="w-5 h-5" fill="currentColor" />
                </motion.div>
            </motion.div>
          
          <motion.p variants={itemVariants} className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Gabi is here to help you every step of the way — from organizing reports to computing your taxes. Gawin nating mas simple at mas klaro ang finances mo, together!
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button asChild className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90">
          <Link href="/upload-intro">
            Let's Go with Gabi
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
