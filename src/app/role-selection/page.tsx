'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Laptop, Copy, ArrowRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const roles = [
  { id: 'seller', label: 'Online Seller', description: '(Shopee, FB, etc.)', icon: ShoppingCart },
  { id: 'freelancer', label: 'Freelancer', description: '(VA, Writer, Designer, etc.)', icon: Laptop },
  { id: 'both', label: 'Both!', icon: Copy },
];

const sellingPlatforms = [
    { id: 'shopee', label: 'Shopee' },
    { id: 'lazada', label: 'Lazada' },
    { id: 'tiktok', label: 'TikTok Shop' },
    { id: 'social', label: 'Facebook/Instagram' },
    { id: 'other', label: 'Other' },
];

const paymentMethods = [
    { id: 'local', label: 'Local Bank Transfer / E-wallet' },
    { id: 'international', label: 'PayPal / Wise / etc.' },
    { id: 'both', label: 'Both' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const ChatBubble = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        variants={itemVariants}
        className="flex items-start gap-3"
    >
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full">
            <Bot className="h-6 w-6 text-primary" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-bl-none p-4 text-gray-800">
            {children}
        </div>
    </motion.div>
);

const Question = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 variants={itemVariants} className="text-xl font-bold text-center my-6">
        {children}
    </motion.h2>
);

const OptionsGrid = ({ children }: { children: React.ReactNode }) => (
     <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-3"
    >
        {children}
    </motion.div>
);


export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [secondarySelection, setSecondarySelection] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    if (!selectedRole) setSelectedRole(roleId);
  };
  
  const handleSecondarySelect = (selectionId: string) => {
    if (!secondarySelection) setSecondarySelection(selectionId);
  };

  const getQuestion2 = () => {
    if (selectedRole === 'seller' || selectedRole === 'both') {
        return {
            greeting: "Awesome! Para mas maintindihan ko ang business mo...",
            question: "What's your main selling platform?",
            options: sellingPlatforms,
        };
    }
    if (selectedRole === 'freelancer') {
        return {
            greeting: "Great! Nakakarelate ako. To help you better...",
            question: "How do you usually get paid?",
            options: paymentMethods,
        };
    }
    return null;
  }

  const question2 = getQuestion2();

  return (
    <main className="flex min-h-screen flex-col p-6 bg-white text-black">
      <div className="flex-grow w-full max-w-sm mx-auto flex flex-col justify-center">
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ChatBubble>
                <p className="font-semibold">Hi there! So nice to meet you.</p>
                <p>Para ma-personalize ko ang experience mo, tell me a bit about yourself.</p>
            </ChatBubble>

            <Question>What best describes you?</Question>
            
            <OptionsGrid>
                 {roles.map((role) => (
                    <motion.div
                        key={role.id}
                        variants={itemVariants}
                        whileTap={!selectedRole ? { scale: 0.97 } : {}}
                    >
                        <Card
                        onClick={() => handleRoleSelect(role.id)}
                        className={cn(
                            'transition-all duration-200 text-left overflow-hidden',
                            !selectedRole && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
                            selectedRole === role.id
                            ? 'bg-black text-white ring-2 ring-offset-2 ring-black'
                            : 'bg-gray-100',
                            selectedRole && selectedRole !== role.id && 'opacity-50'
                        )}
                        >
                        <CardContent className="flex items-center p-4">
                            <role.icon className="h-8 w-8 mr-4 flex-shrink-0" />
                            <div>
                            <p className="font-semibold">{role.label}</p>
                            {role.description && (
                                <p className="text-sm opacity-70">{role.description}</p>
                            )}
                            </div>
                        </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </OptionsGrid>

            <AnimatePresence>
                {question2 && (
                    <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <ChatBubble>
                            <p>{question2.greeting}</p>
                        </ChatBubble>
                        <Question>{question2.question}</Question>
                        <OptionsGrid>
                            {question2.options.map((option) => (
                                <motion.div 
                                    key={option.id} 
                                    variants={itemVariants}
                                    whileTap={!secondarySelection ? { scale: 0.97 } : {}}
                                >
                                    <Card
                                        onClick={() => handleSecondarySelect(option.id)}
                                        className={cn(
                                            'transition-all duration-200 text-left overflow-hidden',
                                            !secondarySelection && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
                                            secondarySelection === option.id
                                            ? 'bg-black text-white ring-2 ring-offset-2 ring-black'
                                            : 'bg-gray-100',
                                            secondarySelection && secondarySelection !== option.id && 'opacity-50'
                                        )}
                                    >
                                        <CardContent className="p-4">
                                            <p className="font-semibold text-center">{option.label}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </OptionsGrid>
                    </motion.div>
                )}
            </AnimatePresence>
             <AnimatePresence>
                {secondarySelection && (
                     <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <ChatBubble>
                            <p>Got it! Salamat. Let's get your finances set up. It's easier than you think!</p>
                        </ChatBubble>
                    </motion.div>
                )}
             </AnimatePresence>

        </motion.div>
      </div>

      <div className="w-full max-w-sm mx-auto pb-4 pt-8">
        <AnimatePresence>
            {secondarySelection && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                    asChild
                    className="w-full bg-black text-white rounded-full h-16 text-lg font-semibold hover:bg-gray-800 active:bg-gray-900"
                    >
                    <Link href="/sync-data">
                        Continue
                        <ArrowRight className="ml-2" />
                    </Link>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </main>
  );
}
