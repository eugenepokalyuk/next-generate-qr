import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { Toaster } from 'sonner';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Toaster
                richColors
                toastOptions={{
                    classNames: {
                        toast: '!bg-[#27272a] !border-[#27272a]',
                    },
                }}
            />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;