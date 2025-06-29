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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GabAI" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="relative z-10 mx-auto flex min-h-screen w-full sm:max-w-sm flex-col sm:border-x border-border bg-background sm:shadow-2xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 -left-40 w-96 h-96 bg-accent/40 rounded-full filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-40 w-96 h-96 bg-primary/40 rounded-full filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 left-20 w-96 h-96 bg-accent/40 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
