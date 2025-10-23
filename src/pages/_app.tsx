import Toast from '@/components/Toast'
import { ToastContextProvider } from '@/contexts/ToastContext'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const theme = createTheme({
    palette: {
        primary: deepOrange,
        text: { primary: '#000000cc' },
        background: {
            default: '#eeeeee'
        }
    }
})

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>東大音感 AR予約システム</title>
                <meta
                    name="description"
                    content="ARの予約状況の確認や予約手続きができます。"
                />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ToastContextProvider>
                        <Toast />
                        <Component {...pageProps} />
                    </ToastContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
