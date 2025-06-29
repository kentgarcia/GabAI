
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Lock, Award, Bot, FileDown, Share2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const initialGrowthLevels = [
  {
    level: 1,
    title: 'The Foundation',
    description: 'Lay the groundwork for your business success.',
    isCertified: false,
    quiz: {
        question: 'Which of these is NOT required on a BIR-compliant official receipt?',
        options: ['Your TIN', 'Your Business Logo', 'A unique serial number', 'The date of transaction'],
        correctAnswer: 'Your Business Logo'
    },
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
    isCertified: false,
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
    isCertified: false,
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
    isCertified: false,
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

const LevelAccordionTrigger = ({ level, isLocked }: { level: typeof initialGrowthLevels[0], isLocked: boolean }) => {
  const completedCount = level.milestones.filter(m => m.completed).length;
  const totalCount = level.milestones.length;
  const progress = (completedCount / totalCount) * 100;
  const isComplete = progress === 100;

  return (
    <Card className={cn(
        "w-full rounded-2xl mb-2 transition-all",
        level.isCertified && "bg-emerald-500/20 border-emerald-500/40",
        isLocked && "bg-muted/50"
    )}>
        <CardContent className="p-4">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl flex-shrink-0",
                    level.isCertified ? "bg-emerald-500" : "bg-primary",
                    isLocked && "bg-muted-foreground"
                )}>
                    {isLocked ? <Lock /> : level.isCertified ? <Award /> : level.level}
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-lg">{level.title}</h3>
                    <p className="text-sm text-muted-foreground">{level.isCertified ? "Certified!" : `${completedCount} / ${totalCount} completed`}</p>
                    <Progress value={progress} className="h-2 mt-2" indicatorClassName={cn(level.isCertified && "bg-emerald-500")} />
                </div>
                 <div className="flex-shrink-0">
                    <AccordionTrigger className="p-2 hover:bg-muted rounded-full" />
                 </div>
            </div>
        </CardContent>
    </Card>
  )
}

const Certificate = ({ levelTitle }: { levelTitle: string }) => (
    <div className="bg-gradient-to-br from-primary/10 to-accent/20 p-6 rounded-lg border border-primary/20 text-center relative overflow-hidden">
        <Bot className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/10" />
        <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">CERTIFICATE OF COMPLETION</p>
        <h3 className="text-2xl font-bold my-2">Juan dela Cruz</h3>
        <p className="text-muted-foreground">has successfully completed the course</p>
        <h4 className="text-lg font-bold text-primary my-4">{levelTitle}</h4>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4 mt-4">
            <span>Issued: {new Date().toLocaleDateString()}</span>
            <span>Verification ID: GABAI-{(Math.random() + 1).toString(36).substring(7).toUpperCase()}</span>
        </div>
    </div>
);

const QuizDialogContent = ({ level, levelIndex, onQuizPass }: { level: typeof initialGrowthLevels[0], levelIndex: number, onQuizPass: (index: number) => void }) => {
    const { toast } = useToast();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showCertificate, setShowCertificate] = useState(level.isCertified);

    const handleQuizSubmit = () => {
        if (selectedAnswer === level.quiz?.correctAnswer) {
            toast({ title: '✅ Correct!', description: 'You passed the assessment.' });
            setShowCertificate(true);
            onQuizPass(levelIndex);
        } else {
            toast({ title: '🤔 Not quite.', description: 'Please review the lessons and try again.', variant: 'destructive' });
        }
    }
    
    return (
        <DialogContent className="bg-background/80 backdrop-blur-md border">
            {showCertificate ? (
                 <>
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                    </DialogHeader>
                    <Certificate levelTitle={level.title} />
                    <DialogFooter className="sm:justify-start gap-2">
                         <Button type="button" variant="outline" onClick={() => toast({title: "Coming Soon!"})}>
                            <Share2 className="mr-2" /> Share
                        </Button>
                         <Button type="button" className="bg-black text-primary-foreground" onClick={() => toast({title: "Coming Soon!"})}>
                            <FileDown className="mr-2" /> Download
                        </Button>
                    </DialogFooter>
                 </>
            ) : (
                <>
                <DialogHeader>
                    <DialogTitle>{level.title} Assessment</DialogTitle>
                </DialogHeader>
                <div className="py-2 space-y-4">
                    <p className="font-semibold">{level.quiz?.question}</p>
                    <RadioGroup onValueChange={setSelectedAnswer}>
                        {level.quiz?.options.map(option => (
                             <Label key={option} htmlFor={option} className="flex items-center gap-3 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value={option} id={option} />
                                {option}
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button type="button" className="bg-black text-primary-foreground" onClick={handleQuizSubmit} disabled={!selectedAnswer}>Submit Answer</Button>
                </DialogFooter>
                </>
            )}
        </DialogContent>
    );
}

export default function GrowthPathPage() {
  const [levels, setLevels] = useState(initialGrowthLevels);

  const handleMilestoneToggle = (levelIndex: number, milestoneId: string, completed: boolean) => {
    const newLevels = [...levels];
    const milestone = newLevels[levelIndex].milestones.find(m => m.id === milestoneId);
    if (milestone) {
        milestone.completed = completed;
        setLevels(newLevels);
    }
  };

  const handleQuizPass = (levelIndex: number) => {
     const newLevels = [...levels];
     newLevels[levelIndex].isCertified = true;
     setLevels(newLevels);
  }

  const firstLockedLevelIndex = levels.findIndex(level => level.milestones.filter(m => m.completed).length !== level.milestones.length);

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
            {levels.map((level, index) => {
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
                                <Checkbox 
                                    id={milestone.id} 
                                    checked={milestone.completed}
                                    onCheckedChange={(checked) => handleMilestoneToggle(index, milestone.id, !!checked)}
                                    disabled={isLocked} />
                                <label htmlFor={milestone.id} className={cn("text-sm", isLocked && "text-muted-foreground", milestone.completed && "line-through")}>{milestone.text}</label>
                            </div>
                        ))}
                       </div>
                       
                        <Dialog>
                            <Card className="mt-6 bg-primary/10 border-primary/20">
                                <CardContent className="p-3">
                                    {level.isCertified ? (
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="w-full text-emerald-600 font-semibold hover:text-emerald-700">
                                                <Award className="mr-2" /> View Certificate
                                            </Button>
                                        </DialogTrigger>
                                    ) : isComplete ? (
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-primary text-primary-foreground font-semibold">Take Assessment</Button>
                                        </DialogTrigger>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <level.reward.icon className="w-5 h-5 text-primary"/>
                                            <p className="text-sm font-medium text-primary">Reward: {level.reward.text}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            <QuizDialogContent level={level} levelIndex={index} onQuizPass={handleQuizPass} />
                        </Dialog>
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
