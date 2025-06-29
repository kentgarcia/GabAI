
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Home,
  BarChart2,
  FileText,
  BookOpen,
  Sparkles,
  Plug,
  Settings,
  User,
  Zap,
} from 'lucide-react';
import { useEffect } from 'react';

export default function WebLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('web-view');
    return () => {
      document.body.classList.remove('web-view');
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader>
                 <h2 className="text-xl font-bold p-2 group-data-[collapsible=icon]:hidden">GabAI</h2>
            </SidebarHeader>
            <SidebarContent>
                 <SidebarGroup>
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href="/web">
                                <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/web'}>
                                    <Home />
                                    <span>Dashboard</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/web/reports">
                                <SidebarMenuButton tooltip="Reports" isActive={pathname === '/web/reports'}>
                                    <BarChart2 />
                                    <span>Reports</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/web/actions">
                                <SidebarMenuButton tooltip="Actions" isActive={pathname.startsWith('/web/actions')}>
                                    <Zap />
                                    <span>Actions</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                             <Link href="/web/actions/invoice">
                                <SidebarMenuButton tooltip="Invoices" isActive={pathname.startsWith('/web/actions/invoice')}>
                                    <FileText />
                                    <span>Invoices</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                             <Link href="/web/learn">
                                <SidebarMenuButton tooltip="Learn" isActive={pathname.startsWith('/web/learn')}>
                                    <BookOpen />
                                    <span>Learn</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/web/gabi">
                            <SidebarMenuButton tooltip="Gabi AI" isActive={pathname.startsWith('/web/gabi')}>
                                <Sparkles />
                                <span>Gabi AI</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Link href="/web/integrations">
                            <SidebarMenuButton tooltip="Integrations" isActive={pathname.startsWith('/web/integrations')}>
                                <Plug />
                                <span>Integrations</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>User &amp; App Controls</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href="/settings">
                                <SidebarMenuButton tooltip="Settings">
                                    <Settings />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                             <Link href="/settings/profile">
                                <SidebarMenuButton tooltip="User Profile">
                                    <User />
                                    <span>User Profile</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        <SidebarInset className="p-4 md:p-8 bg-muted/40 text-foreground overflow-y-auto h-screen">
             {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
