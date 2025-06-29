
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar as CalendarIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

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

const presets = [
  'Last Month',
  'Last Quarter',
  'Year to Date',
];

export default function GeneratePnlPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState('Last Quarter');
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -90),
    to: new Date(),
  });

  const handleGenerate = () => {
    const from = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
    const to = date?.to ? format(date.to, 'yyyy-MM-dd') : '';
    router.push(`/reports/preview/pnl?from=${from}&to=${to}`);
  };

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col flex-grow"
      >
        <motion.header variants={itemVariants} className="flex items-center gap-2 mb-8">
          <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
            <Link href="/reports">
              <ArrowLeft />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Generate P&L Statement</h1>
        </motion.header>

        <motion.div variants={itemVariants} className="flex-grow">
          <Card className="w-full bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
              <div className="flex gap-2 mb-4">
                {presets.map((preset) => (
                  <Button
                    key={preset}
                    variant={selectedPreset === preset ? 'default' : 'outline'}
                    className="rounded-full bg-black text-white"
                    onClick={() => setSelectedPreset(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>

              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="pt-8"
        >
          <Button
            onClick={handleGenerate}
            disabled={!date}
            className="w-full bg-black text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-black/90"
          >
            <FileText className="mr-2" />
            Generate Report
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
