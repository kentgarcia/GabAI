'use client';

import { ArrowDownToLine, ArrowRightLeft, ArrowUpRight, Check, ChevronRight, Clock, DollarSign, Home, Bitcoin, Bot, Gift, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';

const DoorDashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.25 10.3125C20.25 9.07031 19.4297 8.13281 18.2812 7.78125V18.2812C19.4297 17.9297 20.25 16.9922 20.25 15.75V10.3125ZM15.75 4.5C13.5234 4.5 11.7188 6.30469 11.7188 8.53125V17.5312C11.7188 18.0609 11.2891 18.5344 10.7188 18.5344H5.4375C4.90781 18.5344 4.5 18.0609 4.5 17.5312V8.48438C4.5 6.25781 6.30469 4.45312 8.53125 4.45312H15.75V4.5Z" fill="#FF3008"/>
  </svg>
);

const LyftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z" fill="#FF00BF"/>
        <path d="M20.2662 29.3333V23.7333L26.6662 23.7333V18.2667L20.2662 18.2667V13.7333C24.3995 13.7333 26.6662 11.4667 26.6662 8H20.2662V6.66667H14.1328V13.7333H10.6662V18.2667H14.1328V29.3333H20.2662Z" fill="white"/>
    </svg>
);


export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      <main className="flex-1 px-4 py-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
        
        <div className="rounded-3xl p-5 bg-primary shadow-lg text-primary-foreground">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="font-bold text-lg">FOLD CARD</p>
            </div>
            <Button variant="ghost" className="h-auto px-4 py-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-sm">
              Card Details <ChevronRight className="w-4 h-4 -mr-1" />
            </Button>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tighter mb-5">$50.65</h1>

          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2">
            <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full h-11 text-base font-semibold col-span-1">
              <ArrowDownToLine className="w-4 h-4 mr-2" /> Deposit
            </Button>
            <Button size="icon" variant="ghost" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full w-11 h-11">
              <ArrowRightLeft className="w-5 h-5" />
            </Button>
            <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full h-11 text-base font-semibold col-span-1">
              <ArrowUpRight className="w-4 h-4 mr-2" /> Withdraw
            </Button>
          </div>
        </div>

        
        <div className="bg-card rounded-2xl p-5 flex items-center gap-4 border">
          <div className="flex-1 space-y-2">
            <h2 className="font-bold text-lg">Card Boost</h2>
            <p className="text-muted-foreground text-sm">Earn boosted sats back on eveyday catagories and brands.</p>
            <Button variant="secondary" className="mt-3 rounded-lg h-9 px-4">
              See More
            </Button>
          </div>
          <div className="flex-shrink-0">
             <Image src="https://placehold.co/100x100.png" width={100} height={100} alt="Card Boost" data-ai-hint="money bag illustration" className="w-24 h-24 object-cover" />
          </div>
        </div>

        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Category Boosts</h2>
            <Link href="#" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-card rounded-2xl p-4 space-y-4 border">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center border">
                  <DoorDashIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold">DoorDash</h3>
                  <div className="flex items-center gap-1.5 text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full mt-1 w-fit">
                    <Check className="w-3 h-3"/> 10% Back
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Online
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t mt-3">
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>Active until 05/01/2025</span>
                </div>
                <span>6:00 PM</span>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl p-4 flex items-start justify-between border">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center p-1">
                  <LyftIcon/>
                </div>
                <div>
                  <h3 className="font-semibold">Lyft</h3>
                   <p className="text-xs text-muted-foreground mt-1">4.1% Back</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                Online
              </div>
          </div>
        </div>
      </main>

      
      <footer className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto p-4 z-20">
        <div className="bg-background/90 backdrop-blur-xl rounded-full h-20 flex justify-around items-center shadow-lg border">
          <Link href="#" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Home className="w-7 h-7" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Bitcoin className="w-7 h-7" />
          </Link>
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center -mt-10 shadow-[0_-5px_20px_-5px_rgba(100,255,100,0.3)] border-4 border-background cursor-pointer">
            <Bot className="w-8 h-8 text-primary-foreground" />
          </div>
          <Link href="#" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Gift className="w-7 h-7" />
          </Link>
          <Link href="#" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <Trophy className="w-7 h-7" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
