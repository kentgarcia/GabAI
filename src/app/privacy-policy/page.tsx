'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <header className="mb-8">
        <Button asChild variant="ghost" className="text-foreground hover:bg-foreground/10">
          <Link href="/sync-data">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </header>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Our Commitment to Your Privacy</h2>
            <p>
              This is a placeholder for your privacy policy. You should replace this with your actual privacy policy content.
            </p>
            <p>
              We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Your trust is paramount, and we've built our app on a foundation of privacy-by-design.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">1. The Information We Don't Collect</h2>
            <p>
              We want to be crystal clear: we do not collect, store, or have access to the raw files (e.g., .csv sales summaries) you upload. All processing of these files happens locally on your device. The data never touches our servers.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">2. Information We Do Collect</h2>
            <p>
              To provide our service, we only store the analyzed, aggregated, and anonymized results of your data. This includes metrics like total sales, daily trends, and product performance. This information is stored securely and is associated with your account.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">3. How We Use Your Information</h2>
            <p>
              Having access to the analyzed data permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use this data to:
            </p>
             <ul className="list-disc list-inside space-y-2 mt-2 pl-4">
                <li>Create and manage your account.</li>
                <li>Generate personalized insights and visualizations.</li>
                <li>Improve the features and performance of the application.</li>
              </ul>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">4. Your Control and Rights</h2>
            <p>
             You are in complete control. You can view, manage, and delete your analyzed data from within the application at any time. Deleting your account will permanently remove all associated data from our systems.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
