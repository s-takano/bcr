import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import { Providers } from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BEAUTY CELLAR BY HOLLYWOOD | Luxury Salon",
  description: "Elevating Your Beauty Experience",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`${cormorant.className} ${montserrat.className}`}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
