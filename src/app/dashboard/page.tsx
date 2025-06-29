'use client';

import { useState } from 'react';
import { Bot, Gift, Home, Trophy, Bitcoin, ArrowRight, Package, Briefcase, ShoppingCart, Truck, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [period, setPeriod] = useState('month');

  // Mock data for demonstration
  const data = {
    netProfit: 12345.67,
    income: 20000.00,
    expenses: 7654.33,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value).replace('₱', '₱ ');
  };

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 px-4 py-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
        
        <div className="flex justify-center">
            <Tabs defaultValue="month" className="w-auto">
                <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1.5 rounded-full backdrop-blur-lg">
                    <TabsTrigger value="week" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Week</TabsTrigger>
                    <TabsTrigger value="month" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Month</TabsTrigger>
                    <TabsTrigger value="quarter" className="rounded-full data-[state=active]:bg-background data-[state=active]:shadow-sm">This Quarter</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <Card className="w-full bg-gradient-to-b from-primary-dark to-primary text-primary-foreground shadow-xl rounded-3xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <span className="font-bold text-xl text-white">₱</span>
                    </div>
                    <p className="font-semibold tracking-wider text-primary-foreground/80">NET PROFIT</p>
                </div>
                <Button className="bg-black text-primary-foreground/80 hover:bg-black/90 h-10 px-3 text-xs rounded-full flex items-center gap-1">
                    More Details <ArrowRight className="w-3 h-3" />
                </Button>
            </div>
            
            <div className="text-center">
                <p className="text-6xl font-bold my-2 tracking-tighter text-primary-foreground">
                  {formatCurrency(data.netProfit)}
                </p>
            </div>
            
            <div className="w-full border-t border-primary-foreground/20"></div>

            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <p className="text-sm text-primary-foreground/70">Income</p>
                <p className="text-2xl font-semibold text-primary-foreground">{formatCurrency(data.income)}</p>
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">Expenses</p>
                <p className="text-2xl font-semibold text-primary-foreground">{formatCurrency(data.expenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
            <h2 className="font-bold text-lg">This Month's Breakdown</h2>
            <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                <CardContent className="p-4">
                    <Tabs defaultValue="products" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1.5 rounded-2xl">
                            <TabsTrigger value="products" className="rounded-lg">Top Products/Services</TabsTrigger>
                            <TabsTrigger value="expenses" className="rounded-lg">Top Expenses</TabsTrigger>
                        </TabsList>
                        <TabsContent value="products" className="mt-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">Product A</p>
                                    </div>
                                    <p className="font-semibold text-lg">₱8,000</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <Briefcase className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">Service B</p>
                                    </div>
                                    <p className="font-semibold text-lg">₱6,000</p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="expenses" className="mt-4">
                            <div className="space-y-4">
                               <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">Product Costs</p>
                                    </div>
                                    <p className="font-semibold text-lg">₱4,000</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-primary-foreground" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">Shipping Fees</p>
                                    </div>
                                    <p className="font-semibold text-lg">₱1,500</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>


        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Recent Activity</h2>
                <Link href="#" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
                See all <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            <Card className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10">
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">Client Payment</p>
                            <p className="text-sm text-muted-foreground">Today</p>
                        </div>
                        <p className="font-semibold text-lg text-emerald-500">+ ₱5,000</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">Internet Bill</p>
                            <p className="text-sm text-muted-foreground">Yesterday</p>
                        </div>
                        <p className="font-semibold text-lg text-red-500">- ₱799</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold">Shopee Payout</p>
                            <p className="text-sm text-muted-foreground">2 days ago</p>
                        </div>
                        <p className="font-semibold text-lg text-emerald-500">+ ₱1,250</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>

      
      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-black rounded-full h-20 flex justify-around items-center shadow-lg">
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Home className="w-6 h-6" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Bitcoin className="w-6 h-6" />
          </Link>
          <Link href="#" className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
            <Bot className="w-7 h-7 text-primary-foreground" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Gift className="w-6 h-6" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <Trophy className="w-6 h-6" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
