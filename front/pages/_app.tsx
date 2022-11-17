import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MainProvider>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
