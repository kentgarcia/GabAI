
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  BarChart2,
  Landmark,
  Mailbox,
  CircleHelp,
  SlidersHorizontal,
  Settings,
  Wallet,
  PieChart as PieChartIcon,
  Users,
  CreditCard,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MessageSquare,
  Bell,
  ArrowUp,
  ArrowDown,
  FileCheck2,
  Clock,
  ClipboardSignature,
  ClipboardCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

const statCards = [
    { icon: Wallet, title: 'Your bank balance', value: '$143,624' },
    { icon: PieChartIcon, title: 'Uncategorized transactions', value: '12' },
    { icon: Users, title: 'Employees working today', value: '7' },
    { icon: CreditCard, title: 'This week\'s card spending', value: '$3,287.49' },
];

const revenueData = [
  { name: 'Feb 14', lastWeek: 15500, thisWeek: 16000 },
  { name: 'Feb 15', lastWeek: 12000, thisWeek: 12790 },
  { name: 'Feb 16', lastWeek: 14000, thisWeek: 12000 },
  { name: 'Feb 17', lastWeek: 16500, thisWeek: 18000 },
  { name: 'Feb 18', lastWeek: 17000, thisWeek: 18500 },
  { name: 'Feb 19', lastWeek: 19000, thisWeek: 19500 },
  { name: 'Feb 20', lastWeek: 18000, thisWeek: 21000 },
];

const clientCards = [
    { title: 'New clients', value: '54', change: '+18.7%', changeType: 'positive' as const },
    { title: 'Invoices overdue', value: '6', change: '+2.7%', changeType: 'negative' as const },
];

const recentEmails = [
    { name: 'Hannah Morgan', subject: 'Meeting scheduled', time: '1:24 PM', avatar: 'https://avatar.iran.liara.run/public/1' },
    { name: 'Megan Clark', subject: 'Update on marketing campaign', time: '12:32 PM', avatar: 'https://avatar.iran.liara.run/public/2' },
    { name: 'Brandon Williams', subject: 'Designly 2.0 is about to launch', time: 'Yesterday at 8:57 PM', avatar: 'https://avatar.iran.liara.run/public/3' },
];

const toDoList = [
    { icon: FileCheck2, title: 'Run payroll', time: 'Mar 4 at 6:00 pm' },
    { icon: Clock, title: 'Review time off request', time: 'Mar 7 at 6:00 pm' },
    { icon: ClipboardSignature, title: 'Sign board resolution', time: 'Mar 12 at 6:00 pm' },
    { icon: ClipboardCheck, title: 'Finish onboarding Tony', time: 'Mar 12 at 6:00 pm' },
];

export default function WebAppPage() {
  useEffect(() => {
    document.body.classList.add('web-view');
    return () => {
      document.body.classList.remove('web-view');
    };
  }, []);

  const formatCurrencyForChart = (value: number) => `$${(value / 1000).toFixed(0)}K`;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black text-white p-2 rounded-md shadow-lg">
                <p className="font-bold text-sm">{`Feb 15: $16,259.78`}</p>
                <p className="font-bold text-sm">{`Feb 8: $12,790.34`}</p>
            </div>
        );
    }
    return null;
  };


  return (
    <SidebarProvider defaultOpen={false}>
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                 <h2 className="text-xl font-bold p-2 group-data-[collapsible=icon]:hidden">GabAI</h2>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Home" isActive>
                            <Home />
                            <span>Home</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Analytics">
                            <BarChart2 />
                            <span>Analytics</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Banking">
                            <Landmark />
                            <span>Banking</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Messages">
                            <Mailbox />
                            <span>Messages</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Help">
                            <CircleHelp />
                            <span>Help Center</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Configuration">
                            <SlidersHorizontal />
                            <span>Configuration</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                            <Settings />
                             <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset className="p-8 bg-transparent text-foreground">
             <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Good morning, James!</h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><ChevronLeft /></Button>
                        <Button variant="ghost" size="icon"><ChevronRight /></Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><Calendar /></Button>
                        <Button variant="ghost" size="icon"><MessageSquare /></Button>
                        <Button variant="ghost" size="icon"><Bell /></Button>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://avatar.iran.liara.run/public/25" />
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <main className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {statCards.map((card, index) => (
                             <Card key={index} className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <card.icon className="w-6 h-6 text-muted-foreground" />
                                    <Button variant="ghost" size="icon" className="w-6 h-6"><MoreVertical className="w-4 h-4" /></Button>
                                </CardHeader>
                                <CardContent>
                                    <h3 className="text-2xl font-bold">{card.value}</h3>
                                    <p className="text-xs text-muted-foreground">{card.title}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Revenue</CardTitle>
                                <p className="text-sm text-muted-foreground">Last 7 days VS prior week</p>
                            </div>
                        </CardHeader>
                         <CardContent className="h-[250px]">
                             <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrencyForChart} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="thisWeek" strokeWidth={2} stroke="hsl(var(--foreground))" dot={false} />
                                    <Line type="monotone" dataKey="lastWeek" strokeWidth={2} stroke="hsl(var(--muted-foreground))" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {clientCards.map((card, index) => (
                             <Card key={index} className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                                <CardContent className="p-6">
                                    <p className="text-sm text-muted-foreground">{card.title}</p>
                                    <div className="flex items-baseline gap-4 mt-2">
                                        <h3 className="text-4xl font-bold">{card.value}</h3>
                                        <Badge variant="outline" className={cn(
                                            card.changeType === 'positive' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'
                                        )}>
                                            {card.changeType === 'positive' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                            {card.change}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                    <Card className="bg-background/40 backdrop-blur-lg border-border/10 rounded-xl">
                        <CardHeader>
                            <CardTitle>Recent emails</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {recentEmails.map((email, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={email.avatar} />
                                            <AvatarFallback>{email.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <p className="font-semibold">{email.name}</p>
                                            <p className="text-sm text-muted-foreground">{email.subject}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{email.time}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </main>

                <aside className="lg:col-span-1 space-y-6">
                    <Card className="bg-black text-white rounded-xl">
                        <CardHeader>
                            <CardTitle>Formation status</CardTitle>
                            <p className="text-sm text-muted-foreground">In progress</p>
                        </CardHeader>
                        <CardContent>
                            <Progress value={60} className="h-2 bg-gray-700" indicatorClassName="bg-white" />
                            <p className="text-sm text-muted-foreground mt-2">Estimated processing: 4-5 business days</p>
                            <Button variant="secondary" className="w-full mt-4 bg-white text-black hover:bg-gray-200">View status</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-black text-white rounded-xl">
                        <CardHeader>
                            <CardTitle>Your To-do List</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {toDoList.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-black text-white rounded-xl">
                        <CardContent className="p-6">
                            <p className="text-sm font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Board meeting</p>
                            <p className="text-sm text-muted-foreground mt-1">Feb 22 at 6:00 PM</p>
                            <p className="mt-2">You have been invited to attend a meeting of the Board Directors.</p>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
