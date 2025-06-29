
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ListFilter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    transition: { type: 'spring', stiffness: 100 },
  },
};

const mockReceipts = [
  { id: 1, clientName: 'Awesome Client Inc.', receiptNumber: 'OR-0004', amount: '5,000.00', date: 'Jul 15, 2024', status: 'Paid' },
  { id: 2, clientName: 'Stripe Payout', receiptNumber: 'OR-0003', amount: '800.00', status: 'Paid', date: 'Jul 14, 2024' },
  { id: 3, clientName: 'Adsense Payout', receiptNumber: 'OR-0002', amount: '950.00', status: 'Sent', date: 'Jul 12, 2024' },
  { id: 4, clientName: 'Client Payment', receiptNumber: 'OR-0001', amount: '15,000.00', status: 'Sent', date: 'Jul 1, 2024' },
];

const formatCurrency = (value: string) => `₱${value}`;

export default function ReceiptHistoryPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredReceipts = mockReceipts
    .filter(receipt => filter === 'All' || receipt.status === filter)
    .filter(receipt =>
      receipt.clientName.toLowerCase().includes(search.toLowerCase()) ||
      receipt.receiptNumber.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground bg-muted">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col flex-grow"
      >
        <motion.header variants={itemVariants} className="flex items-center gap-2 mb-4">
          <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
            <Link href="/reports">
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Receipt History</h1>
        </motion.header>

        <motion.div variants={itemVariants} className="flex gap-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by client or receipt #..."
              className="pl-10 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-background">
                <ListFilter className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Paid">Paid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Sent">Sent</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <div className="flex-grow space-y-3 overflow-y-auto no-scrollbar">
          {filteredReceipts.length > 0 ? (
            filteredReceipts.map(receipt => (
              <motion.div key={receipt.id} variants={itemVariants}>
                <Link href="#">
                  <Card className="rounded-lg bg-background transition-colors hover:bg-background/80">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-grow">
                        <p className="font-semibold">{receipt.clientName}</p>
                        <p className="text-sm text-muted-foreground">{receipt.receiptNumber} · {receipt.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(receipt.amount)}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            'mt-1',
                            receipt.status === 'Paid' && 'text-emerald-500 border-emerald-500',
                            receipt.status === 'Sent' && 'text-blue-500 border-blue-500'
                          )}
                        >
                          {receipt.status}
                        </Badge>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
             <motion.div variants={itemVariants} className="text-center py-10 text-muted-foreground">
                <p>No receipts found.</p>
                <p className="text-sm">Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}
