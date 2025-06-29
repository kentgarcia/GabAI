
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';


// Extend the window interface for the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const mockMonthlyIncome = 20000;

const getGabiResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('how many') && lowerCaseMessage.includes('cat stickers') && lowerCaseMessage.includes('left')) {
        return "You have 12 'Holographic Cat Sticker' units left. You sell about 5 per week. I can add a reminder to restock them for you.";
    }
    if (lowerCaseMessage.includes('draft an email') && lowerCaseMessage.includes('ready by friday')) {
        return "Okay, I've drafted an email confirming the design will be ready by Friday. Ready to send?";
    }
    if (lowerCaseMessage.includes('profit')) {
        return `Your net profit for this month is ₱12,345.67. This is calculated from your total income of ₱${mockMonthlyIncome.toLocaleString()} minus your expenses of ₱7,654.33. Keep up the great work!`;
    }
    if (lowerCaseMessage.includes('receipt') || lowerCaseMessage.includes('sale')) {
        return "Of course. Who is the receipt for and what is the amount? I can create one for you.";
    }
    if (lowerCaseMessage.includes('expenses')) {
        return "Your top expense category this month is Product Costs. You can view a full breakdown on the reports page.";
    }
    if (lowerCaseMessage.includes('tax')) {
        return `Based on your income of ₱${mockMonthlyIncome.toLocaleString()} this month, and using the 8% tax rate, you should consider setting aside approximately ₱${(mockMonthlyIncome * 0.08).toLocaleString()} for your taxes. Remember, this is just an estimate!`;
    }

    return "I'm sorry, I didn't quite catch that. Could you try asking in a different way? You can ask about profit, expenses, or creating receipts.";
};

export default function TalkPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);


  const statusText = {
    idle: "Tap the mic to speak.",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: "Gabi is speaking...",
  };

  const handleListen = useCallback(() => {
    if (status === 'idle' && recognitionRef.current) {
        setTranscript('');
        setAiResponse('');
        setDisplayedResponse('');
        try {
            recognitionRef.current.start();
        } catch(err) {
            // Speech recognition may already be started, which is fine.
        }
    }
  }, [status]);


  useEffect(() => {
    const initPermissionsAndRecognition = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          toast({
            variant: "destructive",
            title: "Browser Not Supported",
            description: "Your browser doesn't support speech recognition.",
          });
          setHasPermission(false);
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognitionRef.current = recognition;

      } catch (error) {
        setHasPermission(false);
      }
    };

    initPermissionsAndRecognition();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  useEffect(() => {
    if (!hasPermission || !recognitionRef.current) return;

    const recognition = recognitionRef.current;
    let finalTranscript = '';

    recognition.onstart = () => {
        setStatus('listening');
        finalTranscript = '';
    };

    recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
          } else {
              interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript || interimTranscript);
    };
    
    recognition.onend = async () => {
        const trimmedTranscript = finalTranscript.trim();
        if (trimmedTranscript) {
            setTranscript(trimmedTranscript);
            setStatus('thinking');
            await new Promise(res => setTimeout(res, 1500));
            const gabiResponse = getGabiResponse(trimmedTranscript);
            setAiResponse(gabiResponse);
        } else {
            setStatus('idle');
        }
    };
    
    recognition.onerror = (event: any) => {
        if (event.error !== 'aborted' && event.error !== 'no-speech') {
             toast({
                variant: "destructive",
                title: "Speech Error",
                description: `An error occurred: ${event.error}`,
            });
        }
        setStatus('idle');
    };
  }, [hasPermission, toast]);

  useEffect(() => {
    if (aiResponse && status === 'thinking') {
      setStatus('speaking');

      let i = 0;
      setDisplayedResponse(''); // Clear previous response before typing
      
      const timer = setInterval(() => {
        setDisplayedResponse(aiResponse.slice(0, i + 1));
        i++;
        if (i >= aiResponse.length) {
          clearInterval(timer);
           setTimeout(() => setStatus('idle'), 1000); // Give a moment before resetting to idle
        }
      }, 40); // typing speed

      return () => clearInterval(timer);
    }
  }, [aiResponse, status]);
  
  const currentText = status === 'speaking' || (status === 'idle' && displayedResponse) ? displayedResponse : transcript;

  return (
    <main className="flex flex-col h-screen bg-transparent text-foreground p-6 overflow-hidden">
        
        <header className="relative z-10 flex items-center justify-start w-full">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2 text-foreground bg-background/30 backdrop-blur-sm hover:bg-background/50 rounded-full">
                <div onClick={() => router.back()}>
                    <ArrowLeft />
                </div>
            </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <Card
                onClick={handleListen}
                className={cn(
                    "w-48 h-48 rounded-full flex items-center justify-center transition-all",
                    "bg-background/40 backdrop-blur-lg border-border/10 shadow-lg",
                    status === 'idle' && 'cursor-pointer active:scale-95'
                )}
            >
                <AnimatePresence mode="wait">
                <motion.div
                    key={status}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="w-36 h-36 rounded-full flex items-center justify-center bg-background/50 shadow-inner"
                >
                    <motion.div
                        className="flex items-center justify-center"
                        animate={status === 'listening' ? { scale: [1, 1.1, 1] } : {}}
                        transition={status === 'listening' ? { duration: 1.5, repeat: Infinity } : {}}
                    >
                        {status === 'thinking' && <Loader2 className="w-16 h-16 text-primary animate-spin" />}
                        {status === 'speaking' && <Bot className="w-16 h-16 text-primary" />}
                        {status === 'idle' && <Mic className="w-16 h-16 text-primary" />}
                        {status === 'listening' && <Mic className="w-16 h-16 text-primary" />}
                        {hasPermission === false && <Mic className="w-16 h-16 text-destructive" />}
                    </motion.div>
                </motion.div>
                </AnimatePresence>
            </Card>

            <Card className="w-full max-w-sm h-32 flex flex-col justify-center items-center bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl p-4">
                <p className="text-xl font-semibold mb-2">{statusText[status]}</p>
                <p className="text-muted-foreground min-h-[2.5em] text-lg">
                  {currentText}
                </p>
            </Card>
        </div>
    </main>
  );
}
