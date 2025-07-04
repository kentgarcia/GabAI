'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Check, ChevronRight, Plus, Trash2, Mail, MessageCircle, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Details' },
  { id: 2, name: 'Review' },
  { id: 3, name: 'Send' },
];

const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '₱0.00';
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(numValue);
};

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors',
                currentStep > step.id ? 'bg-primary text-primary-foreground' :
                currentStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span className={cn(
                'font-semibold',
                 currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
            )}>{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
                "flex-1 h-1 rounded-full transition-colors",
                currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function SendInvoicePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [client, setClient] = useState('Innovate Corp.');
    const [items, setItems] = useState([
        { description: 'Graphic Design Services', amount: '20000' }
    ]);
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // 15 days from now

    const handleAddItem = () => setItems([...items, { description: '', amount: '' }]);
    const handleRemoveItem = (index: number) => setItems(items.filter((_, i) => i !== index));
    const handleItemChange = (index: number, field: 'description' | 'amount', value: string) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const totalAmount = items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);

    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
    
    const handleSend = (method: string) => {
        toast({
            title: '✅ Invoice Sent!',
            description: `Your invoice has been sent via ${method}.`
        });
        setTimeout(() => router.push('/dashboard'), 1000);
    }

    const isStep1Valid = client && items.every(item => item.description && item.amount) && dueDate;

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
             <header className="flex items-center gap-2 mb-4 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/add">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Send an Invoice</h1>
            </header>
            
            <Stepper currentStep={step} />

            <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6">
                <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                        <h2 className="text-xl font-semibold">Invoice Details</h2>
                        <div className="space-y-2">
                            <Label htmlFor="client">Client Name</Label>
                            <Input id="client" value={client} onChange={(e) => setClient(e.target.value)} className="bg-background/30 h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label>Line Items</Label>
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="bg-background/30" />
                                    <Input type="number" placeholder="Amount" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} className="bg-background/30 w-32" />
                                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={handleAddItem} className="w-full"><Plus className="mr-2" /> Add Item</Button>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-background/30 h-12" />
                        </div>
                    </motion.div>
                )}
                 {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                        <h2 className="text-xl font-semibold">Review Invoice</h2>
                        <Card className="bg-background/30">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">To:</p>
                                    <p className="font-semibold">{client}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Due:</p>
                                    <p className="font-semibold">{new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <Separator />
                                {items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <p>{item.description}</p>
                                        <p className="font-semibold">{formatCurrency(item.amount)}</p>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between items-baseline">
                                    <p className="text-muted-foreground">Total:</p>
                                    <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
                 {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                        <h2 className="text-xl font-semibold">Send Invoice</h2>
                         <p className="text-muted-foreground">Choose how to send the invoice to {client}.</p>
                         <div className="space-y-3">
                            <Button onClick={() => handleSend('Email')} className="w-full h-14 bg-blue-600 text-white rounded-lg"><Mail className="mr-2"/> Send via Email</Button>
                            <Button onClick={() => handleSend('Messenger')} className="w-full h-14 bg-purple-600 text-white rounded-lg"><MessageCircle className="mr-2"/> Send via Messenger</Button>
                             <Button onClick={() => handleSend('Viber')} className="w-full h-14 bg-violet-800 text-white rounded-lg"><Send className="mr-2"/> Send via Viber</Button>
                         </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            <div className="pt-8 flex gap-3">
                {step > 1 && (
                    <Button variant="outline" className="w-full rounded-full h-14" onClick={handleBack}>
                        Back
                    </Button>
                )}
                {step < 3 && (
                    <Button className="w-full bg-black text-white rounded-full h-14" onClick={handleNext} disabled={step === 1 ? !isStep1Valid : false}>
                       {step === 1 ? "Review" : "Proceed to Send"} <ChevronRight className="ml-2" />
                    </Button>
                )}
            </div>
        </main>
    );
}