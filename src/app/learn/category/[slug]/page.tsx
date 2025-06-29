
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { AppFooter } from '@/components/layout/AppFooter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Sparkles, Clock, BarChart2 } from 'lucide-react';

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

const mockCourses: { [key: string]: any[] } = {
  'finance-tax': [
    { title: 'BIR Basics for Freelancers', partner: 'JuanTax', level: 'Beginner', duration: '1.5 hours', access: 'Free' },
    { title: 'Advanced Bookkeeping', partner: 'Gabi Academy', level: 'Intermediate', duration: '3 hours', access: 'Pro' },
    { title: 'Understanding Your P&L', partner: 'Gabi Academy', level: 'Beginner', duration: '30 mins', access: 'Free' },
  ],
  'marketing': [
    { title: 'Social Media Marketing 101', partner: 'AdSpark', level: 'Beginner', duration: '2 hours', access: 'Free' },
  ],
  'business-ops': [
    { title: 'Advanced Inventory Management', partner: 'Gabi Academy', level: 'Intermediate', duration: '1 hour', access: 'Pro' },
  ],
  'legal': [
    { title: 'DTI & Business Registration', partner: 'Gabi Academy', level: 'Beginner', duration: '45 mins', access: 'Free' },
  ]
};

const categoryTitles: { [key: string]: string } = {
    'finance-tax': 'Finance & Tax',
    'marketing': 'Marketing',
    'business-ops': 'Business Ops',
    'legal': 'Legal'
};


export default function CourseCategoryPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const courses = mockCourses[slug as keyof typeof mockCourses] || [];
    const categoryTitle = categoryTitles[slug] || "Category";

  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
            <motion.header variants={itemVariants} className="flex items-center gap-2 -ml-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/learn">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">{categoryTitle}</h1>
            </motion.header>

            <motion.div variants={itemVariants} className="space-y-4">
                {courses.map((course, index) => (
                     <Card key={index} className="rounded-2xl border bg-background/40 backdrop-blur-lg border-border/10 overflow-hidden">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{course.title}</CardTitle>
                                {course.access === 'Pro' ? (
                                    <Badge variant="default" className="bg-primary/80 shrink-0">
                                        <Sparkles className="w-3 h-3 mr-1.5" /> Pro
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 border-none shrink-0">
                                        <Check className="w-3 h-3 mr-1.5" /> Free
                                    </Badge>
                                )}
                            </div>
                            <CardDescription>Taught by {course.partner}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <BarChart2 className="w-4 h-4" />
                                    <span>{course.level}</span>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                            <Button variant="link" className="p-0 h-auto">View Course</Button>
                        </CardFooter>
                    </Card>
                ))}
            </motion.div>

        </motion.div>
      </main>
      <AppFooter />
    </div>
  );
}
