'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Mail, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.75 13.96c.25.41.41.86.41 1.36 0 1.94-1.57 3.51-3.51 3.51-1.12 0-2.11-.52-2.75-1.32L9 14.99c-.19-.34-.48-.63-.82-.82L5.67 12.28a3.5 3.5 0 010-4.56l1.87-1.87c.2-.2.43-.37.68-.51l2.8-1.5c1.4-.75 3.12-.39 4.22.71l.5.5c.34.34.63.74.85 1.17l1.49 2.8c.14.25.25.52.33.8zM12 2a10 10 0 100 20 10 10 0 000-20z"/>
    </svg>
);

export default function SharePage() {
  const router = useRouter();
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'sending' | 'sent'>('sending');

  useEffect(() => {
    const imageData = localStorage.getItem('receiptImage');
    if (imageData) {
      setReceiptImage(imageData);
      localStorage.removeItem('receiptImage');
    } else {
      router.push('/dashboard');
    }

    const sentTimer = setTimeout(() => {
        setStatus('sent');
    }, 2000);
    
    const redirectTimer = setTimeout(() => {
        router.push('/dashboard');
    }, 4000);

    return () => {
        clearTimeout(sentTimer);
        clearTimeout(redirectTimer);
    };

  }, [router]);

  return (
    <main className="flex flex-col flex-grow items-center justify-center p-6 text-foreground">
        <AnimatePresence mode="wait">
            {receiptImage && (
                <motion.div
                    key="share-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="w-full max-w-sm text-center"
                >
                    <motion.div variants={itemVariants} className="mb-8 h-24 flex flex-col justify-center">
                         <AnimatePresence mode="wait">
                            {status === 'sending' && (
                                <motion.div key="sending" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col items-center gap-4">
                                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                                    <p className="text-xl font-semibold">Sending Receipt...</p>
                                </motion.div>
                            )}
                            {status === 'sent' && (
                               <motion.div key="sent" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col items-center gap-4">
                                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                                    <p className="text-xl font-semibold">Sent Successfully!</p>
                                    <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    
                    <motion.div 
                        variants={itemVariants} 
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                        <Image
                            src={receiptImage}
                            alt="Receipt Preview"
                            width={400}
                            height={600}
                            className="rounded-lg shadow-2xl"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center gap-6 mt-8">
                        <div className="p-4 bg-muted/40 rounded-full"><MessageCircle className="w-8 h-8"/></div>
                        <div className="p-4 bg-muted/40 rounded-full"><WhatsAppIcon className="w-8 h-8"/></div>
                        <div className="p-4 bg-muted/40 rounded-full"><Mail className="w-8 h-8"/></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </main>
  );
}
