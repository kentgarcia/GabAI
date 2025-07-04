
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Building,
  Percent,
  Bell,
  Sparkles,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  Plug
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AppFooter } from '@/components/layout/AppFooter';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

const SettingsItem = ({ icon: Icon, title, subtitle, href }: { icon: React.ElementType, title: string, subtitle?: string, href: string }) => (
    <Link href={href}>
        <motion.div variants={itemVariants} className="bg-background/30 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-muted/40">
            <div className="p-2 bg-black rounded-lg">
                <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold">{title}</p>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </motion.div>
    </Link>
);

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, you'd clear auth tokens here.
        // For this demo, we'll just navigate to the auth page.
        router.push('/auth');
    }

    return (
        <div className="flex flex-col h-screen bg-transparent text-foreground font-sans">
            <main className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar pb-28">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <motion.header variants={itemVariants}>
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    </motion.header>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-lg font-bold px-2">Profile & Account</h2>
                        <Link href="/settings/profile">
                             <div className="bg-background/30 p-4 rounded-2xl flex items-center gap-4 transition-colors hover:bg-muted/40">
                                <User className="w-10 h-10 text-accent p-2 bg-black rounded-full" />
                                <div className="flex-grow">
                                    <p className="font-semibold">Juan "Marco" dela Cruz</p>
                                    <p className="text-sm text-muted-foreground">marco.d.cruz@email.com</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-lg font-bold px-2">Business</h2>
                        <div className="space-y-2">
                             <SettingsItem icon={Building} title="Business Details" subtitle="Manage your business name, TIN, and address" href="/settings/business" />
                             <SettingsItem icon={Percent} title="Tax Settings" subtitle="Choose your preferred tax estimation method" href="/settings/tax" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-lg font-bold px-2">App Preferences</h2>
                         <SettingsItem icon={Bell} title="Notifications" subtitle="Manage alerts for tax reminders and summaries" href="/settings/notifications" />
                         <SettingsItem icon={Plug} title="Integrations & Connections" subtitle="Manage your synced platforms and e-wallets" href="/settings/integrations" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-lg font-bold px-2">Subscription</h2>
                         <SettingsItem icon={Sparkles} title="GabAI Pro" subtitle="Unlock powerful features like bank sync" href="/settings/subscription" />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-lg font-bold px-2">Support & Legal</h2>
                         <div className="space-y-2">
                             <SettingsItem icon={HelpCircle} title="Help Center / FAQ" href="/settings/help" />
                             <SettingsItem icon={FileText} title="Terms of Service" href="/settings/terms" />
                             <SettingsItem icon={Shield} title="Privacy Policy" href="/privacy-policy" />
                        </div>
                    </motion.div>

                     <motion.div variants={itemVariants} className="pt-4">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full h-12 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:text-red-500">
                                    <LogOut className="mr-2" />
                                    Log Out
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-background/80 backdrop-blur-md border">
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will be returned to the sign-in screen.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">Log Out</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </motion.div>

                </motion.div>
            </main>
            <AppFooter />
        </div>
    );
}
