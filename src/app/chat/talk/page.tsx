
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Loader2, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

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

    if (lowerCaseMessage.includes('profit')) {
        return `Your net profit for this month is ₱12,345.67. This is calculated from your total income of ₱${mockMonthlyIncome.toLocaleString()} minus your expenses of ₱7,654.33. Keep up the great work!`;
    }
    if (lowerCaseMessage.includes('receipt') || lowerCaseMessage.includes('sale')) {
        return "Of course. Who is the receipt for and what is the amount? I can create one for you.";
    }
    if (lowerCaseMessage.includes('expenses')) {
        return "Your top expense category this month is Product Costs. You can view a full breakdown on the reports page.";
    }
    if (lowerCaseMessage.includes('email') || lowerCaseMessage.includes('client')) {
        return "I can certainly help with that. What is the main point of the email you'd like to send?";
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
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);


  const statusText = {
    idle: "Initializing...",
    listening: "I'm listening...",
    thinking: "Gabi is thinking...",
    speaking: "Gabi is speaking...",
  };

  useEffect(() => {
    const initSpeechRecognition = async () => {
      try {
        // Ensure microphone access before proceeding
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
        recognition.continuous = false; // Stop after first utterance
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        let finalTranscript = '';

        recognition.onstart = () => {
          setStatus('listening');
          setTranscript('');
          setAiResponse('');
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
          setTranscript(interimTranscript || finalTranscript);
        };
        
        recognition.onend = async () => {
          if (finalTranscript.trim()) {
            setStatus('thinking');
            // Simulate thinking delay
            await new Promise(res => setTimeout(res, 1500));
            const gabiResponse = getGabiResponse(finalTranscript.trim());
            setAiResponse(gabiResponse);
          } else {
            // No speech detected, restart listening if we are not speaking
            if (status !== 'speaking') {
                setStatus('idle');
            }
          }
        };
        
        recognition.onerror = (event: any) => {
            // "aborted" and "no-speech" are normal events, not errors to display.
            if (event.error !== 'aborted' && event.error !== 'no-speech') {
                 console.error('Speech recognition error:', event.error);
                 toast({
                    variant: "destructive",
                    title: "Speech Error",
                    description: `An error occurred: ${event.error}`,
                });
            }
            setStatus('idle');
        };

        recognitionRef.current = recognition;
        recognition.start();

      } catch (error) {
        console.error('Error accessing microphone:', error);
        setHasPermission(false);
      }
    };

    initSpeechRecognition();

    return () => {
      speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop();
      }
    };
  }, [toast, status]);

  useEffect(() => {
    if (aiResponse) {
      setStatus('speaking');
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utteranceRef.current = utterance;

      utterance.onend = () => {
        setAiResponse('');
        setTranscript('');
        setStatus('idle');
      };
      speechSynthesis.speak(utterance);
    }
  }, [aiResponse]);

  return (
    <main className="flex flex-col h-screen bg-background text-foreground p-6 overflow-hidden">
        <header className="flex items-center justify-start w-full">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
            <div onClick={() => router.back()}>
                <ArrowLeft />
            </div>
            </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <AnimatePresence mode="wait">
            <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center"
            >
                <motion.div
                    className="w-36 h-36 bg-primary/20 rounded-full flex items-center justify-center"
                    animate={status === 'listening' ? { scale: [1, 1.1, 1] } : {}}
                    transition={status === 'listening' ? { duration: 1.5, repeat: Infinity } : {}}
                >
                {status === 'thinking' && <Loader2 className="w-16 h-16 text-primary animate-spin" />}
                {status === 'listening' && <Mic className="w-16 h-16 text-primary" />}
                {status === 'speaking' && <Bot className="w-16 h-16 text-primary" />}
                {(status === 'idle' && hasPermission !== false) && <Loader2 className="w-16 h-16 text-primary animate-spin" />}
                {hasPermission === false && <Mic className="w-16 h-16 text-destructive" />}

                </motion.div>
            </motion.div>
            </AnimatePresence>

            <div className="h-24">
                <p className="text-2xl font-semibold mb-2">{statusText[status]}</p>
                <p className="text-muted-foreground min-h-[2.5em]">
                    {transcript || aiResponse}
                </p>
            </div>
            
            {hasPermission === false && (
                <Alert variant="destructive" className="max-w-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Microphone Access Denied</AlertTitle>
                    <AlertDescription>
                    Please enable microphone permissions in your browser settings to use voice commands.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    </main>
  );
}
