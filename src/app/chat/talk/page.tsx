
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Extend the window interface for the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Response Types & Mock Data ---
type AiResponse = {
  type: 'text' | 'dataCard' | 'barChart' | 'task';
  content: any;
  key: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
};


const getGabiResponse = (message: string): AiResponse => {
    const lowerCaseMessage = message.toLowerCase();
    const key = new Date().getTime().toString();

    if (lowerCaseMessage.includes('profit')) {
        return {
            type: 'dataCard',
            key,
            content: { title: "This Month's Net Profit", value: 12345.67 }
        };
    }
    if (lowerCaseMessage.includes('top expenses')) {
        return {
            type: 'barChart',
            key,
            content: {
                title: "Top Expense Categories",
                data: [
                    { label: 'Product Costs', value: 7654 },
                    { label: 'Marketing', value: 5500 },
                    { label: 'Software', value: 1200 },
                ],
                maxValue: 8000
            }
        };
    }
    if (lowerCaseMessage.includes('draft') && lowerCaseMessage.includes('reminder')) {
        return {
            type: 'task',
            key,
            content: {
                title: "Drafted Reminder",
                text: "Hi Client,\n\nJust a friendly reminder that Invoice #123 is due next week. Please let me know if you have any questions.\n\nThanks,\nJuan",
                actionLabel: "Send Reminder"
            }
        };
    }
    if (lowerCaseMessage.includes('tax')) {
         return {
            type: 'text',
            key,
            content: `Based on your income this month and using the 8% tax rate, you should consider setting aside approximately ₱1,600 for your taxes. Remember, this is just an estimate!`,
        };
    }

    return {
        type: 'text',
        key,
        content: "I'm sorry, I didn't quite catch that. Could you try asking about profit, top expenses, or drafting a reminder?",
    };
};

const sampleCommands = [
    "What's my profit this month?",
    "Show me my top expenses.",
    "Draft a payment reminder.",
];

// --- Sub-components for Rich Responses ---

const SoundWave = () => (
    <div className="flex items-end justify-center gap-1 h-16 w-16 text-primary">
        {[0.4, 0.7, 0.5, 0.8, 0.4].map((height, i) => (
            <motion.div
                key={i}
                className="w-2 bg-current rounded-full"
                style={{ height: `${height * 100}%` }}
                animate={{ scaleY: [height, 1, height] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.15
                }}
            />
        ))}
    </div>
);

const DataCardComponent = ({ content }: { content: { title: string, value: number } }) => (
    <Card className="bg-background/80 backdrop-blur-lg border-primary/20 shadow-xl">
        <CardHeader>
            <CardTitle className="text-muted-foreground text-base font-medium">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-4xl font-bold text-primary">{formatCurrency(content.value)}</p>
        </CardContent>
    </Card>
);

