
'use client';

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useState } from "react";
import Image from 'next/image';

const Ripple = ({ ripples }: { ripples: { x: number, y: number, id: number }[] }) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-full">
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          initial={{ x: ripple.x - 50, y: ripple.y - 50, scale: 0, opacity: 1, width: 100, height: 100 }}
          animate={{ scale: 10, opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default function OnboardingPage() {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const handleRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(current => current.filter(r => r.id !== newRipple.id));
    }, 750);
  };

  return (
    <motion.main 
      className="relative flex flex-col flex-grow h-full text-primary overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 -z-10 bg-white overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-gradient-to-br from-[#bad6eb] to-[#334eac] rounded-full opacity-20 animate-blob" />
        <div className="absolute top-0 -right-1/4 w-96 h-96 bg-gradient-to-tr from-[#bad6eb] to-white rounded-full opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#334eac] to-white rounded-full opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow h-full p-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-xl font-bold">
            GabAI
            <sup className="text-xs font-bold top-[-0.5em]">┐</sup>
          </div>
        </motion.header>

        <div className="flex-grow flex items-end justify-center pb-10">
            <motion.div
              className="relative w-80 h-80"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src="/welcome/gabi_img.png"
                  width={320}
                  height={320}
                  alt="Gabi Illustration"
                  data-ai-hint="robot mascot"
                  priority
                />
              </motion.div>
            </motion.div>
        </div>

        <motion.footer 
          className="relative z-10 flex flex-col gap-4 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { },
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.6 }
            }
          }}
        >
           <motion.div 
             className="bg-white/30 backdrop-blur-lg p-6 rounded-3xl border border-white/40 shadow-lg flex flex-col gap-6"
             variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-primary">
                Your Financial Co-Pilot has Arrived.
              </h1>
              <p className="font-semibold text-primary/80 text-lg mt-2">
                From sales tracking to tax prep, let's grow your hustle.
              </p>
            </div>

            <div>
              <Button asChild className="relative w-full h-16 bg-black text-primary-foreground rounded-full overflow-hidden text-lg" onClick={handleRipple}>
                <Link href="/upload-intro">
                  <Ripple ripples={ripples} />
                  <span className="z-10 font-semibold">Get Started</span>
                  <ArrowUpRight className="w-5 h-5 z-10" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.p 
            className="text-center text-sm text-primary/70"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Already have an account?{' '}
            <Link href="#" className="font-semibold text-primary underline">
              Sign in
            </Link>
          </motion.p>
        </motion.footer>
      </div>
    </motion.main>
  );
}
