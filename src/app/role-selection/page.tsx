
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Laptop, ArrowRight, Bot, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';


const roles = [
  { id: 'seller', title: 'Online Seller', subtitle: 'I sell products on Shopee, Lazada, TikTok, etc.', icon: ShoppingCart },
  { id: 'freelancer', title: 'Freelancer / Service Provider', subtitle: 'I offer services like design, writing, virtual assistance, etc.', icon: Laptop },
];

const sellerCategories = [
    'Fashion / Apparel', 
    'Health & Beauty', 
    'Electronics', 
    'Home & Living', 
    'Food & Beverage', 
    'Crafts & Collectibles',
];

const freelancerServices = [
    'Graphic Design', 
    'Writing & Content', 
    'Virtual Assistance', 
    'Social Media Mgmt', 
    'Web Development', 
    'Consulting',
];

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
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const ChatBubble = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        variants={itemVariants}
        className="flex items-start gap-3"
    >
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full">
            <Bot className="h-6 w-6 text-accent" />
        </div>
        <div className="bg-background/30 backdrop-blur-md rounded-2xl rounded-bl-none p-4 text-foreground">
            {children}
        </div>
    </motion.div>
);

const Question = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 variants={itemVariants} className="text-xl font-bold text-center my-6">
        {children}
    </motion.h2>
);

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');

  const question2Ref = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (roleId: string) => {
    if (!selectedRole) {
        setSelectedRole(roleId);
        setSelectedItems([]);
    }
  };
  
  const handleItemSelect = (item: string) => {
    setSelectedItems(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleAddCustomItem = () => {
    if (customItem && !selectedItems.includes(customItem)) {
        setSelectedItems(prev => [...prev, customItem]);
        setCustomItem('');
    }
  };

  useEffect(() => {
    if (selectedRole) {
      setTimeout(() => {
        question2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [selectedRole]);

  const getQuestion2 = () => {
    if (selectedRole === 'seller') {
        return {
            greeting: "Got it, a seller! Let's identify what you sell. This helps me organize your sales reports automatically.",
            question: "What are your main product categories?",
            options: sellerCategories,
            customPlaceholder: "Add a custom category..."
        };
    }
    if (selectedRole === 'freelancer') {
        return {
            greeting: "Awesome, a freelancer! Let's list your services so I can help track your most valuable projects.",
            question: "What services do you offer?",
            options: freelancerServices,
            customPlaceholder: "Add a specific service..."
        };
    }
    return null;
  }

  const question2 = getQuestion2();

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <div className="flex-grow w-full max-w-sm mx-auto flex flex-col justify-center overflow-y-auto no-scrollbar">
        <motion.div
            className="space-y-6 py-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ChatBubble>
                <p className="font-semibold">Hi there, welcome aboard!</p>
                <p>To give you the best guidance, let's quickly set up your profile.</p>
            </ChatBubble>

            <Question>What is the main focus of your hustle?</Question>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-3"
            >
                 {roles.map((role) => (
                    <motion.div
                        key={role.id}
                        variants={itemVariants}
                        whileTap={!selectedRole ? { scale: 0.97 } : {}}
                    >
                        <Card
                        onClick={() => handleRoleSelect(role.id)}
                        className={cn(
                            'transition-all duration-200 text-left overflow-hidden border',
                            !selectedRole && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5',
                            selectedRole === role.id
                            ? 'bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary'
                            : 'bg-background/30 backdrop-blur-md',
                            selectedRole && selectedRole !== role.id && 'opacity-50'
                        )}
                        >
                        <CardContent className="flex items-center p-4">
                            <role.icon className="h-8 w-8 mr-4 flex-shrink-0" />
                            <div>
                            <p className="font-semibold">{role.title}</p>
                            {role.subtitle && (
                                <p className="text-sm opacity-70">{role.subtitle}</p>
                            )}
                            </div>
                        </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-muted-foreground text-sm">What if I'm both?</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border">
                    <DialogHeader>
                      <DialogTitle>No worries!</DialogTitle>
                    </DialogHeader>
                    <div className="py-2">
                      <p className="text-muted-foreground">Pick your main focus for now. You can track both inside the app.</p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" className="w-full bg-black text-primary-foreground">Got it</Button>
                        </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </motion.div>


            <AnimatePresence>
                {question2 && (
                    <motion.div
                        ref={question2Ref}
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <ChatBubble>
                            <p>{question2.greeting}</p>
                        </ChatBubble>
                        <Question>{question2.question}</Question>
                        <motion.p variants={itemVariants} className="text-sm text-center text-muted-foreground -mt-4 mb-4">Tap all that apply.</motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center">
                            {question2.options.map(option => (
                                <Button 
                                    key={option}
                                    variant={selectedItems.includes(option) ? "default" : "outline"}
                                    className="rounded-full h-auto py-2 transition-all duration-200"
                                    onClick={() => handleItemSelect(option)}
                                >
                                    {selectedItems.includes(option) && <Check className="mr-1.5 h-4 w-4" />}
                                    {option}
                                </Button>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex gap-2 items-center pt-2">
                            <Input 
                                placeholder={question2.customPlaceholder} 
                                value={customItem}
                                onChange={e => setCustomItem(e.target.value)}
                                className="bg-background/30"
                            />
                            <Button onClick={handleAddCustomItem} disabled={!customItem} size="icon" className="shrink-0 bg-black text-white">
                                <Plus />
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      </div>

      <div className="w-full max-w-sm mx-auto pb-4 pt-8">
        <AnimatePresence>
            {selectedRole && selectedItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                    asChild
                    className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90"
                    >
                    <Link href={selectedRole === 'seller' ? '/sync-data' : '/log-income'}>
                        Next
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
