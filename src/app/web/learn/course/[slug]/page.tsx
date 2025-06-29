
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlayCircle, CheckCircle, Lock, FileText, Award, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const courseData = {
    title: "BIR Basics for Freelancers",
    description: "Navigate the essentials of Philippine tax compliance for freelancers. This course demystifies the Bureau of Internal Revenue (BIR), guiding you from registration to filing your first tax return, so you can focus on your work with peace of mind.",
    bannerImage: "https://placehold.co/1200x400.png",
    bannerHint: "tax documents",
    instructor: { name: "JuanTax Academy", image: "https://placehold.co/100x100.png", hint: "logo" },
    stats: { duration: "1.5 hours", lessons: 6, access: "Free" },
    whatYoullLearn: [
        "Differentiate between 8% flat tax and graduated income tax.",
        "Confidently issue BIR-compliant official receipts.",
        "Understand your quarterly and annual tax responsibilities.",
        "Navigate the BIR's e-filing system to submit your returns.",
    ],
    syllabus: [
        {
            title: "Module 1: Getting Started",
            lessons: [
                { title: "Why Formalize Your Hustle?", duration: "5 min", status: "completed" },
                { title: "Choosing Your Tax Type: 8% vs. Graduated", duration: "8 min", status: "completed" },
            ],
        },
        {
            title: "Module 2: Your Responsibilities",
            lessons: [
                { title: "How to Issue Official Receipts", duration: "6 min", status: "next" },
                { title: "Understanding Quarterly ITRs", duration: "10 min", status: "locked" },
            ],
        },
        {
            title: "Module 3: Filing & Payment",
            lessons: [
                { title: "A Guide to BIR Form 1701Q", duration: "12 min", status: "locked" },
                { title: "Paying Your Taxes: Channels & Deadlines", duration: "4 min", status: "locked" },
            ],
        },
    ],
};

const LessonItem = ({ lesson, isLocked }: { lesson: { title: string, duration: string }, isLocked: boolean }) => (
    <Link href={isLocked ? "#" : "/web/learn/lesson/sample-lesson"}>
        <div className={cn("flex items-center gap-4 py-3 px-2 rounded-md", isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-muted")}>
            {isLocked ? <Lock className="w-5 h-5 text-muted-foreground" /> : <PlayCircle className="w-5 h-5 text-primary" />}
            <div className="flex-grow">
                <p className="font-medium">{lesson.title}</p>
            </div>
            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
        </div>
    </Link>
);


export default function CourseDetailPage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-8">
                    <Card className="overflow-hidden">
                        <Image src={courseData.bannerImage} width={800} height={300} alt={courseData.title} className="w-full h-auto object-cover" data-ai-hint={courseData.bannerHint} />
                    </Card>

                    <h1 className="text-4xl font-bold">{courseData.title}</h1>
                    <p className="text-lg text-muted-foreground">{courseData.description}</p>
                    
                    <div className="flex items-center gap-4">
                         <Avatar>
                            <AvatarImage src={courseData.instructor.image} data-ai-hint={courseData.instructor.hint}/>
                            <AvatarFallback>{courseData.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-muted-foreground">Taught by</p>
                            <p className="font-bold">{courseData.instructor.name}</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>What you'll learn</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {courseData.whatYoullLearn.map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Course Syllabus</h2>
                         <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2">
                            {courseData.syllabus.map((module, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                                    <AccordionTrigger className="p-4 bg-muted/40 rounded-xl hover:no-underline font-semibold text-left">
                                        {module.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-2 pt-2">
                                       {module.lessons.map(lesson => (
                                            <LessonItem key={lesson.title} lesson={lesson} isLocked={lesson.status === 'locked'} />
                                       ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                         </Accordion>
                    </div>

                </main>
                <aside className="lg:col-span-1">
                    <div className="sticky top-8 space-y-4">
                         <Card>
                             <CardContent className="p-6 space-y-4">
                                 <h3 className="text-lg font-bold">Course Details</h3>
                                 <div className="flex items-center justify-between text-sm">
                                     <span className="text-muted-foreground">Access</span>
                                     <Badge variant="outline" className="text-emerald-600 border-emerald-500">{courseData.stats.access}</Badge>
                                 </div>
                                 <div className="flex items-center justify-between text-sm">
                                     <span className="text-muted-foreground">Duration</span>
                                     <span className="font-semibold">{courseData.stats.duration}</span>
                                 </div>
                                  <div className="flex items-center justify-between text-sm">
                                     <span className="text-muted-foreground">Lessons</span>
                                     <span className="font-semibold">{courseData.stats.lessons}</span>
                                 </div>
                                  <div className="flex items-center justify-between text-sm">
                                     <span className="text-muted-foreground">Certificate</span>
                                     <span className="font-semibold flex items-center gap-1"><Award className="w-4 h-4 text-yellow-500"/> Included</span>
                                 </div>
                                 <Button size="lg" className="w-full mt-4">Start Course</Button>
                             </CardContent>
                         </Card>
                         <Card>
                             <CardHeader>
                                 <CardTitle>Student Reviews</CardTitle>
                             </CardHeader>
                             <CardContent className="space-y-4">
                                 <div className="flex items-center gap-2">
                                     <div className="flex text-yellow-400">
                                         <Star/><Star/><Star/><Star/><Star className="text-muted-foreground/30"/>
                                     </div>
                                     <p className="text-sm font-semibold">4.8 (1,234 reviews)</p>
                                 </div>
                                 <div className="text-sm border-t pt-4">
                                     <p className="italic">"This course made taxes so much less scary! Highly recommended for all Filipino freelancers."</p>
                                     <p className="font-semibold mt-2">- Maria D.</p>
                                 </div>
                             </CardContent>
                         </Card>
                    </div>
                </aside>
            </div>
        </div>
    );
}
