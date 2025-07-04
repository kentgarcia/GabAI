
'use client';

import React, { useState } from 'react';
import {
    User, Building, CreditCard, Receipt, Bell, Users, Lock, Upload, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const settingsCategories = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'business', label: 'Business Details', icon: Building },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'invoice', label: 'Invoice Settings', icon: Receipt },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Users & Permissions', icon: Users, isPro: true },
    { id: 'security', label: 'Security', icon: Lock },
];

const SettingsSidebar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (id: string) => void }) => (
    <aside className="w-64 shrink-0">
        <nav className="flex flex-col gap-1">
            {settingsCategories.map(cat => (
                <Button
                    key={cat.id}
                    variant="ghost"
                    onClick={() => setActiveSection(cat.id)}
                    className={cn(
                        "justify-start gap-3 px-3",
                        activeSection === cat.id && "bg-muted font-bold"
                    )}
                >
                    <cat.icon className="w-5 h-5" />
                    <span>{cat.label}</span>
                    {cat.isPro && <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary">Pro</Badge>}
                </Button>
            ))}
        </nav>
    </aside>
);

const SectionCard = ({ title, description, children, className }: { title: string, description?: string, children: React.ReactNode, className?: string }) => (
    <Card className={cn("bg-background/40 backdrop-blur-lg border-border/10 rounded-xl", className)}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const ProfileSection = () => {
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    return (
        <div className="space-y-6">
            <SectionCard title="Personal Details">
                <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://avatar.iran.liara.run/public/25" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                             <Button variant="outline"><Upload className="mr-2" /> Upload New Picture</Button>
                             <Button variant="ghost" className="text-muted-foreground">Remove</Button>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Juan" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="dela Cruz" />
                        </div>
                     </div>
                </div>
                <div className="flex justify-end mt-6">
                     <Button>Save Changes</Button>
                </div>
            </SectionCard>
            <SectionCard title="Account & Login">
                <div className="space-y-6">
                     <div className="space-y-1.5">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex items-center gap-4">
                             <Input id="email" type="email" defaultValue="juan.delacruz@email.com" disabled className="flex-grow" />
                             <Button variant="link" className="p-0 h-auto">Change Email</Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label>Password</Label>
                        {!showPasswordFields && <Button variant="outline" onClick={() => setShowPasswordFields(true)}>Change Password</Button>}
                        {showPasswordFields && (
                            <div className="p-4 border rounded-lg space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                 <div className="space-y-1.5">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                                <div className="flex justify-end gap-2">
                                     <Button variant="ghost" onClick={() => setShowPasswordFields(false)}>Cancel</Button>
                                     <Button>Update Password</Button>
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="space-y-2">
                        <Label>Two-Factor Authentication (2FA)</Label>
                        <div className="flex items-center gap-4 p-3 border rounded-lg">
                            <p className="text-sm text-muted-foreground flex-grow">Status: <span className="font-semibold text-foreground">Disabled</span></p>
                            <Button variant="outline">Enable 2FA</Button>
                        </div>
                    </div>
                </div>
            </SectionCard>
            <SectionCard title="Account Actions" className="border-destructive/50">
                <div className="space-y-6">
                     <div>
                        <h4 className="font-semibold">Export All My Data</h4>
                        <p className="text-sm text-muted-foreground mb-2">Request a complete export of your financial data (transactions, invoices, etc.) in a machine-readable format.</p>
                        <Button variant="outline">Request Data Export</Button>
                    </div>
                    <div>
                        <h4 className="font-semibold text-destructive">Delete Account</h4>
                        <p className="text-sm text-muted-foreground mb-2">This action is permanent and cannot be undone. All your financial data will be erased from GabAI.</p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete My Account</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="py-2">
                                     <Label htmlFor="passwordConfirm" className="text-destructive">To confirm, please type your password</Label>
                                     <Input id="passwordConfirm" type="password" className="mt-1 border-destructive focus-visible:ring-destructive" />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Delete Account</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </SectionCard>
        </div>
    );
};

const BusinessDetailsSection = () => (
     <div className="space-y-6">
        <SectionCard title="Business Details" description="This information appears on your official documents like invoices and receipts.">
            <div className="space-y-4">
                 <div className="space-y-1.5">
                    <Label>Business Logo</Label>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                            <Building className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <Button variant="outline"><Upload className="mr-2" /> Upload Logo</Button>
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" placeholder="e.g., Juan's Graphic Design Services" />
                </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="tin">TIN (Taxpayer ID)</Label>
                    <Input id="tin" placeholder="e.g., 123-456-789-000" />
                </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="address">Registered Address</Label>
                    <Input id="address" placeholder="e.g., 123 Main St, Quezon City, 1101" />
                </div>
            </div>
             <div className="flex justify-end mt-6">
                 <Button>Save Business Details</Button>
            </div>
        </SectionCard>
    </div>
);

const PaymentMethodsSection = () => (
    <div className="space-y-6">
        <SectionCard title="Manage Subscription Payment">
             <Card className="mb-6">
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base">Current Plan</CardTitle>
                        <CardDescription>You are on the <span className="font-bold text-primary">GabAI Pro</span> plan.</CardDescription>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                </CardHeader>
             </Card>
             <h3 className="text-lg font-semibold">Payment Methods</h3>
             <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <CreditCard className="w-8 h-8"/>
                        <div>
                            <p className="font-semibold">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </CardContent>
             </Card>
             <Button variant="outline" className="mt-2">Add New Card</Button>
        </SectionCard>
    </div>
);

const InvoiceSettingsSection = () => (
     <div className="space-y-6">
        <SectionCard title="Invoice & Receipt Customization">
            <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <Label htmlFor="invoicePrefix">Invoice # Prefix</Label>
                        <Input id="invoicePrefix" defaultValue="INV-" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="receiptPrefix">Receipt # Prefix</Label>
                        <Input id="receiptPrefix" defaultValue="OR-" />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="defaultNotes">Default Notes</Label>
                    <Textarea id="defaultNotes" placeholder="e.g., Thank you for your business!" />
                 </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="defaultTerms">Default Terms</Label>
                    <Textarea id="defaultTerms" placeholder="e.g., Payment due within 15 days." />
                 </div>
            </div>
             <div className="flex justify-end mt-6">
                 <Button>Save Invoice Settings</Button>
            </div>
        </SectionCard>
    </div>
);

const NotificationSection = () => (
    <div className="space-y-6">
        <SectionCard title="Notification Preferences">
            <div className="space-y-4 divide-y">
                <div className="flex items-center justify-between pt-4 first:pt-0">
                    <Label htmlFor="notif-paid" className="pr-4">An invoice gets paid</Label>
                    <Switch id="notif-paid" defaultChecked />
                </div>
                 <div className="flex items-center justify-between pt-4">
                    <Label htmlFor="notif-overdue" className="pr-4">An invoice becomes overdue</Label>
                    <Switch id="notif-overdue" defaultChecked />
                </div>
                 <div className="flex items-center justify-between pt-4">
                    <Label htmlFor="notif-summary" className="pr-4">Weekly Summary Report</Label>
                    <Switch id="notif-summary" defaultChecked />
                </div>
                 <div className="flex items-center justify-between pt-4">
                    <Label htmlFor="notif-alerts" className="pr-4">Proactive Financial Alerts from Gabi</Label>
                    <Switch id="notif-alerts" defaultChecked />
                </div>
                 <div className="flex items-center justify-between pt-4">
                    <Label htmlFor="notif-updates" className="pr-4">New features & announcements</Label>
                    <Switch id="notif-updates" />
                </div>
            </div>
        </SectionCard>
    </div>
);

const UsersSection = () => (
    <div className="space-y-6">
        <SectionCard title="Users & Permissions">
             <div className="flex justify-end mb-4">
                 <Button>Invite User</Button>
             </div>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">Juan dela Cruz</div>
                            <div className="text-sm text-muted-foreground">juan.delacruz@email.com</div>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>
                            <div className="font-medium">Maria Accountant</div>
                            <div className="text-sm text-muted-foreground">maria.a@email.com</div>
                        </TableCell>
                        <TableCell>Bookkeeper</TableCell>
                    </TableRow>
                </TableBody>
             </Table>
        </SectionCard>
    </div>
);

const SecuritySection = () => {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    
    return (
        <div className="space-y-6">
            <SectionCard title="Change Password">
                 <div className="space-y-4">
                        {!showPasswordFields && <Button variant="outline" onClick={() => setShowPasswordFields(true)}>Change Password</Button>}
                        {showPasswordFields && (
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="flex justify-end gap-2">
                                     <Button variant="ghost" onClick={() => setShowPasswordFields(false)}>Cancel</Button>
                                     <Button>Update Password</Button>
                                </div>
                            </div>
                        )}
                    </div>
            </SectionCard>
            <SectionCard title="Two-Factor Authentication (2FA)">
                <div className="flex items-center gap-4">
                    <p className="text-muted-foreground flex-grow">Add an extra layer of security to your account.</p>
                    <Button variant="outline">Enable 2FA</Button>
                </div>
            </SectionCard>
        </div>
    );
}

export default function WebSettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');

    const renderContent = () => {
        switch (activeSection) {
            case 'profile': return <ProfileSection />;
            case 'business': return <BusinessDetailsSection />;
            case 'payments': return <PaymentMethodsSection />;
            case 'invoice': return <InvoiceSettingsSection />;
            case 'notifications': return <NotificationSection />;
            case 'users': return <UsersSection />;
            case 'security': return <SecuritySection />;
            default: return <ProfileSection />;
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex-1">
                {renderContent()}
            </main>
        </div>
    );
}
