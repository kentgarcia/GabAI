'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-6 text-center bg-background/40 rounded-xl border">
        <Construction className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-2xl font-bold mb-4">Batch Transaction Entry</h1>
        <p className="text-muted-foreground mb-8">This page is under construction. Come back soon!</p>
        <Button asChild>
            <Link href="/web/actions">
                <ArrowLeft className="mr-2" />
                Back to Actions Hub
            </Link>
        </Button>
    </div>
  );
}
