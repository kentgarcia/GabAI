
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar as CalendarIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, startOfQuarter } from 'date-fns';
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

const datePresets = ['Last 7 Days', 'Last 30 Days', 'This Quarter'];

const getPresetDateRange = (preset: string): DateRange => {
    const now = new Date();
    switch (preset) {
        case 'Last 7 Days':
            return { from: addDays(now, -7), to: now };
        case 'Last 30 Days':
            return { from: addDays(now, -30), to: now };
        case 'This Quarter':
            return { from: startOfQuarter(now), to: now };
        default:
            return { from: addDays(now, -7), to: now };
    }
}

export default function GenerateSalesReportPage() {
  const router = useRouter();
  const [groupBy, setGroupBy] = useState('Product / SKU');
  const [date, setDate] = useState<DateRange | undefined>(getPresetDateRange('Last 7 Days'));
  const [selectedPreset, setSelectedPreset] = useState('Last 7 Days');


  const handleSetPreset = (preset: string) => {
    setSelectedPreset(preset);
    setDate(getPresetDateRange(preset));
  }

  const handleGenerate = () => {
    const from = date?.from ? format(date.from, 'yyyy-MM-dd') : '';
    const to = date?.to ? format(date.to, 'yyyy-MM-dd') : '';
    router.push(`/reports/preview/sales?from=${from}&to=${to}&groupBy=${encodeURIComponent(groupBy)}`);
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
          <h1 className="text-2xl font-bold">Generate Sales Report</h1>
        </motion.header>

        <motion.div variants={itemVariants} className="flex-grow space-y-6">
          <Card className="w-full bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                  {datePresets.map((preset) => (
                    <Button
                      key={preset}
                      variant={selectedPreset === preset ? 'default' : 'outline'}
                      className="rounded-full shrink-0 bg-black text-white"
                      onClick={() => handleSetPreset(preset)}
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
                        onSelect={(d) => { setDate(d); setSelectedPreset(''); }}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Group By</h2>
                 <Tabs value={groupBy} onValueChange={setGroupBy} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1.5 rounded-2xl">
                        <TabsTrigger value="Product / SKU" className="rounded-lg">Product</TabsTrigger>
                        <TabsTrigger value="Platform" className="rounded-lg">Platform</TabsTrigger>
                        <TabsTrigger value="Category" className="rounded-lg">Category</TabsTrigger>
                    </TabsList>
                </Tabs>
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
            disabled={!date || !groupBy}
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
