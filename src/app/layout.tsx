import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFonts from 'next/font/local';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
const headingFont = localFonts({
  src: '../fonts/BebasNeue.ttf',
  variable: '--font-head',
});
const montserrat = localFonts({
  src: '../fonts/Montserrat.ttf',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Colhive',
  description: 'Project Management Solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-montserrat antialiased',
          inter.variable,
          headingFont.variable,
          montserrat.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
