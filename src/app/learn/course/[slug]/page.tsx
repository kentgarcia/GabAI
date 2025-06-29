
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const mockCourseData = {
    title: 'BIR Basics for Freelancers',
    description: 'Understand your tax obligations and learn how to file properly with the Bureau of Internal Revenue. This course simplifies the process, from registration to filing your first return.',
    image: 'https://placehold.co/600x400',
    hint: 'business documents taxes',
    modules: [
        {
            title: 'Module 1: Getting Started',
            lessons: [
                { slug: 'bir-basics-lesson-1', title: 'Why Formalize?', duration: '5 min', status: 'completed' },
                { slug: 'bir-basics-lesson-2', title: 'Choosing 8% vs. Graduated Tax', duration: '8 min', status: 'completed' },
            ]
        },
        {
            title: 'Module 2: Your Responsibilities',
            lessons: [
                { slug: 'bir-basics-lesson-3', title: 'How to Issue Official Receipts', duration: '6 min', status: 'next' },
                { slug: 'bir-basics-lesson-4', title: 'Understanding Quarterly ITRs', duration: '10 min', status: 'locked' },
            ]
        },
        {
            title: 'Module 3: Filing Your First Return',
            lessons: [
                { slug: 'bir-basics-lesson-5', title: 'Using the BIR e-Filing System', duration: '12 min', status: 'locked' },
                { slug: 'bir-basics-lesson-6', title: 'Paying Your Taxes', duration: '4 min', status: 'locked' },
            ]
        }
    ]
};

const LessonItem = ({ lesson, courseSlug }: { lesson: { slug: string, title: string, duration: string, status: string }, courseSlug: string }) => {
    const statusIcons = {
        completed: <CheckCircle className="w-5 h-5 text-emerald-500" />,
        next: <PlayCircle className="w-5 h-5 text-primary" />,
        locked: <Lock className="w-5 h-5 text-muted-foreground" />,
    };

    const content = (
        <div className="flex items-center gap-4 py-3 border-b border-border/10 last:border-b-0">
            {statusIcons[lesson.status as keyof typeof statusIcons]}
            <div className="flex-grow">
                <p className={cn("font-medium", lesson.status === 'locked' && "text-muted-foreground")}>{lesson.title}</p>
                <p className="text-sm text-muted-foreground">{lesson.duration}</p>
            </div>
        </div>
    );
    
    if (lesson.status === 'locked') {
        return <div className="cursor-not-allowed opacity-60">{content}</div>;
    }

    return (
        <Link href={`/learn/lesson/${lesson.slug}?course=${courseSlug}`} className="block transition-colors hover:bg-muted/40 rounded-md">
            {content}
        </Link>
    );
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // In a real app, you'd fetch course data based on the slug.
  const course = mockCourseData;
  const firstLessonSlug = course.modules[0]?.lessons[0]?.slug;

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="relative">
             <Image src={course.image} width={400} height={225} alt={course.title} className="w-full aspect-[16/9] object-cover" data-ai-hint={course.hint}/>
             <div className="absolute top-0 left-0 p-4">
                <Button asChild variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50 text-white rounded-full">
                    <Link href="/learn/category/finance-tax">
                        <ArrowLeft />
                    </Link>
                </Button>
             </div>
          </motion.div>
          
          <div className="p-6 pt-0 space-y-6">
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                <p className="text-muted-foreground mt-2">{course.description}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <Button asChild className="w-full h-14 text-lg bg-black rounded-full">
                   <Link href={`/learn/lesson/${firstLessonSlug}?course=${slug}`}>
                     <PlayCircle className="mr-2"/>
                     Start Course
                   </Link>
                </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <h2 className="text-xl font-bold mb-2">What you'll learn</h2>
                 <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-2">
                    {course.modules.map((module, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                            <AccordionTrigger className="p-4 bg-muted/40 rounded-xl hover:no-underline font-semibold text-left">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="px-2 pt-2">
                               {module.lessons.map(lesson => (
                                    <LessonItem key={lesson.title} lesson={lesson} courseSlug={slug as string} />
                               ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                 </Accordion>
            </motion.div>

          </div>

        </motion.div>
      </main>
      <AppFooter />
    </div>
  );
}
