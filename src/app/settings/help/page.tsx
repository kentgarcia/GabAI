
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Search,
    ChevronRight,
    MessageSquare,
    Mail,
    Bug
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const faqItems = [
    {
        question: 'How do I connect my bank account or e-wallet?',
        answer: "Go to Settings > Integrations & Connections. From there, you can find your bank or e-wallet and click 'Connect'. You will be securely redirected to our partner provider to authenticate and grant read-only access. GabAI never sees or stores your login credentials."
    },
    {
        question: 'Is my financial data secure?',
        answer: 'Absolutely. We use bank-level encryption (AES-256) for all data stored on our servers. When you upload files, they are processed locally on your device and never stored by us. Our privacy policy has more details.'
    },
    {
        question: 'How does the 8% vs. Graduated tax estimation work?',
        answer: "The 8% option is a flat tax on your gross income (after the first ₱250,000 annual exemption). The Graduated option calculates tax based on your net income (income minus expenses) using brackets from 0% to 35%. You can change this anytime in Settings > Tax Settings. We recommend consulting a professional for official advice."
    }
];

export default function HelpPage() {
    const { toast } = useToast();
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [ticketType, setTicketType] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");

    const handleSupportClick = (type: 'chat' | 'email') => {
        if (type === 'chat') {
            toast({ title: 'Connecting to Gabi...', description: 'Please wait while we open the chat window.' });
        } else {
            toast({ title: 'Opening Email Client', description: 'Please compose your message to support@gabai.app.' });
        }
    }
    
    const handleTicketSubmit = () => {
        if (!ticketType || !ticketDescription) {
            toast({
                title: 'Incomplete Form',
                description: 'Please select an issue type and provide a description.',
                variant: 'destructive',
            });
            return;
        }

        toast({
            title: '✅ Ticket Submitted!',
            description: "We've received your report and will look into it. Thank you for helping us improve!",
        });

        // Reset form and close dialog
        setTicketType("");
        setTicketDescription("");
        setIsReportDialogOpen(false);
    }

  return (
    <main className="flex flex-col h-screen p-6 text-foreground">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col flex-grow min-h-0"
        >
            <motion.header variants={itemVariants} className="flex items-center gap-2 mb-8 shrink-0">
                <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                    <Link href="/settings">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Help Center</h1>
            </motion.header>

             <motion.div variants={itemVariants} className="relative mb-6 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10 h-12 text-base bg-background/40"
                />
            </motion.div>

            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <motion.section variants={itemVariants} className="space-y-4">
                    <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                       {faqItems.map((item, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className="bg-background/40 rounded-xl border px-4 mb-2">
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                       ))}
                    </Accordion>
                </motion.section>

                <motion.section variants={itemVariants} className="mt-8">
                    <h2 className="text-lg font-bold mb-4">Contact Support</h2>
                     <div className="space-y-3">
                        <Card className="bg-background/40 hover:bg-muted/40 transition-colors" onClick={() => handleSupportClick('chat')}>
                           <CardContent className="p-4 flex items-center gap-4 cursor-pointer">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                <div className="flex-grow">
                                    <p className="font-semibold">Chat with Gabi</p>
                                    <p className="text-sm text-muted-foreground">Get instant answers from our AI assistant.</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                           </CardContent>
                        </Card>
                         <Card className="bg-background/40 hover:bg-muted/40 transition-colors" onClick={() => handleSupportClick('email')}>
                           <CardContent className="p-4 flex items-center gap-4 cursor-pointer">
                                <Mail className="w-6 h-6 text-primary" />
                                <div className="flex-grow">
                                    <p className="font-semibold">Email Support</p>
                                    <p className="text-sm text-muted-foreground">Reach our human support team.</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                           </CardContent>
                        </Card>
                    </div>
                </motion.section>
                
                <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                    <DialogTrigger asChild>
                         <motion.section variants={itemVariants} className="mt-8">
                             <Card className="bg-background/40 hover:bg-muted/40 transition-colors cursor-pointer">
                               <CardContent className="p-4 flex items-center gap-4">
                                    <Bug className="w-6 h-6 text-red-500" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">Something not working?</p>
                                        <p className="text-sm text-muted-foreground">Help us improve by reporting a bug.</p>
                                    </div>
                                    <Button variant="link" size="sm" className="p-0 h-auto">Report an Issue</Button>
                               </CardContent>
                            </Card>
                        </motion.section>
                    </DialogTrigger>
                    <DialogContent className="bg-background/80 backdrop-blur-md border">
                        <DialogHeader>
                            <DialogTitle>Report an Issue</DialogTitle>
                            <DialogDescription>
                                Tell us what went wrong. Your feedback is valuable in helping us improve GabAI.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="issue-type" className="text-right">Issue Type</Label>
                                <Select onValueChange={setTicketType}>
                                    <SelectTrigger id="issue-type" className="col-span-3">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bug">Bug Report</SelectItem>
                                        <SelectItem value="feature-request">Feature Request</SelectItem>
                                        <SelectItem value="data-discrepancy">Data Discrepancy</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please describe the issue in detail."
                                    className="col-span-3"
                                    rows={5}
                                    value={ticketDescription}
                                    onChange={(e) => setTicketDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                               <Button type="button" variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={handleTicketSubmit}>Submit Ticket</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </motion.div>
    </main>
  );
}