const BarChartComponent = ({ content }: { content: { title: string, data: { label: string, value: number }[], maxValue: number } }) => (
    <Card className="bg-background/80 backdrop-blur-lg border-primary/20 shadow-xl">
        <CardHeader>
            <CardTitle className="text-base font-medium">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {content.data.map(item => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                    <p className="w-24 truncate text-muted-foreground">{item.label}</p>
                    <div className="flex-grow bg-muted rounded-full h-4">
                        <motion.div
                            className="bg-primary h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / content.maxValue) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                    <p className="w-20 text-right font-semibold">{formatCurrency(item.value)}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

const TaskComponent = ({ content }: { content: { title: string, text: string, actionLabel: string } }) => {
    const { toast } = useToast();
    return (
        <Card className="bg-background/80 backdrop-blur-lg border-primary/20 shadow-xl">
            <CardHeader>
                <CardTitle className="text-base font-medium">{content.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap text-sm bg-muted/50 p-3 rounded-md mb-4">{content.text}</p>
                <Button className="w-full bg-black text-white" onClick={() => toast({ title: "Action Complete!", description: "The reminder has been sent." })}>
                    {content.actionLabel}
                </Button>
            </CardContent>
        </Card>
    );
};


// --- Main Page Component ---

export default function TalkPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);

  const statusText = {
    idle: "Tap the mic to speak.",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: aiResponse?.type === 'text' ? displayedText : "Gabi is responding...",
  };

  const handleListen = useCallback(() => {
    if (status === 'idle' && recognitionRef.current) {
        setTranscript('');
        setAiResponse(null);
        setDisplayedText('');
        try {
            recognitionRef.current.start();
        } catch(err) {
            // Speech recognition may already be started, which is fine.
        }
    }
  }, [status]);

  useEffect(() => {
    // Permission & speech recognition setup
    const initPermissionsAndRecognition = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          toast({ variant: "destructive", title: "Browser Not Supported" });
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
    return () => recognitionRef.current?.abort();
  }, [toast]);

  useEffect(() => {
    // Speech recognition event listeners
    if (!hasPermission || !recognitionRef.current) return;
    const recognition = recognitionRef.current;
    let finalTranscript = '';

    recognition.onstart = () => { setStatus('listening'); finalTranscript = ''; };
    recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          event.results[i].isFinal ? finalTranscript += event.results[i][0].transcript : interimTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript || interimTranscript);
    };
    recognition.onend = async () => {
        const trimmedTranscript = finalTranscript.trim();
        if (trimmedTranscript) {
            setTranscript(trimmedTranscript);
            setStatus('thinking');
            await new Promise(res => setTimeout(res, 1000));
            const gabiResponse = getGabiResponse(trimmedTranscript);
            setAiResponse(gabiResponse);
            setStatus('speaking');
        } else {
            setStatus('idle');
        }
    };
    recognition.onerror = (event: any) => { if (event.error !== 'aborted' && event.error !== 'no-speech') { toast({ variant: "destructive", title: "Speech Error", description: `An error occurred: ${event.error}` }); } setStatus('idle'); };
  }, [hasPermission, toast]);

  useEffect(() => {
    // Typewriter effect for text responses, and auto-reset for rich cards
    if (!aiResponse || status !== 'speaking') return;

    if (aiResponse.type === 'text') {
      let i = 0;
      setDisplayedText('');
      const timer = setInterval(() => {
        setDisplayedText(aiResponse.content.slice(0, i + 1));
        i++;
        if (i >= aiResponse.content.length) {
          clearInterval(timer);
          setTimeout(() => setStatus('idle'), 2000);
        }
      }, 25);
      return () => clearInterval(timer);
    } else {
      // For rich cards, just show them and then reset to idle after a delay
      const timer = setTimeout(() => setStatus('idle'), 6000);
      return () => clearTimeout(timer);
    }
  }, [aiResponse, status]);

  const currentText = (status === 'listening' || status === 'thinking') ? transcript : statusText[status];

  return (
    <main className="flex flex-col h-screen bg-transparent text-foreground p-6 overflow-hidden">
        
        <header className="relative z-10 flex items-center justify-start w-full">
            <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2 text-foreground bg-background/30 backdrop-blur-sm hover:bg-background/50 rounded-full">
                <div onClick={() => router.back()}>
                    <ArrowLeft />
                </div>
            </Button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div
                onClick={handleListen}
                className={cn(
                    "w-48 h-48 rounded-full flex items-center justify-center transition-all",
                    "bg-background/40 backdrop-blur-lg border-border/10 shadow-lg",
                    status === 'idle' && 'cursor-pointer active:scale-95'
                )}
            >
                <div className="w-36 h-36 rounded-full flex items-center justify-center bg-background/50 shadow-inner">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {status === 'thinking' && <Loader2 className="w-16 h-16 text-primary animate-spin" />}
                            {status === 'speaking' && <Bot className="w-16 h-16 text-primary" />}
                            {status === 'idle' && <Mic className="w-16 h-16 text-primary" />}
                            {status === 'listening' && <SoundWave />}
                            {hasPermission === false && <Mic className="w-16 h-16 text-destructive" />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Card className="w-full max-w-sm h-32 flex flex-col justify-center items-center bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl p-4">
                <p className="text-xl font-semibold mb-2">{aiResponse?.type !== 'text' ? statusText[status] : "Gabi is speaking..."}</p>
                <p className="text-muted-foreground min-h-[2.5em] text-lg">
                  {(aiResponse?.type === 'text' && status === 'speaking') ? displayedText : transcript }
                </p>
            </Card>

            <AnimatePresence>
              {status === 'idle' && !aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-sm"
                >
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Try saying...</h3>
                  <ul className="space-y-1.5 text-foreground/80">
                    {sampleCommands.map(cmd => <li key={cmd}>"{cmd}"</li>)}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20">
            <AnimatePresence>
                {aiResponse && aiResponse.type !== 'text' && status === 'speaking' && (
                    <motion.div
                        key={aiResponse.key}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        {aiResponse.type === 'dataCard' && <DataCardComponent content={aiResponse.content} />}
                        {aiResponse.type === 'barChart' && <BarChartComponent content={aiResponse.content} />}
                        {aiResponse.type === 'task' && <TaskComponent content={aiResponse.content} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </main>
  );
}
