import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar'

const DynamicComponentWithNoSSR = dynamic(() => import('@/ui/snow/Snowfalls'), {
	ssr: false,
})

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			{/* {' '} */}
			{/* <DynamicComponentWithNoSSR /> */}
			<div className={styles.layout}>
				<Navigation />
				<div className={styles.center}>{children}</div>
				<Sidebar />
			</div>
		</>
	)
}

export default Layout
