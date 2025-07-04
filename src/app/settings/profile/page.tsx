
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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

export default function ProfileSettingsPage() {
    const { toast } = useToast();
    const [details, setDetails] = useState({
        firstName: 'Juan',
        lastName: 'dela Cruz',
        nickname: 'Marco',
    });
    const [email] = useState('marco.d.cruz@email.com');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "✅ Profile Updated!",
                description: "Your personal details have been saved.",
            });
        }, 1500);
    };

    return (
        <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col flex-grow"
            >
                <motion.header variants={itemVariants} className="flex items-center gap-2 mb-8">
                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 -ml-2">
                        <Link href="/settings">
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">My Profile</h1>
                </motion.header>

                <div className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6 space-y-6">
                    <motion.div variants={itemVariants} className="flex items-center gap-4 p-4 rounded-2xl bg-background/40">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="https://avatar.iran.liara.run/public/25" alt="User Avatar"/>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                             <Button variant="outline" size="sm" className="bg-background">
                                <Upload className="mr-2" />
                                Upload New
                            </Button>
                             <Button variant="ghost" size="sm" className="text-destructive">
                                Remove
                            </Button>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <h2 className="text-lg font-bold mb-3">Personal Details</h2>
                         <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" value={details.firstName} onChange={(e) => setDetails({...details, firstName: e.target.value})} className="bg-background/30" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" value={details.lastName} onChange={(e) => setDetails({...details, lastName: e.target.value})} className="bg-background/30" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nickname">Nickname (Optional)</Label>
                                <Input id="nickname" value={details.nickname} onChange={(e) => setDetails({...details, nickname: e.target.value})} className="bg-background/30" />
                            </div>
                        </div>
                    </motion.div>
                    
                    <Separator />

                    <motion.div variants={itemVariants}>
                        <h2 className="text-lg font-bold mb-3">Account & Login</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex items-center gap-2">
                                     <Input id="email" type="email" value={email} disabled className="bg-background/30 flex-grow" />
                                     <Button variant="link" className="shrink-0 p-1 h-auto" onClick={() => toast({title: "Coming Soon!", description: "This feature is under development."})}>Change</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                 <Button variant="outline" className="w-full bg-background/30" onClick={() => toast({title: "Coming Soon!", description: "This feature is under development."})}>
                                    <Lock className="mr-2" /> Change Password
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                </div>

                <motion.div variants={itemVariants} className="pt-8">
                    <Button onClick={handleSave} disabled={isSaving} className="w-full bg-black text-primary-foreground rounded-full h-14 text-lg font-semibold hover:bg-black/90">
                        {isSaving ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                                Saving...
                            </>
                        ) : (
                             <>
                                <Check className="mr-2" />
                                Save Profile
                            </>
                        )}
                    </Button>
                </motion.div>
            </motion.div>
        </main>
    );
}
