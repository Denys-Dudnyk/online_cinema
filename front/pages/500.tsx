import Meta from '@/utils/meta/Meta'

import styles from './Error.module.scss'

export default function Error500() {
	return (
		<Meta title="Page not found">
			<div className={styles.block}>
				<h1>500 - Server-side error occurred</h1>
			</div>
		</Meta>
	)
}
