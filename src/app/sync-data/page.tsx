'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Upload, ArrowRight, Lock, Info, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

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

export default function SyncDataPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-6 bg-white text-black">
      <div className="flex-grow flex flex-col justify-center">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h1 className="text-3xl font-bold mb-2">Want to see how your sales are doing?</h1>
            <p className="text-gray-500 mb-8">
              Upload your Shopee/TikTok sales summary (.csv)
              <br />
              OR use sample data
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 mb-12">
            <Button className="w-full h-14 text-lg font-semibold rounded-full bg-black text-white hover:bg-gray-800">
              <Upload className="mr-2" />
              Upload Sales File
            </Button>
            <Button asChild variant="ghost" className="w-full h-14 text-lg font-semibold rounded-full text-black hover:bg-gray-100">
              <Link href="/dashboard">
                Try Sample Data Instead
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-sm text-gray-500 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-4 w-4 mr-2" />
              <h3 className="font-semibold text-gray-700">Your Data Stays Private</h3>
            </div>
            <p className="px-4">
              We don’t store your raw files. We analyze them locally on your device and let you control everything.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm mt-2 text-black">
                  <Info className="h-4 w-4 mr-1" />
                  Learn more
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Our Bulletproof Privacy Promise</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 text-gray-600">
                  <p>
                    Your privacy is our top priority. We've designed our system to give you complete control over your data.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Local Analysis:</strong> All file processing and data analysis happen directly on your device, not on our servers.
                    </li>
                    <li>
                      <strong>No Data Storage:</strong> We do not upload, save, or store your raw data files.
                    </li>
                    <li>
                      <strong>You're in Control:</strong> You have the final say on what data is used and can delete it at any time.
                    </li>
                  </ul>
                  <p>
                    For a full breakdown of our data practices, please read our complete{' '}
                    <Link href="/privacy-policy" className="text-black font-medium underline hover:text-gray-700">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" className="w-full bg-black text-white hover:bg-gray-800">
                            Got it
                        </Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
