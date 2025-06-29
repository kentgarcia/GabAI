
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar as CalendarIcon, FileText, Lightbulb } from 'lucide-react';
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
import { startOfQuarter, endOfQuarter, startOfYear, endOfYear, format } from 'date-fns';
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
  '1st Quarter',
  '2nd Quarter',
  '3rd Quarter',
  '4th Quarter',
  'Full Year',
];

const getPresetDateRange = (preset: string): DateRange => {
    const now = new Date();
    const year = now.getFullYear();
    switch (preset) {
        case '1st Quarter':
            return { from: startOfQuarter(new Date(year, 0)), to: endOfQuarter(new Date(year, 0)) };
        case '2nd Quarter':
            return { from: startOfQuarter(new Date(year, 3)), to: endOfQuarter(new Date(year, 3)) };
        case '3rd Quarter':
            return { from: startOfQuarter(new Date(year, 6)), to: endOfQuarter(new Date(year, 6)) };
        case '4th Quarter':
            return { from: startOfQuarter(new Date(year, 9)), to: endOfQuarter(new Date(year, 9)) };
        case 'Full Year':
            return { from: startOfYear(now), to: endOfYear(now) };
        default:
            return { from: startOfQuarter(new Date(year, 6)), to: endOfQuarter(new Date(year, 6)) };
    }
}

export default function GenerateTaxSummaryPage() {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState('3rd Quarter');
  const [date, setDate] = useState<DateRange | undefined>(getPresetDateRange('3rd Quarter'));

  const handleSetPreset = (preset: string) => {
    setSelectedPreset(preset);
    setDate(getPresetDateRange(preset));
  }

  const handleGenerate = () => {
    const from = date?.from ? format(date.from, 'MMM d, yyyy') : '';
    const to = date?.to ? format(date.to, 'MMM d, yyyy') : '';
    router.push(`/reports/preview/tax-summary?from=${from}&to=${to}`);
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
          <h1 className="text-2xl font-bold">Generate Tax Summary</h1>
        </motion.header>

        <motion.div variants={itemVariants} className="flex-grow space-y-6">
          <Card className="w-full bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Select Period</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {presets.map((preset) => (
                  <Button
                    key={preset}
                    variant={selectedPreset === preset ? 'default' : 'outline'}
                    className="rounded-full bg-black text-white"
                    onClick={() => handleSetPreset(preset)}
                  >
                    {preset}
                  </Button>
                ))}
              </div>

              <div className="grid gap-2">
                 <p className="text-sm text-muted-foreground">Or select a custom range:</p>
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
                      onSelect={(range) => { setDate(range); setSelectedPreset(''); }}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
          
           <div className="flex items-start justify-center gap-3 text-sm text-muted-foreground bg-foreground/5 p-3 rounded-lg">
                <Lightbulb className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p><span className="font-semibold text-foreground/80">Gabi's Tip:</span> Expenses like product costs, software subscriptions, and internet bills can often be deducted from your income to lower your taxes. Make sure you've logged them all!</p>
            </div>
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
            Generate Summary
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
