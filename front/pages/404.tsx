import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Error.module.scss'

export default function Error404() {
	return (
		<Meta title="Page not found">
			<Heading title="404 - Page not found" className={styles.error} />
		</Meta>
	)
}
