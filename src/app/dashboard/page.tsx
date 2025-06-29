'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, ArrowRight, ArrowUpRight, CreditCard, Euro, Home, LineChart, Plus, Wallet as WalletIcon } from "lucide-react";
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-neutral-100 text-neutral-800 font-sans">
      <header className="p-4 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button className="bg-indigo-900 text-white rounded-full hover:bg-indigo-800 px-4">
            <WalletIcon className="w-4 h-4 mr-2" />
            Wallet
          </Button>
          <Button variant="ghost" className="rounded-full p-2">
            <LineChart className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button size="icon" variant="ghost" className="rounded-full bg-white shadow-sm w-9 h-9">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-2 space-y-6 overflow-y-auto no-scrollbar">
        <div className="text-left">
          <p className="text-sm text-neutral-500">Get started with PayPal</p>
          <h1 className="text-3xl font-bold mt-1">Your Balance</h1>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-5xl font-bold tracking-tight">$14,567</p>
            <p className="text-3xl font-bold text-neutral-400">.22</p>
            <Badge className="bg-emerald-100 text-emerald-800 text-sm font-semibold border border-emerald-200 hover:bg-emerald-200">
              2%
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-yellow-400 rounded-2xl p-4 flex flex-col justify-between h-40">
            <div className="bg-black/10 rounded-full w-12 h-12 flex items-center justify-center">
                <ArrowUpRight className="text-neutral-800 w-6 h-6" />
            </div>
            <div className="flex justify-between items-end">
                <p className="text-lg font-semibold text-neutral-800">Send money</p>
                <Button size="icon" className="rounded-full bg-neutral-800 text-white w-9 h-9 shrink-0">
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-2xl p-4 flex flex-col justify-between h-48">
             <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                <ArrowDownToLine className="w-6 h-6" />
            </div>
             <div className="flex justify-between items-end">
                <p className="text-lg font-semibold">Request money</p>
                <Button size="icon" className="rounded-full bg-white text-indigo-900 w-9 h-9 shrink-0 hover:bg-neutral-200">
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
          </div>

          <div className="bg-teal-500 text-white rounded-2xl p-4 flex flex-col justify-between h-48">
            <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-end">
                <p className="text-lg font-semibold">Add new card</p>
                <Button size="icon" className="rounded-full bg-white text-teal-500 w-9 h-9 shrink-0 hover:bg-neutral-200">
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] p-2 flex-shrink-0">
        <nav className="flex justify-around items-center h-16">
          <Link href="#" className="flex flex-col items-center text-indigo-900 font-semibold">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-400 hover:text-indigo-900">
            <Euro className="w-6 h-6 mb-1" />
            <span className="text-xs">Payments</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-neutral-400 hover:text-indigo-900">
            <WalletIcon className="w-6 h-6 mb-1" />
            <span className="text-xs">Wallet</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}
