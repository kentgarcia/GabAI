'use client';

import { useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const SparkleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 0L15.6962 12.3038L28 14L15.6962 15.6962L14 28L12.3038 15.6962L0 14L12.3038 12.3038L14 0Z"/>
    </svg>
);

const TeardropIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 17 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M16.2031 11.5C16.2031 17.8513 12.5781 23 8.45312 23C4.32812 23 0.703125 17.8513 0.703125 11.5C0.703125 5.14873 4.32812 0 8.45312 0C12.5781 0 16.2031 5.14873 16.2031 11.5Z"/>
    </svg>
);

type Ripple = {
  x: number;
  y: number;
  size: number;
  id: number;
};

export default function OnboardingPage() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
  };

  const titleLines = ["Kumusta, ka-GabAI!", "Let’s grow", "your hustle."];

  const createRipple = (event: MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    const rect = link.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };
    
    setRipples(prevRipples => [...prevRipples, newRipple]);
  };

  const onRippleAnimationEnd = (id: number) => {
    setRipples(prevRipples => prevRipples.filter(r => r.id !== id));
  };

  return (
    <main className="bg-white text-black min-h-screen flex flex-col justify-end p-6 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute -top-12 -right-12 w-48 h-48 bg-[#D9BFFF]/50 rounded-full" 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute top-8 -right-24 w-48 h-48 bg-[#AFFFDF]/50 rounded-full" 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
      <motion.div
        initial={{ opacity: 0, rotate: -30, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <SparkleIcon className="absolute top-24 left-8 w-10 h-10 text-black" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 30, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TeardropIcon className="absolute top-28 right-8 w-6 h-9 text-black" />
      </motion.div>
      <motion.div 
        className="absolute top-[40%] -left-20"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="w-40 h-40 rounded-full border-[24px] border-black"/>
      </motion.div>
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center w-full mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center w-full mt-4" variants={itemVariants}>
            <h1 className="font-bold leading-tight">
              <span className="block text-4xl">{titleLines[0]}</span>
              <span className="block text-5xl">{titleLines[1]}</span>
              <span className="block text-5xl">
                {titleLines[2]}
                <motion.span
                  initial={{scale: 0, rotate: -180}}
                  animate={{scale: 1, rotate: 0}}
                  transition={{delay: 0.8, type: 'spring', stiffness: 150}}
                  className="inline-block"
                >
                  <SparkleIcon className="w-6 h-6 inline-block ml-2 text-black" />
                </motion.span>
              </span>
            </h1>
        </motion.div>
        <motion.div variants={itemVariants} className="w-full">
          <Button asChild className="w-full mt-8 bg-black text-white rounded-full h-16 text-lg font-semibold hover:bg-gray-800 active:bg-gray-900 relative overflow-hidden">
            <Link href="/dashboard" onClick={createRipple}>
                Get Started
                <ArrowRight className="ml-2" />
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full scale-0 animate-ripple bg-white/70"
                    style={{
                      width: ripple.size,
                      height: ripple.size,
                      left: ripple.x,
                      top: ripple.y,
                    }}
                    onAnimationEnd={() => onRippleAnimationEnd(ripple.id)}
                  />
                ))}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
