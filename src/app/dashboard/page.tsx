'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { TrendingUp, Bot, Plus, Coins } from 'lucide-react';

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


export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  const [grossIncome, setGrossIncome] = useState(45231);
  const [expenses, setExpenses] = useState(0);
  
  const [transactions, setTransactions] = useState([
    { type: 'income', description: 'Initial Shopee Report', amount: 45231, icon: TrendingUp, color: 'text-emerald-500' },
  ]);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  
  useEffect(() => {
    setIsClient(true);
  }, []);

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
  }
  
  const netProfit = grossIncome - expenses;
  if (!isClient) return null; // Prevents hydration mismatch

  return (
    <div className="relative flex flex-1 flex-col h-full">
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
                className="rounded-xl bg-emerald-400/20 backdrop-blur-lg border border-emerald-400/30 p-4 space-y-1 col-span-2 md:col-span-1"
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
            className="p-3 bg-accent/20 rounded-full cursor-pointer"
            whileHover={{ scale: 1.1 }}
        >
            <Bot className="h-7 w-7 text-accent" />
        </motion.div>
        
        <Button 
            onClick={handleAddExpenseClick}
            className="rounded-full w-16 h-16 bg-black text-primary-foreground shadow-lg"
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
              className="w-full bg-black text-primary-foreground"
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
