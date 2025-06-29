
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
  type: 'text' | 'dataCard' | 'barChart' | 'task' | 'greeting' | 'goodbye';
  spokenResponse: string;
  content: any;
  key: string;
  followUps: string[];
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

    // Greetings
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return {
            type: 'greeting',
            spokenResponse: "Hello there! How can I assist you today?",
            key,
            content: null,
            followUps: ["What's my profit this month?", "Show me my top expenses."]
        };
    }
    // Goodbyes
    if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('exit')) {
        return {
            type: 'goodbye',
            spokenResponse: "Goodbye! Let me know if you need anything else.",
            key,
            content: null,
            followUps: []
        };
    }

    if (lowerCaseMessage.includes('profit')) {
        return {
            type: 'dataCard',
            spokenResponse: "Here is your net profit for this month. It's looking healthy!",
            key,
            content: { title: "This Month's Net Profit", value: 12345.67 },
            followUps: ["How does this compare to last month?", "What were my income sources?"]
        };
    }
    if (lowerCaseMessage.includes('top expenses')) {
        return {
            type: 'barChart',
            spokenResponse: "Here are your top expense categories. Your product costs are the highest.",
            key,
            content: {
                title: "Top Expense Categories",
                data: [
                    { label: 'Product Costs', value: 7654 },
                    { label: 'Marketing', value: 5500 },
                    { label: 'Software', value: 1200 },
                ],
                maxValue: 8000
            },
            followUps: ["Show all my expenses.", "Which expense grew the most?"]
        };
    }
    if (lowerCaseMessage.includes('draft') && lowerCaseMessage.includes('reminder')) {
        return {
            type: 'task',
            spokenResponse: "I've drafted that payment reminder for you. Would you like to send it?",
            key,
            content: {
                title: "Drafted Reminder",
                text: "Hi Client,\n\nJust a friendly reminder that Invoice #123 is due next week. Please let me know if you have any questions.\n\nThanks,\nJuan",
                actionLabel: "Send Reminder"
            },
            followUps: ["Yes, send it.", "Make it sound more urgent."]
        };
    }
    if (lowerCaseMessage.includes('tax')) {
         return {
            type: 'text',
            spokenResponse: `Based on your income this month and using the 8% tax rate, you should consider setting aside approximately ₱1,600 for your taxes. Remember, this is just an estimate!`,
            key,
            content: null,
            followUps: ["When is my next tax deadline?", "Explain the 8% tax rate again."]
        };
    }

    // Follow-up responses
    if (lowerCaseMessage.includes('compare to last month')) {
        return {
            type: 'text',
            spokenResponse: "Your profit this month is up 15% compared to last month. Great job!",
            key,
            content: null,
            followUps: ["What were my top expenses?", "Show my income sources."]
        };
    }
     if (lowerCaseMessage.includes('yes, send it')) {
        return {
            type: 'text',
            spokenResponse: "Okay, the reminder has been sent!",
            key,
            content: null,
            followUps: []
        };
    }
     if (lowerCaseMessage.includes('make it sound more urgent')) {
        return {
            type: 'task',
            spokenResponse: "I've updated the draft to be more firm. How does this look?",
            key,
            content: {
                title: "Updated Reminder Draft",
                text: "Hi Client,\n\nThis is a follow-up regarding Invoice #123, which is now approaching its due date. Prompt payment would be greatly appreciated.\n\nThanks,\nJuan",
                actionLabel: "Send Updated Reminder"
            },
            followUps: ["Yes, send it.", "Go back to the first draft."]
        };
    }

    return {
        type: 'text',
        key,
        spokenResponse: "I'm sorry, I didn't quite catch that. Could you try asking about profit, top expenses, or drafting a reminder?",
        content: null,
        followUps: []
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
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([]);
  const [isResponseVisible, setIsResponseVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);

  const startNewInteraction = () => {
    setAiResponse(null);
    setTranscript('');
    setDisplayedText('');
    setSuggestedFollowUps([]);
    setIsResponseVisible(false);
  };

  const handleListen = useCallback(() => {
    if (status === 'listening' || status === 'thinking') return;
    startNewInteraction();
    if (recognitionRef.current) {
        try {
            recognitionRef.current.start();
        } catch(err) {
             // Speech recognition may already be started, which is fine.
        }
    }
  }, [status]);

  const processRequest = (text: string) => {
    setStatus('thinking');
    setTimeout(() => {
        const gabiResponse = getGabiResponse(text);
        setAiResponse(gabiResponse);
        setStatus('speaking');
        setIsResponseVisible(true);
    }, 1200);
  };
  
  const handleFollowUpClick = (prompt: string) => {
    if (status !== 'idle') return;
    startNewInteraction();
    setTranscript(prompt);
    processRequest(prompt);
  };


  useEffect(() => {
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
            processRequest(trimmedTranscript);
        } else {
            setStatus('idle');
        }
    };
    recognition.onerror = (event: any) => { if (event.error !== 'aborted' && event.error !== 'no-speech') { toast({ variant: "destructive", title: "Speech Error", description: `An error occurred: ${event.error}` }); } setStatus('idle'); };
  }, [hasPermission, toast]);

  useEffect(() => {
    if (status !== 'speaking' || !aiResponse) return;

    const textToType = aiResponse.spokenResponse;
    setDisplayedText(''); // Reset before typing
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(prev => textToType.slice(0, i + 1));
      i++;
      if (i >= textToType.length) {
        clearInterval(timer);
        setSuggestedFollowUps(aiResponse.followUps);
        setStatus('idle');
      }
    }, 30);
    return () => clearInterval(timer);
  }, [aiResponse, status]);
  
  const statusTextMap = {
    idle: aiResponse ? "Tap the mic to ask a follow-up." : "Tap the mic to speak.",
    listening: "Listening...",
    thinking: "Thinking...",
    speaking: "Gabi is responding...",
  };

  return (
    <main className="flex flex-col h-screen bg-transparent text-foreground p-6 overflow-hidden">
        
        <header className="absolute top-6 left-6 right-6 z-10 flex items-center justify-start w-full">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground bg-background/30 backdrop-blur-sm hover:bg-background/50 rounded-full" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
        </header>
        
        <div className={cn(
            "flex-1 flex flex-col items-center w-full transition-all duration-500",
            isResponseVisible ? "justify-start pt-14" : "justify-center"
        )}>
            <motion.div layout className="flex flex-col items-center space-y-4 w-full max-w-sm">
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

                <Card className="w-full min-h-[128px] flex flex-col justify-center items-center bg-background/40 backdrop-blur-lg border-border/10 rounded-2xl p-4 text-center">
                    <p className="text-xl font-semibold mb-2">{statusTextMap[status]}</p>
                     <p className="text-muted-foreground text-lg min-h-[2.5em]">
                      {status === 'speaking' || (status === 'idle' && aiResponse) ? displayedText : transcript}
                    </p>
                </Card>
            </motion.div>

            <div className="flex-1 w-full max-w-sm mx-auto flex flex-col justify-center gap-4 mt-6">
                <AnimatePresence>
                    {status === 'idle' && !aiResponse && (
                        <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center"
                        >
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Try saying...</h3>
                        <ul className="space-y-1.5 text-foreground/80">
                            {sampleCommands.map(cmd => <li key={cmd}>"{cmd}"</li>)}
                        </ul>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isResponseVisible && aiResponse && aiResponse.type !== 'text' && aiResponse.type !== 'greeting' && aiResponse.type !== 'goodbye' &&(
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

                <AnimatePresence>
                    {suggestedFollowUps.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                        >
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Try a follow-up...</h3>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {suggestedFollowUps.map(prompt => (
                                    <Button key={prompt} variant="outline" size="sm" className="rounded-full bg-background/50" onClick={() => handleFollowUpClick(prompt)}>
                                        {prompt}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </main>
  );
}
