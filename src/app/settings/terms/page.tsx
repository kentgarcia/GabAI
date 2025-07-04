'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <header className="mb-8">
        <Button asChild variant="ghost" className="text-foreground hover:bg-foreground/10">
          <Link href="/settings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Settings
          </Link>
        </Button>
      </header>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">1. Acceptance of Terms</h2>
            <p>
              This is a placeholder for your Terms of Service. You should replace this with your actual content.
            </p>
            <p>
              By accessing or using the GabAI application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">2. Description of Service</h2>
            <p>
              GabAI provides a financial co-pilot service designed to help users manage their business finances, including but not limited to, income and expense tracking, report generation, and AI-powered financial advice.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">3. User Responsibilities</h2>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">4. Intellectual Property</h2>
            <p>
             The Service and its original content, features, and functionality are and will remain the exclusive property of GabAI and its licensors. The Service is protected by copyright, trademark, and other laws of both the Philippines and foreign countries.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">5. Termination</h2>
            <p>
             We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">6. Limitation of Liability</h2>
            <p>
             In no event shall GabAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">7. Changes</h2>
            <p>
             We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>
           <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Contact Us</h2>
            <p>
             If you have any questions about these Terms, please contact us at support@gabai.app.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
