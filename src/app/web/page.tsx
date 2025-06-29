'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function WebAppPage() {
  useEffect(() => {
    document.body.classList.add('web-view');
    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('web-view');
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between h-16 px-8 bg-card border-b border-border shrink-0">
        <h1 className="text-2xl font-bold">GabAI Web Portal</h1>
        <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-4">
                <Link href="/web" className="text-sm font-medium hover:underline">Dashboard</Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline">Analytics</Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline">Settings</Link>
            </nav>
            <Link href="/dashboard">
                <Button variant="outline">
                    Go to Mobile App
                </Button>
            </Link>
        </div>
      </header>
      <main className="flex-1 p-8 bg-muted/40">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Your Web View</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a separate, full-screen experience for desktop users. You can manage your business at a larger scale here.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Desktop Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Placeholder for web-specific analytics charts and data.</p>
              <div className="w-full h-48 mt-4 bg-muted rounded-md animate-pulse"></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button>Generate Annual Report</Button>
              <Button variant="outline">Invite Team Member</Button>
              <Button variant="outline">View All Transactions</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
