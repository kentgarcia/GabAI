'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Laptop, Copy, Search, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const roles = [
  { id: 'seller', label: 'Online Seller', description: '(Shopee, FB, etc.)', icon: ShoppingCart },
  { id: 'freelancer', label: 'Freelancer', description: '(VA, Writer, Designer, etc.)', icon: Laptop },
  { id: 'both', label: 'Both', icon: Copy },
  { id: 'exploring', label: 'Just exploring', icon: Search },
];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 1 },
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

  return (
    <TooltipProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-white text-black">
        <div className="w-full max-w-sm text-center flex-grow flex flex-col justify-center">
          <motion.h1
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How do you earn online?
          </motion.h1>

          <motion.div
            className="grid grid-cols-1 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {roles.map((role) => (
              <motion.div
                key={role.id}
                variants={itemVariants}
                whileTap={{ scale: 0.97 }}
              >
                <Card
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    'cursor-pointer transition-all duration-200 text-left overflow-hidden',
                    'hover:shadow-md hover:-translate-y-0.5',
                    selectedRole === role.id
                      ? 'bg-black text-white ring-2 ring-offset-2 ring-black'
                      : 'bg-gray-100 hover:bg-gray-200'
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
          </motion.div>
        </div>

        <div className="w-full max-w-sm pb-4">
          <motion.div
            className="flex items-center justify-center text-sm text-gray-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Tooltip>
                <TooltipTrigger>
                    <Info className="h-4 w-4 mr-2" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>No pressure, you can change this later!</p>
                </TooltipContent>
            </Tooltip>
            <span>No pressure, you can change this later!</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Button
              asChild
              className="w-full bg-black text-white rounded-full h-16 text-lg font-semibold hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!selectedRole}
            >
              <Link href="/dashboard">
                Continue
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </TooltipProvider>
  );
}
