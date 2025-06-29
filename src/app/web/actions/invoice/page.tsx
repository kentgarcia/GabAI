'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';
import {
    MoreHorizontal, PlusCircle, Search, ThumbsUp, FileClock, FileCheck, AlertCircle, FileWarning
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Mock Data
const kpiData = {
    outstanding: 45000,
    inDraft: 15000,
    paidLast30: 85000,
};

const chartData = [
    { name: 'Jan', outstanding: 30000, paid: 50000 },
    { name: 'Feb', outstanding: 42000, paid: 60000 },
    { name: 'Mar', outstanding: 25000, paid: 75000 },
    { name: 'Apr', outstanding: 55000, paid: 45000 },
    { name: 'May', outstanding: 38000, paid: 88000 },
    { name: 'Jun', outstanding: 45000, paid: 85000 },
];

const allInvoices = [
    { id: 'INV-001', client: 'Innovate Corp.', issueDate: '2024-06-15', dueDate: '2024-07-15', amount: 20000, status: 'Sent' },
    { id: 'INV-002', client: 'Tech Solutions Ltd.', issueDate: '2024-06-12', dueDate: '2024-06-26', amount: 15000, status: 'Paid' },
    { id: 'INV-003', client: 'Creative Minds Co.', issueDate: '2024-06-10', dueDate: '2024-06-17', amount: 5000, status: 'Overdue' },
    { id: 'INV-004', client: 'Global Ventures', issueDate: '2024-06-05', dueDate: '2024-07-05', amount: 25000, status: 'Sent' },
    { id: 'INV-005', client: 'Alpha Services', issueDate: '2024-06-20', dueDate: '2024-07-20', amount: 15000, status: 'Draft' },
];

const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);

const StatusBadge = ({ status }: { status: string }) => {
    const statusMap = {
        Draft: { icon: FileClock, color: 'bg-gray-100 text-gray-800', label: 'Draft' },
        Sent: { icon: ThumbsUp, color: 'bg-blue-100 text-blue-800', label: 'Sent' },
        Paid: { icon: FileCheck, color: 'bg-emerald-100 text-emerald-800', label: 'Paid' },
        Overdue: { icon: FileWarning, color: 'bg-red-100 text-red-800', label: 'Overdue' },
    };
    const { icon: Icon, color, label } = statusMap[status as keyof typeof statusMap] || { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800', label: 'Unknown' };

    return (
        <Badge variant="outline" className={cn('gap-1 border-transparent', color)}>
            <Icon className="h-3 w-3" />
            {label}
        </Badge>
    );
};

export default function InvoicingDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Invoicing</h1>
                <Link href="/web/actions/invoice/new">
                    <Button>
                        <PlusCircle className="mr-2" />
                        Create New Invoice
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(kpiData.outstanding)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Draft</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(kpiData.inDraft)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Paid (Last 30 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(kpiData.paidLast30)}</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding vs. Paid</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[60px] p-0">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                               <Tooltip
                                  cursor={{ fill: 'hsl(var(--muted))' }}
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                              <span className="text-[0.70rem] uppercase text-muted-foreground">Outstanding</span>
                                              <span className="font-bold">{formatCurrency(payload[0].value as number)}</span>
                                            </div>
                                            <div className="flex flex-col">
                                              <span className="text-[0.70rem] uppercase text-muted-foreground">Paid</span>
                                              <span className="font-bold text-emerald-600">{formatCurrency(payload[1].value as number)}</span>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                                <Bar dataKey="outstanding" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="paid" stackId="a" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="p-4">
                    <CardTitle>Invoice List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="all">
                        <div className="flex items-center justify-between px-4 pb-4">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="draft">Drafts</TabsTrigger>
                                <TabsTrigger value="sent">Sent</TabsTrigger>
                                <TabsTrigger value="paid">Paid</TabsTrigger>
                                <TabsTrigger value="overdue" className="text-red-600">Overdue</TabsTrigger>
                            </TabsList>
                             <div className="relative ml-auto flex-1 md:grow-0">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by client or invoice #"
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                                />
                            </div>
                        </div>
                        <TabsContent value="all" className="m-0">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Invoice #</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Issue Date</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allInvoices.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell><StatusBadge status={invoice.status} /></TableCell>
                                            <TableCell className="font-medium">{invoice.id}</TableCell>
                                            <TableCell>{invoice.client}</TableCell>
                                            <TableCell>{invoice.issueDate}</TableCell>
                                            <TableCell>{invoice.dueDate}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                                             <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
