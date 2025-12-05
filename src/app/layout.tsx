import type { Metadata } from 'next';

import { MainLayout } from '@/components/section';

import './globals.scss';

export const metadata: Metadata = {
    title: 'WIZARD SHOP App',
    description: 'WIZARD SHOP App',
    icons: {
        icon: [{ url: '/favicon/logo.png' }],
        apple: '/favicon/logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    );
}
