'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { TrendingUp, Bot, Plus, Coins, Receipt } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const previousValue = parseFloat(node.textContent?.replace(/[^0-9.-]+/g,"") || '0');

    const controls = animate(previousValue, value, {
      duration: 0.7,
      ease: 'easeOut',
      onUpdate(latest) {
        node.textContent = `₱${latest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>₱{value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
};

const CoachMark = ({
  title,
  content,
  buttonText,
  onButtonClick,
  targetRect,
  step,
}: {
  title: string;
  content: string;
  buttonText: string;
  onButtonClick: () => void;
  targetRect: DOMRect | null;
  step: number;
}) => {
  if (!targetRect) return null;
  
  const getPosition = () => {
    const isMobile = window.innerWidth < 768;
    const top = targetRect.bottom + 16;
    let left = targetRect.left + targetRect.width / 2 - 150;
    if (isMobile) {
      left = window.innerWidth / 2 - 150;
    }
    if (left < 16) left = 16;
    if (left + 300 > window.innerWidth - 16) left = window.innerWidth - 316;
    
    // Special positioning for the FAB
    if (step === 2) {
      return { top: targetRect.top - 180, left: targetRect.left - 290 };
    }

    return { top, left };
  }

  return (
    <motion.div
      className="fixed z-50 w-[300px] bg-background/80 backdrop-blur-lg border rounded-xl p-5 shadow-2xl"
      style={getPosition()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-accent/20 rounded-full mt-1">
          <Bot className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{content}</p>
          <Button onClick={onButtonClick} className="w-full bg-primary text-primary-foreground">
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};


export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [tourStep, setTourStep] = useState(0); // 0: inactive, 1: profit, 2: fab, 3: gabi, 4: done
  const [isTourActive, setIsTourActive] = useState(false);

  const [grossIncome, setGrossIncome] = useState(45231);
  const [expenses, setExpenses] = useState(0);
  
  const [transactions, setTransactions] = useState([
    { type: 'income', description: 'Initial Shopee Report', amount: 45231, icon: TrendingUp, color: 'text-emerald-500' },
  ]);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const netProfitCardRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const gabiIconRef = useRef<HTMLDivElement>(null);
  
  const tourRefs: { [key: number]: React.RefObject<HTMLElement> } = {
    1: netProfitCardRef,
    2: fabRef,
    3: gabiIconRef,
  };
  
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    setIsClient(true);
    const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
    if (!hasSeenTour) {
      setIsTourActive(true);
      setTimeout(() => setTourStep(1), 500);
    }
  }, []);

  useEffect(() => {
    if (isTourActive && tourStep > 0 && tourStep < 4) {
      const ref = tourRefs[tourStep];
      setTargetRect(ref.current?.getBoundingClientRect() ?? null);
      
      const handleResize = () => {
        setTargetRect(ref.current?.getBoundingClientRect() ?? null);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    } else {
      setTargetRect(null);
    }
  }, [isTourActive, tourStep]);

  const nextTourStep = () => {
    if(tourStep === 1) setTourStep(2);
    else if(tourStep === 3) {
      setTourStep(4);
      setIsTourActive(false);
    }
  };
  
  const handleAddExpenseClick = () => {
    setIsAddExpenseOpen(true);
  }
  
  const handleSaveExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (!expenseDescription || !amount || isNaN(amount)) return;

    const newExpense = {
        type: 'expense',
        description: expenseDescription,
        amount: amount,
        icon: Coins,
        color: 'text-rose-500'
    };
    
    // @ts-ignore
    setTransactions(prev => [newExpense, ...prev]);
    setExpenses(prev => prev + amount);
    setIsAddExpenseOpen(false);
    setExpenseDescription('');
    setExpenseAmount('');
    localStorage.setItem('hasSeenDashboardTour', 'true');
    
    setTimeout(() => {
      setTourStep(3)
    }, 500);
  }

  const tourContent = {
    1: { 
      title: "Your Most Important Number",
      content: "This is your Net Profit - the real bottom line. Right now, it's the same as your income, but let's change that.",
      buttonText: "Next",
      action: nextTourStep
    },
    2: {
      title: "Track Your Expenses",
      content: "To get your REAL profit, track your business costs. Try adding one, like 'Product Cost' or 'Internet Bill'.",
      buttonText: "Let's add an expense!",
      action: handleAddExpenseClick
    },
    3: {
      title: "You're All Set!",
      content: "See how that works? If you ever have a question—like making a receipt or forecasting sales—just tap me. Happy tracking!",
      buttonText: "Got it! Finish Tour",
      action: nextTourStep
    },
  };
  
  const currentTourData = isTourActive && tourStep > 0 && tourStep < 4 ? tourContent[tourStep] : null;
  const netProfit = grossIncome - expenses;
  if (!isClient) return null; // Prevents hydration mismatch

  return (
    <div className="relative flex flex-1 flex-col h-full">
       <AnimatePresence>
        {isTourActive && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentTourData && (
          <CoachMark
            step={tourStep}
            targetRect={targetRect}
            title={currentTourData.title}
            content={currentTourData.content}
            buttonText={currentTourData.buttonText}
            onButtonClick={currentTourData.action}
          />
        )}
      </AnimatePresence>


      <div className="flex-1 space-y-4 p-4 md:p-6 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Your Dashboard</h2>
            <p className="text-sm md:text-base text-muted-foreground">Here's your financial overview.</p>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl bg-violet-400/20 backdrop-blur-lg border border-violet-400/30 p-4 space-y-1">
                <p className="text-xs sm:text-sm font-medium text-violet-900">Total Income</p>
                <p className="text-xl sm:text-2xl font-bold text-violet-950">₱{grossIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="rounded-xl bg-orange-400/20 backdrop-blur-lg border border-orange-400/30 p-4 space-y-1">
                <p className="text-xs sm:text-sm font-medium text-orange-900">Total Expenses</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-950">₱{expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div 
                ref={netProfitCardRef} 
                className={cn(
                    "rounded-xl bg-emerald-400/20 backdrop-blur-lg border border-emerald-400/30 p-4 space-y-1 col-span-2 md:col-span-1 transition-all duration-300",
                    isTourActive && tourStep === 1 && "z-50 shadow-2xl scale-105"
                )}
            >
                <p className="text-xs sm:text-sm font-medium text-emerald-900">Net Profit</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-950">
                    <AnimatedNumber value={netProfit} />
                </p>
            </div>
          </div>
          
          <div className="rounded-xl bg-background/30 backdrop-blur-lg border p-4">
              <h3 className="text-base font-semibold mb-4">Recent Transactions</h3>
              <ul className="space-y-4">
                  {transactions.map((transaction, index) => (
                      <li key={index} className="flex items-center gap-4">
                          <div className={cn("flex-shrink-0 bg-foreground/10 p-2 rounded-full", transaction.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10' )}>
                              <transaction.icon className={cn("h-5 w-5", transaction.color)} />
                          </div>
                          <div className="flex-grow">
                              <p className="font-semibold text-sm">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.type}</p>
                          </div>
                          <p className={cn("font-semibold text-sm", transaction.color)}>
                              {transaction.type === 'expense' && '-'}₱{transaction.amount.toLocaleString()}
                          </p>
                      </li>
                  ))}
              </ul>
          </div>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col items-center gap-4 z-30">
        <motion.div 
            ref={gabiIconRef} 
            className={cn(
                "p-3 bg-accent/20 rounded-full cursor-pointer transition-all duration-300",
                 isTourActive && tourStep === 3 && "z-50 scale-125 shadow-2xl ring-4 ring-accent/50"
             )}
            whileHover={{ scale: 1.1 }}
        >
            <Bot className="h-7 w-7 text-accent" />
        </motion.div>
        
        <Button 
            ref={fabRef} 
            onClick={handleAddExpenseClick}
            className={cn(
                "rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg transition-all duration-300",
                isTourActive && tourStep === 2 && "z-50 scale-110 shadow-2xl"
            )}
            aria-label="Add Transaction"
        >
            <Plus className="h-8 w-8" />
        </Button>
      </div>

      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border">
          <DialogHeader>
            <DialogTitle>Add an Expense</DialogTitle>
            <DialogDescription>
              Track your business costs to see your true profit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="expense-description">Description</Label>
              <Input 
                id="expense-description" 
                placeholder="e.g. Product Cost, Internet Bill" 
                className="bg-background/50"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-amount">Amount (PHP)</Label>
              <Input 
                id="expense-amount" 
                type="number" 
                placeholder="e.g. 5000" 
                className="bg-background/50"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              className="w-full bg-primary text-primary-foreground"
              onClick={handleSaveExpense}
            >
              Save Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    