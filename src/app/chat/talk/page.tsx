
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Loader2, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);


  const statusText = {
    idle: "Tap the mic to speak.",
    listening: "I'm listening...",
    thinking: "Gabi is thinking...",
    speaking: "Gabi is speaking...",
  };

  const handleListen = useCallback(() => {
    if (status === 'idle' && recognitionRef.current) {
        setTranscript('');
        setAiResponse('');
        try {
            recognitionRef.current.start();
        } catch(err) {
            console.error("Speech recognition already started.");
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
        console.error('Error accessing media devices:', error);
        setHasPermission(false);
         toast({
          variant: 'destructive',
          title: 'Permissions Denied',
          description: 'Please enable microphone permissions in your browser settings to use this feature.',
        });
      }
    };

    initPermissionsAndRecognition();

    return () => {
      speechSynthesis.cancel();
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
        setStatus('idle');
        if (finalTranscript.trim()) {
            setStatus('thinking');
            await new Promise(res => setTimeout(res, 1500));
            const gabiResponse = getGabiResponse(finalTranscript.trim());
            setAiResponse(gabiResponse);
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
    if (aiResponse) {
      setStatus('speaking');
      const utterance = new SpeechSynthesisUtterance(aiResponse);

      utterance.onend = () => {
        setAiResponse('');
        setTranscript('');
        setStatus('idle');
      };
      
      speechSynthesis.speak(utterance);
    }
  }, [aiResponse]);

  return (
    <main className="relative flex flex-col h-screen bg-black text-white p-6 overflow-hidden">
        <header className="relative z-10 flex items-center justify-start w-full">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2 text-white hover:bg-white/10">
            <div onClick={() => router.back()}>
                <ArrowLeft />
            </div>
            </Button>
        </header>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <motion.div
                onClick={handleListen}
                className={cn(
                    "w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center transition-transform",
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
                    className="w-36 h-36 bg-primary/30 rounded-full flex items-center justify-center"
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
            </motion.div>

            <div className="h-24">
                <p className="text-2xl font-semibold mb-2">{statusText[status]}</p>
                <p className="text-gray-400 min-h-[2.5em]">
                    {transcript || aiResponse}
                </p>
            </div>
            
            {hasPermission === false && (
                <Alert variant="destructive" className="max-w-sm bg-destructive/20 text-destructive-foreground border-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Microphone Access Denied</AlertTitle>
                    <AlertDescription>
                    Please enable microphone permissions in your browser to use voice commands.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    </main>
  );
}
