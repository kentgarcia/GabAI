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

export default function UploadIntroPage() {
  return (
    <main className="flex flex-col flex-grow justify-between p-6 text-foreground">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="relative flex justify-center items-center mb-8">
             <Image 
                src="/onboarding/img_gulo-gets.png"
                width={340}
                height={340}
                alt="Illustration showing messy papers turning into organized charts"
                data-ai-hint="illustration chaos order"
             />
              <motion.div
                  className="absolute top-10 right-10 text-yellow-400"
                  animate={{ 
                    scale: [0, 1, 1.2, 1, 0],
                    opacity: [0, 1, 1, 1, 0],
                    rotate: [0, -15, 15, 0, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              >
                  <Sparkles className="w-8 h-8" fill="currentColor" />
              </motion.div>
              <motion.div
                  className="absolute bottom-1/4 left-5 text-yellow-400"
                   animate={{ 
                    scale: [0, 1, 1.2, 1, 0],
                    opacity: [0, 1, 1, 1, 0],
                    rotate: [0, 15, -15, 0, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              >
                  <Sparkles className="w-6 h-6" fill="currentColor" />
              </motion.div>
              <motion.div
                  className="absolute bottom-10 right-1/4 text-yellow-400"
                   animate={{ 
                    scale: [0, 1, 1.2, 1, 0],
                    opacity: [0, 1, 1, 1, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
              >
                  <Sparkles className="w-5 h-5" fill="currentColor" />
              </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
            From 'Gulo' to 'Gets'
          </motion.h1>

          <motion.p variants={itemVariants} className="text-muted-foreground mb-8 max-w-xs mx-auto">
            Easily upload your sales reports from Shopee, Lazada, and more. Kami na ang bahalang mag-ayos at mag-compute para sa'yo.
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
          <Link href="/meet-gabi">
            Next
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
