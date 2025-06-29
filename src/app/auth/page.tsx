'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M15.226 13.223c.333-1.018.04-2.14-.816-2.996a3.22 3.22 0 00-2.317-1.002c-.44 0-.87.1-1.28.29-.404.187-.816.43-1.28.71-.46.276-.928.52-1.44.69-.516.17-1.012.215-1.424.12-.516-.095-1.012-.345-1.44-.736a3.15 3.15 0 01-1.01-1.43c-1.24 1.765-1.28 3.84.04 5.485.62.8 1.448 1.294 2.456 1.43.44.06.88.016 1.28-.12.4-.14.776-.345 1.128-.62.46-.36.904-.736 1.44-.92.532-.186 1.08-.276 1.56-.276.48 0 .936.076 1.336.23.4.155.776.386 1.128.69a2.5 2.5 0 001.384.532c.1 0 .192-.012.288-.024.9-.13 1.62-.64 2.064-1.416a4.23 4.23 0 00-2.256-2.07zM14.8 4.41c-1.08-1.22-2.7-2.03-4.44-2.1A5.32 5.32 0 005.74 5.37c-2.04 3.44.48 7.62 2.92 9.42.476.36 1.012.62 1.584.76.572.14 1.12.16 1.6-.04.6-.2 1.152-.536 1.68-.976.52-.44.984-.976 1.36-1.584.81-1.348 1.01-2.91.56-4.32a4.67 4.67 0 01-1.32-2.34c.03-.01.05-.02.08-.03a4.2 4.2 0 012.6-1.15z"></path>
    </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
    </svg>
);

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

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-white text-black">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-4">
            Let's set up your space.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-500 mb-10 max-w-xs mx-auto">
            Create a secure account to manage your finances and get personalized insights.
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-3">
             <Button variant="outline" className="w-full h-14 rounded-full text-lg font-semibold border-gray-300">
                <GoogleIcon className="w-6 h-6 mr-3" />
                Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-14 rounded-full text-lg font-semibold border-gray-300">
                <AppleIcon className="w-7 h-7 mr-3" />
                Continue with Apple
            </Button>
             <Button asChild variant="outline" className="w-full h-14 rounded-full text-lg font-semibold border-gray-300">
                <Link href="/role-selection">
                    <Mail className="mr-3" />
                    Sign up with Email
                </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="#" className="font-semibold text-black underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
