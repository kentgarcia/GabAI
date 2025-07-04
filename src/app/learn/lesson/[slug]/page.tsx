
'use client';

import Link from 'next/link';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockLessonData: { [key: string]: any } = {
    'bir-basics-lesson-1': {
        title: 'Why Formalize?',
        videoUrl: 'https://www.youtube.com/embed/HacUNa9x8d0',
        transcript: 'This lesson covers the importance of formalizing your business...',
        resources: [],
        nextLesson: 'bir-basics-lesson-2',
        prevLesson: null
    },
    'bir-basics-lesson-2': {
        title: 'Choosing 8% vs. Graduated Tax',
        videoUrl: 'https://www.youtube.com/embed/HacUNa9x8d0',
        transcript: 'This lesson explains the difference between 8% and graduated tax rates...',
        resources: [],
        nextLesson: 'bir-basics-lesson-3',
        prevLesson: 'bir-basics-lesson-1'
    },
    'bir-basics-lesson-3': {
        title: 'How to Issue Official Receipts',
        videoUrl: 'https://www.youtube.com/embed/HacUNa9x8d0',
        transcript: `(Intro music plays)

Hello, freelancers and business owners! Welcome back to the Gabi Learn Hub. Today, we're tackling a super important topic: how to properly issue an official receipt, or OR.

First things first, why is this important? An official receipt is your proof of payment. It's crucial for your own bookkeeping and for your clients' records. More importantly, it's a requirement from the BIR to ensure all sales are recorded properly for tax purposes.

So, what needs to be on an official receipt to make it valid? Let's break it down...

1.  Your Registered Name or Business Name.
2.  Your Taxpayer Identification Number, or TIN.
3.  Your Registered Address.
4.  The words "Official Receipt" clearly visible.
5.  A unique serial number.
6.  The date of the transaction.
7.  The name, TIN, and address of your client.
8.  A description of the service or goods sold.
9.  The total amount, broken down if there's VAT.

(Video continues with more detail...)`,
        resources: [
            { title: 'Official Receipt Template (BIR-Compliant)', type: 'PDF', href: '#' },
            { title: 'Checklist for Issuing Receipts', type: 'PDF', href: '#' },
        ],
        nextLesson: 'bir-basics-lesson-4',
        prevLesson: 'bir-basics-lesson-2'
    },
    'bir-basics-lesson-4': {
        title: 'Understanding Quarterly ITRs',
        videoUrl: 'https://www.youtube.com/embed/HacUNa9x8d0',
        transcript: 'This lesson details how to prepare for your quarterly income tax returns...',
        resources: [],
        nextLesson: null,
        prevLesson: 'bir-basics-lesson-3'
    },
};


export default function LessonPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const courseSlug = searchParams.get('course');
    const lesson = mockLessonData[slug];

    if (!lesson) {
        return (
            <div className="flex flex-col h-screen items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
                <p className="text-muted-foreground mb-8">The lesson you're looking for doesn't exist.</p>
                <Button asChild>
                    <Link href={`/learn/course/${courseSlug || 'finance-tax'}`}>
                        <ArrowLeft className="mr-2" />
                        Back to Course
                    </Link>
                </Button>
            </div>
        );
    }

    const handleMarkComplete = () => {
        toast({
            title: "✅ Lesson Complete!",
            description: `Up next: ${mockLessonData[lesson.nextLesson]?.title || 'Course Finished'}`,
        });
        if (lesson.nextLesson) {
             router.push(`/learn/lesson/${lesson.nextLesson}?course=${courseSlug}`);
        } else {
             router.push(`/learn/course/${courseSlug}`);
        }
    };
    
    return (
        <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
            <header className="p-4 flex items-center gap-2 border-b shrink-0">
                 <Button asChild variant="ghost" size="icon" className="h-10 w-10">
                    <Link href={`/learn/course/${courseSlug}`}>
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-lg font-bold truncate">{lesson.title}</h1>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
                <div className="aspect-video bg-black w-full">
                    <iframe
                        src={lesson.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>

                <div className="p-6">
                    <Tabs defaultValue="transcript">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="transcript">Transcript</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transcript" className="mt-4 p-4 bg-muted/40 rounded-lg max-h-60 overflow-y-auto">
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">{lesson.transcript}</p>
                        </TabsContent>
                        <TabsContent value="resources" className="mt-4 p-4 bg-muted/40 rounded-lg">
                            {lesson.resources.length > 0 ? (
                                <ul className="space-y-3">
                                    {lesson.resources.map((res: any, index: number) => (
                                        <li key={index}>
                                            <a href={res.href} className="flex items-center justify-between text-foreground p-3 rounded-lg bg-background hover:bg-muted transition-colors">
                                                <div className="flex-grow">
                                                    <p className="font-semibold">{res.title}</p>
                                                    <span className="text-xs text-muted-foreground">{res.type}</span>
                                                </div>
                                                <Download className="w-5 h-5 text-primary ml-4" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No resources for this lesson.</p>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            
             <footer className="p-4 border-t bg-background shrink-0 space-y-3">
                 <Button onClick={handleMarkComplete} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-lg">
                     <CheckCircle2 className="mr-2"/> Mark as Complete
                 </Button>
                <div className="flex justify-between gap-3">
                    <Button asChild variant="outline" className="w-full rounded-full" disabled={!lesson.prevLesson}>
                        <Link href={`/learn/lesson/${lesson.prevLesson}?course=${courseSlug}`}>
                            <ArrowLeft className="mr-2"/> Prev
                        </Link>
                    </Button>
                     <Button asChild variant="outline" className="w-full rounded-full" disabled={!lesson.nextLesson}>
                        <Link href={`/learn/lesson/${lesson.nextLesson}?course=${courseSlug}`}>
                           Next <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </div>
             </footer>
        </div>
    );
}
