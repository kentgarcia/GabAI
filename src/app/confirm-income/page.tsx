'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
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
        <Image src="/gabi-avatar.png" width={40} height={40} alt="Gabi" className="rounded-full flex-shrink-0" data-ai-hint="robot assistant" />
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

const mockedServices = ['Graphic Design', 'Writing & Content'];

export default function ConfirmIncomePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    setTimeout(() => {
        router.push('/first-look?from=freelancer');
    }, 1500);
  };

  return (
    <main className="flex flex-col flex-grow justify-center p-6 text-foreground">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <AnimatePresence mode="wait">
                {!selectedService ? (
                    <motion.div key="selection" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <ChatBubble>
                            <p>I see a payment of <strong>₱5,000</strong> from 'Maria Dela Cruz'. I just need one more detail: which service was this for?</p>
                        </ChatBubble>
                        
                        <motion.div 
                            variants={containerVariants} 
                            className="space-y-3"
                        >
                            {mockedServices.map(service => (
                                <motion.div key={service} variants={itemVariants}>
                                    <Button
                                        variant="outline"
                                        className="w-full h-14 text-lg rounded-full"
                                        onClick={() => handleSelectService(service)}
                                    >
                                        {service}
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div key="confirmation" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                         <ChatBubble>
                            <div className="flex items-center gap-2">
                                <Check className="text-emerald-500"/>
                                <p>Got it!</p>
                            </div>
                        </ChatBubble>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </main>
  );
}
