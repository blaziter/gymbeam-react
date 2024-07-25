import type { Metadata } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Inter } from 'next/font/google';

import { Footer, Header } from './_components';
import './globals.css';

import { Layout } from '@components';

import { useNextTranslation } from '@lib/hooks';
import { cn } from '@lib/utils';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useNextTranslation();

    return {
        title: t('metadata.title'),
        description: t('metadata.description'),
    };
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { lang } = useTranslation();

    return (
        <html lang={lang}>
            <body
                className={cn(
                    'min-h-screen bg-background antialiased',
                    inter.className
                )}
            >
                <Header />
                <Layout>{children}</Layout>
                <Footer />
            </body>
        </html>
    );
}
