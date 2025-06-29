
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Award, Check, Lock, PlayCircle } from 'lucide-react';
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

const learningPath = [
    { title: 'The Foundation', status: 'certified', icon: Award },
    { title: 'Building Consistency', status: 'in-progress', icon: PlayCircle },
    { title: 'Formalizing & Optimizing', status: 'locked', icon: Lock },
    { title: 'Scaling Smart', status: 'locked', icon: Lock },
];

const recommendations = [
    { title: 'Finding & Cutting Business Costs', image: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg' },
    { title: 'Why Registering with BIR is Smart', image: 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg' },
    { title: 'Advanced Inventory Management', image: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg' },
];

const categories = ['Finance & Tax', 'Marketing', 'Business Ops', 'Legal'];

export default function LearnPage() {
  return (
    <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
      <main className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <AppHeader userName="Juan dela Cruz" />
          </motion.div>
          
          <motion.div variants={itemVariants}>
              <h1 className="text-3xl font-bold tracking-tight">Learn Hub</h1>
          </motion.div>

          {/* Widget 1: Continue Learning */}
          <motion.section variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-3">Pick Up Where You Left Off</h2>
              <Card className="rounded-2xl border bg-primary/10 backdrop-blur-lg border-primary/20">
                <CardHeader className="flex flex-row items-start gap-4 p-4">
                    <div className="w-20 h-20 bg-primary rounded-lg flex-shrink-0">
                         <Image src="https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg" width={80} height={80} alt="Course" className="rounded-lg object-cover" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">BIR Basics for Freelancers</CardTitle>
                        <p className="text-sm text-primary/80 mt-1">Next: How to Issue Official Receipts</p>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pb-2">
                    <Progress value={50} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 text-right">50% Complete</p>
                </CardContent>
                <CardFooter className="p-4 pt-2">
                     <Button asChild className="w-full bg-black text-white rounded-full">
                       <Link href="/learn/lesson/bir-basics-lesson-3?course=bir-basics-for-freelancers">Continue Learning</Link>
                     </Button>
                </CardFooter>
              </Card>
          </motion.section>

          {/* Widget 2: My Learning Path */}
           <motion.section variants={itemVariants} className="space-y-3">
              <h2 className="text-lg font-semibold">Your Growth Journey</h2>
              <div className="space-y-2">
                {learningPath.map((item, index) => (
                    <Link href="/growth-path" key={index}>
                        <Card className="rounded-xl border bg-background/40 backdrop-blur-lg border-border/10 transition-colors hover:bg-muted/40">
                            <CardContent className="p-3 flex items-center gap-4">
                                <div className={cn(
                                    "p-2 rounded-lg",
                                    item.status === 'certified' ? 'bg-emerald-500' : 'bg-black'
                                )}>
                                    <item.icon className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.title}</p>
                                </div>
                                {item.status === 'in-progress' && <Badge variant="default" className="bg-primary/80">In Progress</Badge>}
                                {item.status === 'certified' && <Badge variant="outline" className="text-emerald-600 border-emerald-500">Certified</Badge>}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
              </div>
          </motion.section>

          {/* Widget 3: Recommended For You */}
           <motion.section variants={itemVariants} className="space-y-3">
              <h2 className="text-lg font-semibold">Gabi Recommends...</h2>
               <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-2">
                    {recommendations.map((rec, index) => (
                        <CarouselItem key={index} className="pl-2 basis-3/4">
                            <Card className="rounded-xl border bg-background/40 backdrop-blur-lg border-border/10 overflow-hidden">
                                <Image src={rec.image} width={300} height={160} alt={rec.title} className="aspect-video object-cover"/>
                                <CardContent className="p-3">
                                    <p className="font-semibold truncate">{rec.title}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                </Carousel>
          </motion.section>

          {/* Widget 4: Browse by Category */}
           <motion.section variants={itemVariants} className="space-y-3">
                <h2 className="text-lg font-semibold">Browse by Category</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <Button key={cat} asChild variant="outline" className="rounded-full bg-background/40 backdrop-blur-lg border-border/10">
                           <Link href={`/learn/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                                {cat}
                            </Link>
                        </Button>
                    ))}
                </div>
            </motion.section>

        </motion.div>
      </main>
      <AppFooter />
    </div>
  );
}
