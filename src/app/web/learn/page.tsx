
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, BookOpen, Search, Clock, BarChart2 } from 'lucide-react';
import Image from 'next/image';

const learningPaths = [
    { title: "The Freelancer's Roadmap", progress: 75, completed: 2, total: 4 },
    { title: "Seller Success Path", progress: 25, completed: 1, total: 4 },
];

const recommendedCourses = [
    { title: "BIR Basics for Freelancers", image: "https://placehold.co/600x400.png", category: "Finance", hint: "tax document"},
    { title: "Advanced Bookkeeping", image: "https://placehold.co/600x400.png", category: "Finance", hint: "calculator charts" },
    { title: "Social Media Marketing 101", image: "https://placehold.co/600x400.png", category: "Marketing", hint: "social media" },
];

const achievements = [
    { title: "First 10 Transactions" },
    { title: "Bookkeeping Beginner" },
    { title: "Receipt Rockstar" },
];

export default function WebLearnHub() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back to the Learn Hub, Juan!</h1>
                    <p className="text-muted-foreground">Your journey to financial mastery continues here.</p>
                </div>
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for courses or topics..." className="pl-10" />
                </div>
            </header>

            <Card className="w-full bg-primary/10 border-primary/20">
                <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                    <Image src="https://placehold.co/600x400.png" width={200} height={120} alt="Course" className="rounded-lg object-cover" data-ai-hint="studying online" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-primary">CONTINUE LEARNING</p>
                        <h2 className="text-2xl font-bold mt-1">Understanding Your P&L Statement</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Next up: Lesson 3 - Reading the Bottom Line</span>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <Progress value={60} className="w-full max-w-sm" />
                            <span className="font-semibold text-sm">60%</span>
                        </div>
                    </div>
                    <Button asChild size="lg" className="self-center md:self-end">
                        <Link href="/web/learn/lesson/sample-lesson">Resume Lesson</Link>
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                     <section>
                        <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent>
                                {recommendedCourses.map((course, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                        <Link href="/web/learn/course/sample-course">
                                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <CardHeader className="p-0">
                                                    <Image src={course.image} width={300} height={180} alt={course.title} className="w-full h-auto object-cover" data-ai-hint={course.hint}/>
                                                </CardHeader>
                                                <CardContent className="p-4">
                                                    <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                                                    <h3 className="font-bold truncate">{course.title}</h3>
                                                     <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                                        <div className="flex items-center gap-1"><BarChart2 className="w-3 h-3"/> Beginner</div>
                                                        <div className="flex items-center gap-1"><Clock className="w-3 h-3"/> 1.5 hours</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden sm:flex" />
                            <CarouselNext className="hidden sm:flex" />
                        </Carousel>
                    </section>
                </div>
                <div className="space-y-6">
                     <section>
                        <h2 className="text-2xl font-bold mb-4">My Learning Paths</h2>
                        <div className="space-y-4">
                             {learningPaths.map(path => (
                                <Card key={path.title} className="hover:border-primary transition-colors">
                                    <CardContent className="p-4">
                                        <p className="font-bold">{path.title}</p>
                                        <Progress value={path.progress} className="my-2 h-2" />
                                        <p className="text-sm text-muted-foreground">{path.completed} of {path.total} modules completed.</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                     <section>
                        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                         <Card>
                            <CardContent className="p-4 flex flex-wrap gap-4">
                               {achievements.map(ach => (
                                   <div key={ach.title} className="flex flex-col items-center text-center gap-2">
                                     <div className="p-3 bg-yellow-400/20 rounded-full border-2 border-yellow-500">
                                        <Award className="w-8 h-8 text-yellow-500"/>
                                     </div>
                                      <p className="text-xs font-semibold w-20">{ach.title}</p>
                                   </div>
                               ))}
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
