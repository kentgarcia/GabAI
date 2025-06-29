
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, Loader2, Bot, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { gabiChat } from '@/ai/flows/chat-flow';
import { useToast } from '@/hooks/use-toast';

// Extend the window interface for the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const mockMonthlyIncome = 20000;

export default function TalkPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const recognitionRef = useRef<any>(null);

  const statusText = {
    idle: "Initializing...",
    listening: "I'm listening...",
    thinking: "Gabi is thinking...",
    speaking: "Gabi is speaking...",
  };

  useEffect(() => {
    // Request microphone permission and initialize SpeechRecognition
    const initSpeechRecognition = async () => {
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

        recognition.onstart = () => {
          setStatus('listening');
          setTranscript('');
          setAiResponse('');
        };

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              setTranscript(prev => prev + event.results[i][0].transcript);
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          setTranscript(interimTranscript);
        };

        recognition.onend = () => {
          setStatus('idle');
        };
        
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      speechSynthesis.cancel();
    };
  }, [toast]);
  
  // Effect to handle the end of a speech segment
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    const handleRecognitionEnd = async () => {
      // Get the final transcript from the state after it has been updated
      const finalTranscript = transcript.trim();
      
      if (finalTranscript && status === 'idle') {
        setStatus('thinking');

        try {
          const stream = await gabiChat({
            messages: [{ role: 'user', content: finalTranscript }],
            monthlyIncome: mockMonthlyIncome,
          });

          let fullResponse = '';
          for await (const chunk of stream) {
            fullResponse += chunk;
          }
          setAiResponse(fullResponse);
        } catch (error) {
            console.error("AI Error:", error);
            setAiResponse("Sorry, I had trouble connecting. Please try again.");
        }
      } else if (status === 'idle') {
          // If no speech was detected, restart listening
          recognition.start();
      }
    };

    // We can't use onend directly because we need the final state of transcript
    if(status === 'idle' && recognitionRef.current.recognizing === false) {
        handleRecognitionEnd();
    }

  }, [status, transcript]);


  // Effect to handle speaking the AI response
  useEffect(() => {
    if (aiResponse) {
      setStatus('speaking');
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.onend = () => {
        setAiResponse('');
        setTranscript('');
        if (recognitionRef.current) {
          recognitionRef.current.start();
        }
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
