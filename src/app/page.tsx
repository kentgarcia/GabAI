import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SparkleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14 0L15.6962 12.3038L28 14L15.6962 15.6962L14 28L12.3038 15.6962L0 14L12.3038 12.3038L14 0Z"/>
    </svg>
);

const TeardropIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 17 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M16.2031 11.5C16.2031 17.8513 12.5781 23 8.45312 23C4.32812 23 0.703125 17.8513 0.703125 11.5C0.703125 5.14873 4.32812 0 8.45312 0C12.5781 0 16.2031 5.14873 16.2031 11.5Z"/>
    </svg>
);

const OaletLogo = () => (
  <div className="relative w-[250px] h-[250px] flex items-center justify-center">
    <svg className="absolute w-full h-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ring-gradient" x1="0" y1="0" x2="250" y2="250" gradientUnits="userSpaceOnUse">
          <stop stopColor="#AFFFDF"/>
          <stop offset="1" stopColor="#D9BFFF"/>
        </linearGradient>
      </defs>
      <ellipse cx="125" cy="125" rx="70" ry="110" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(-15 125 125)" />
      <ellipse cx="125" cy="125" rx="75" ry="115" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(-10 125 125)" />
      <ellipse cx="125" cy="125" rx="80" ry="120" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(-5 125 125)" />
      <ellipse cx="125" cy="125" rx="85" ry="125" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(0 125 125)" />
      <ellipse cx="125" cy="125" rx="90" ry="130" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(5 125 125)" />
      <ellipse cx="125" cy="125" rx="95" ry="135" stroke="url(#ring-gradient)" strokeWidth="2" transform="rotate(10 125 125)" />
    </svg>
    
    <div className="relative w-[100px] h-[180px] bg-black rounded-[50px] flex items-center justify-center">
      <span className="text-white text-2xl font-bold tracking-widest">OALET</span>
    </div>
  </div>
);

export default function OnboardingPage() {
  return (
    <main className="bg-white text-black min-h-screen flex flex-col justify-end p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D9BFFF]/50 rounded-full" />
        <div className="absolute top-8 -right-24 w-48 h-48 bg-[#AFFFDF]/50 rounded-full" />
        
        <SparkleIcon className="absolute top-24 left-8 w-10 h-10 text-black" />
        <TeardropIcon className="absolute top-28 right-8 w-6 h-9 text-black" />
        
        <div className="absolute top-[40%] -left-20">
            <div className="w-40 h-40 rounded-full border-[24px] border-black"/>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="scale-90">
            <OaletLogo />
        </div>
        <div className="text-center w-full mt-4">
            <h1 className="text-5xl font-bold leading-tight">
            Easy ways to
            <br />
            manage your
            <br />
            finances
            <SparkleIcon className="w-6 h-6 inline-block ml-2 text-black" />
            </h1>
            <Button asChild className="w-full mt-8 bg-black text-white rounded-full h-16 text-lg font-semibold hover:bg-gray-800 active:bg-gray-900">
            <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2" />
            </Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
