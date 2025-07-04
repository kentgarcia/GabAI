
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, ListFilter, Clock, BarChart2 } from 'lucide-react';
import Image from 'next/image';

const allCourses = [
    { slug: 'bir-basics', title: 'BIR Basics for Freelancers', image: "https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg", category: "Finance & Tax", level: "Beginner", duration: "1.5 hours", access: "Free", hint: "tax document" },
    { slug: 'advanced-bookkeeping', title: 'Advanced Bookkeeping', image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg", category: "Finance & Tax", level: "Intermediate", duration: "3 hours", access: "Pro", hint: "calculator charts" },
    { slug: 'social-media-marketing', title: 'Social Media Marketing 101', image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg", category: "Marketing", level: "Beginner", duration: "2 hours", access: "Free", hint: "social media" },
    { slug: 'dti-registration', title: 'DTI & Business Registration', image: "https://images.pexels.com/photos/161470/edersee-reservoir-water-댐-161470.jpeg", category: "Legal", level: "Beginner", duration: "45 mins", access: "Free", hint: "government building" },
    { slug: 'inventory-management', title: 'Advanced Inventory Management', image: "https://images.pexels.com/photos/1906800/pexels-photo-1906800.jpeg", category: "Business Ops", level: "Intermediate", duration: "1 hour", access: "Pro", hint: "warehouse boxes" },
    { slug: 'pnl-deep-dive', title: 'Understanding Your P&L', image: "https://images.pexels.com/photos/7567561/pexels-photo-7567561.jpeg", category: "Finance & Tax", level: "Beginner", duration: "30 mins", access: "Free", hint: "financial report" },
];

const filters = {
    category: ["Finance & Tax", "Marketing", "Business Ops", "Legal"],
    level: ["Beginner", "Intermediate", "Advanced"],
    access: ["Free", "Pro"],
};

export default function CourseCatalogPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold flex items-center gap-2"><ListFilter className="w-5 h-5"/> Filters</h2>
                    <Button variant="link" className="p-0 h-auto text-sm">Clear all</Button>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold">Category</h3>
                    {filters.category.map(cat => (
                         <div key={cat} className="flex items-center space-x-2">
                             <Checkbox id={cat.toLowerCase().replace(/ /g, '-')} />
                             <Label htmlFor={cat.toLowerCase().replace(/ /g, '-')} className="font-normal">{cat}</Label>
                         </div>
                    ))}
                </div>
                 <div className="space-y-4">
                    <h3 className="font-semibold">Skill Level</h3>
                    {filters.level.map(level => (
                         <div key={level} className="flex items-center space-x-2">
                             <Checkbox id={level.toLowerCase()} />
                             <Label htmlFor={level.toLowerCase()} className="font-normal">{level}</Label>
                         </div>
                    ))}
                </div>
                 <div className="space-y-4">
                    <h3 className="font-semibold">Access</h3>
                    {filters.access.map(acc => (
                         <div key={acc} className="flex items-center space-x-2">
                             <Checkbox id={acc.toLowerCase()} />
                             <Label htmlFor={acc.toLowerCase()} className="font-normal">{acc}</Label>
                         </div>
                    ))}
                </div>
            </aside>
            <main className="md:col-span-3">
                 <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-10 h-12 text-base" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {allCourses.map(course => (
                        <Link href={`/web/learn/course/${course.slug}`} key={course.slug}>
                            <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                                <CardHeader className="p-0">
                                    <Image src={course.image} width={300} height={180} alt={course.title} className="w-full h-auto object-cover" data-ai-hint={course.hint}/>
                                </CardHeader>
                                <CardContent className="p-4 flex-grow flex flex-col">
                                    <Badge variant="secondary" className="mb-2 self-start">{course.category}</Badge>
                                    <h3 className="font-bold flex-grow">{course.title}</h3>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1"><BarChart2 className="w-3 h-3"/> {course.level}</div>
                                    <div className="flex items-center gap-1"><Clock className="w-3 h-3"/> {course.duration}</div>
                                    {course.access === 'Pro' ? 
                                        <Badge className="bg-primary/20 text-primary">✨ Pro</Badge> : 
                                        <Badge variant="outline" className="text-emerald-600 border-emerald-500">Free</Badge>}
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
