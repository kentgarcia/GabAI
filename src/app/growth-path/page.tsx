
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

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

const growthLevels = [
  {
    level: 1,
    title: 'The Foundation',
    description: 'Lay the groundwork for your business success.',
    milestones: [
      { id: 'l1m1', text: 'Log your first 10 transactions', completed: true },
      { id: 'l1m2', text: 'Create your first official receipt', completed: false },
      { id: 'l1m3', text: 'Categorize 80% of your expenses', completed: false },
      { id: 'l1m4', text: 'Set your first monthly income goal', completed: false },
    ],
    reward: {
      text: '+10 to Health Score',
      icon: Award,
    },
  },
  {
    level: 2,
    title: 'Building Consistency',
    description: 'Turn good practices into solid habits.',
    milestones: [
      { id: 'l2m1', text: 'Track expenses for 14 days in a row', completed: false },
      { id: 'l2m2', text: 'Generate your first Profit & Loss report', completed: false },
      { id: 'l2m3', text: 'Identify your biggest expense category', completed: false },
      { id: 'l2m4', text: "Gabi's Challenge: Reduce 'unclassified' expenses by 50%", completed: false },
    ],
    reward: {
      text: '+25 to Health Score',
      icon: Award,
    },
  },
  {
    level: 3,
    title: 'Formalizing & Optimizing',
    description: 'Operate like a pro and make smarter decisions.',
    milestones: [
      { id: 'l3m1', text: 'Add your TIN to your business profile', completed: false },
      { id: 'l3m2', text: 'Generate a Tax Summary Report', completed: false },
      { id: 'l3m3', text: 'Identify your top-performing product or client', completed: false },
      { id: 'l3m4', text: 'Separate business & personal expenses for one month', completed: false },
    ],
    reward: {
      text: '+50 to Health Score',
      icon: Award,
    },
  },
    {
    level: 4,
    title: 'Scaling Smart',
    description: 'Think like a CEO and plan for the future.',
    milestones: [
      { id: 'l4m1', text: 'Set a quarterly revenue growth goal', completed: false },
      { id: 'l4m2', text: 'Use Sales Report to decide on your next promotion', completed: false },
      { id: 'l4m3', text: 'Build a 1-month "emergency fund"', completed: false },
      { id: 'l4m4', text: 'Explore a new income stream or sales channel', completed: false },
    ],
    reward: {
      text: '+75 to Health Score',
      icon: Award,
    },
  },
];


const LevelAccordionTrigger = ({ level, isLocked }: { level: typeof growthLevels[0], isLocked: boolean }) => {
  const completedCount = level.milestones.filter(m => m.completed).length;
  const totalCount = level.milestones.length;
  const progress = (completedCount / totalCount) * 100;
  const isComplete = progress === 100;

  return (
    <Card className={cn(
        "w-full rounded-2xl mb-2 transition-all",
        isComplete && "bg-emerald-500/10 border-emerald-500/30",
        isLocked && "bg-muted/50"
    )}>
        <CardContent className="p-4">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl flex-shrink-0",
                    isComplete ? "bg-emerald-500" : "bg-primary",
                    isLocked && "bg-muted-foreground"
                )}>
                    {isLocked ? <Lock /> : isComplete ? <Check /> : level.level}
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-lg">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">{completedCount} / {totalCount} completed</p>
                    <Progress value={progress} className="h-2 mt-2" />
                </div>
                 <div className="flex-shrink-0">
                    <AccordionTrigger className="p-2 hover:bg-muted rounded-full" />
                 </div>
            </div>
        </CardContent>
    </Card>
  )
}


export default function GrowthPathPage() {
  const firstLockedLevelIndex = growthLevels.findIndex(level => level.milestones.filter(m => m.completed).length !== level.milestones.length);

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col flex-grow"
      >
        <motion.header variants={itemVariants} className="flex items-center gap-2 mb-4">
          <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
            <Link href="/dashboard">
              <ArrowLeft />
            </Link>
          </Button>
          <div>
             <h1 className="text-2xl font-bold">Your Growth Path</h1>
             <p className="text-muted-foreground text-sm">From Hustle to Growth</p>
          </div>
        </motion.header>

        <motion.div variants={itemVariants} className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2">
            {growthLevels.map((level, index) => {
              const completedCount = level.milestones.filter(m => m.completed).length;
              const isComplete = completedCount === level.milestones.length;
              const isLocked = index > firstLockedLevelIndex && firstLockedLevelIndex !== -1;

              return (
                <AccordionItem key={level.level} value={`item-${index}`} className="border-b-0">
                    <LevelAccordionTrigger level={level} isLocked={isLocked}/>
                    <AccordionContent className="px-4 pb-2">
                       <p className="text-sm text-muted-foreground mb-4">{level.description}</p>
                       <div className="space-y-4">
                        {level.milestones.map(milestone => (
                            <div key={milestone.id} className="flex items-center gap-3">
                                <Checkbox id={milestone.id} checked={milestone.completed} disabled={isLocked} />
                                <label htmlFor={milestone.id} className={cn("text-sm", isLocked && "text-muted-foreground")}>{milestone.text}</label>
                            </div>
                        ))}
                       </div>
                       <Card className="mt-6 bg-primary/10 border-primary/20">
                         <CardContent className="p-3 flex items-center gap-3">
                            <level.reward.icon className="w-5 h-5 text-primary"/>
                            <p className="text-sm font-medium text-primary">Reward: {level.reward.text}</p>
                         </CardContent>
                       </Card>
                    </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </motion.div>
    </main>
  );
}
