import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'GabAI',
  description: 'Let\'s grow your hustle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="relative z-10 mx-auto flex min-h-screen max-w-sm flex-col border-x border-border bg-background shadow-2xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 -left-36 w-72 h-72 bg-accent/20 rounded-full filter blur-2xl animate-blob"></div>
            <div className="absolute top-0 -right-36 w-72 h-72 bg-primary/20 rounded-full filter blur-2xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-10 w-72 h-72 bg-secondary/20 rounded-full filter blur-2xl animate-blob animation-delay-4000"></div>
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
