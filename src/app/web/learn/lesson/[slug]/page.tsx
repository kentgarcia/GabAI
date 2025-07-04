
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, CheckCircle, Lock, Download, CornerUpLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const lessonData = {
    title: 'How to Issue Official Receipts',
    videoUrl: "https://www.youtube.com/embed/HacUNa9x8d0",
    transcript: `(Intro music plays)\n\nHello, freelancers and business owners! Welcome back to the Gabi Learn Hub. Today, we're tackling a super important topic: how to properly issue an official receipt, or OR.\n\nFirst things first, why is this important? An official receipt is your proof of payment. It's crucial for your own bookkeeping and for your clients' records. More importantly, it's a requirement from the BIR to ensure all sales are recorded properly for tax purposes.\n\nSo, what needs to be on an official receipt to make it valid? Let's break it down...\n\n1. Your Registered Name or Business Name.\n2. Your Taxpayer Identification Number, or TIN.\n3. Your Registered Address.\n4. The words "Official Receipt" clearly visible.\n5. A unique serial number.\n6. The date of the transaction.\n7. The name, TIN, and address of your client.\n8. A description of the service or goods sold.\n9. The total amount, broken down if there's VAT.\n\n(Video continues with more detail...)`,
    resources: [{ title: "BIR-Compliant OR Template", type: "PDF" }, { title: "Receipt Issuing Checklist", type: "PDF" }],
    comments: [
        { user: "Anna C.", avatar: "https://avatar.iran.liara.run/public/3", comment: "Super helpful! I was always confused about the TIN part for clients.", replies: [{ user: "Gabi Support", avatar: "/gabi-avatar.png", comment: "Glad we could help, Anna!" }] },
        { user: "Mike L.", avatar: "https://avatar.iran.liara.run/public/15", comment: "Can I use a digital OR instead of a physical one?", replies: [] },
    ],
    syllabus: [
        {
            title: "Module 1: Getting Started",
            lessons: [
                { title: "Why Formalize Your Hustle?", status: "completed" },
                { title: "Choosing Your Tax Type: 8% vs. Graduated", status: "completed" },
            ],
        },
        {
            title: "Module 2: Your Responsibilities",
            lessons: [
                { title: "How to Issue Official Receipts", status: "current" },
                { title: "Understanding Quarterly ITRs", status: "locked" },
            ],
        },
    ],
};

const LessonSyllabusItem = ({ lesson, status }: { lesson: { title: string }, status: 'completed' | 'current' | 'locked' }) => (
    <div className="flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-muted/50">
        {status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-500" />}
        {status === 'current' && <div className="w-5 h-5 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/20"/></div>}
        {status === 'locked' && <Lock className="w-5 h-5 text-muted-foreground" />}
        <p className={cn(
            "font-medium",
            status === 'locked' && "text-muted-foreground",
            status === 'current' && "text-primary"
        )}>{lesson.title}</p>
    </div>
);

export default function LessonPlayerPage() {
    return (
        <div className="flex flex-col xl:flex-row gap-8 h-full">
            <main className="flex-1">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                    <iframe
                        src={lessonData.videoUrl}
                        title="Lesson Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{lessonData.title}</h1>
                     <div className="flex gap-2">
                        <Button variant="outline"><ChevronLeft className="mr-2"/> Prev Lesson</Button>
                        <Button>Next Lesson <ChevronRight className="ml-2"/></Button>
                    </div>
                </div>

                <Tabs defaultValue="transcript" className="w-full">
                    <TabsList>
                        <TabsTrigger value="transcript">Transcript</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="notes">My Notes</TabsTrigger>
                        <TabsTrigger value="qna">Q&A</TabsTrigger>
                    </TabsList>
                    <TabsContent value="transcript" className="mt-4 text-muted-foreground leading-relaxed">
                        <p className="whitespace-pre-wrap">{lessonData.transcript}</p>
                    </TabsContent>
                    <TabsContent value="resources" className="mt-4">
                        <div className="space-y-3">
                        {lessonData.resources.map(res => (
                             <a href="#" key={res.title} className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-muted">
                                <div>
                                    <p className="font-semibold">{res.title}</p>
                                    <p className="text-sm text-muted-foreground">{res.type}</p>
                                </div>
                                <Download className="w-5 h-5 text-primary"/>
                            </a>
                        ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="notes" className="mt-4">
                        <Textarea placeholder="Type your personal notes for this lesson here..." rows={8}/>
                        <Button className="mt-2">Save Notes</Button>
                    </TabsContent>
                    <TabsContent value="qna" className="mt-4">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold mb-2">Ask a question</h3>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://avatar.iran.liara.run/public/25" />
                                        <AvatarFallback>J</AvatarFallback>
                                    </Avatar>
                                    <Textarea placeholder="Have a question? Post it here..." className="flex-1"/>
                                </div>
                                <Button className="mt-2 float-right">Post</Button>
                            </div>
                             <div className="space-y-4 pt-8">
                                <h3 className="font-bold">2 Comments</h3>
                                {lessonData.comments.map(comment => (
                                    <div key={comment.user} className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src={comment.avatar} />
                                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-semibold">{comment.user}</p>
                                            <p className="text-muted-foreground">{comment.comment}</p>
                                            <Button variant="ghost" size="sm" className="p-1 h-auto mt-1 text-xs"><CornerUpLeft className="w-3 h-3 mr-1"/> Reply</Button>
                                            {comment.replies.map(reply => (
                                                <div key={reply.user} className="flex gap-4 mt-4">
                                                    <Avatar>
                                                        <AvatarImage src={reply.avatar} />
                                                        <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{reply.user} <Badge variant="secondary" className="bg-primary/20 text-primary">Instructor</Badge></p>
                                                        <p className="text-muted-foreground">{reply.comment}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <aside className="w-full xl:w-80 xl:max-w-xs shrink-0">
                 <div className="sticky top-8 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                                {lessonData.syllabus.map((module, index) => (
                                    <AccordionItem key={module.title} value={`item-${index}`} className="border-b-0">
                                        <AccordionTrigger className="font-semibold text-left p-2 rounded-md hover:bg-muted/50 hover:no-underline">{module.title}</AccordionTrigger>
                                        <AccordionContent className="pb-1">
                                            {module.lessons.map(lesson => (
                                                <LessonSyllabusItem key={lesson.title} lesson={lesson} status={lesson.status as any}/>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                     <div className="flex items-center space-x-2 p-4 bg-emerald-500/10 text-emerald-700 rounded-lg border border-emerald-500/20">
                        <Checkbox id="mark-complete" />
                        <Label htmlFor="mark-complete" className="font-semibold">Mark lesson as complete</Label>
                    </div>
                </div>
            </aside>
        </div>
    );
}
