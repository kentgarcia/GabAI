import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">This page is under construction.</p>
        <Button asChild>
            <Link href="/settings">
                <ArrowLeft className="mr-2" />
                Back to Settings
            </Link>
        </Button>
    </div>
  );
}
