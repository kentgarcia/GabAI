import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Image
          src="https://placehold.co/600x1200.png"
          alt="Abstract background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="abstract 3d shapes"
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-sm flex-col border-x border-white/10 shadow-2xl">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
