import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import MainProvider from 'providers/MainProvider'
import Snowfall from 'react-snowfall'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import '@/assets/styles/globals.scss'
import '@/assets/styles/react-select.scss'

const isServer = () => typeof window === `undefined`
type TypeAppProps = AppProps & TypeComponentAuthFields

const DynamicComponentWithNoSSR = dynamic(() => import('@/ui/snow/Snowfalls'), {
	ssr: false,
})

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<>
				<DynamicComponentWithNoSSR />
				<Component {...pageProps} />
			</>
		</MainProvider>
	)
}

export default MyApp
