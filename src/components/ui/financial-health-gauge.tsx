'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialHealthGaugeProps {
  score: number;
  maxScore: number;
  status: string;
  trend: 'up' | 'down';
}

export function FinancialHealthGauge({ score, maxScore, status, trend }: FinancialHealthGaugeProps) {
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const progress = score / maxScore;
  const strokeDashoffset = circumference * (1 - progress);

  const scoreColor =
    score >= 800
      ? 'text-emerald-500'
      : score >= 600
      ? 'text-yellow-500'
      : 'text-red-500';
      
  const ringColor =
    score >= 800
      ? 'stroke-emerald-500'
      : score >= 600
      ? 'stroke-yellow-500'
      : 'stroke-red-500';

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          className="stroke-muted/30"
          fill="none"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          fill="none"
          className={cn('transform -rotate-90 origin-center', ringColor)}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <div className="flex items-baseline">
          <p className={cn('text-4xl font-bold', scoreColor)}>
            {score}
          </p>
          <p className="text-sm text-muted-foreground">/ {maxScore}</p>
        </div>
        <p className={cn('text-lg font-semibold', scoreColor)}>{status}</p>
        <div className="mt-1 flex items-center text-xs text-muted-foreground">
          <ArrowUp className={cn(
              'mr-1 h-3 w-3',
              trend === 'down' && 'rotate-180 text-red-500',
              trend === 'up' && 'text-emerald-500'
          )} />
          <span>vs last week</span>
        </div>
      </div>
    </div>
  );
}
