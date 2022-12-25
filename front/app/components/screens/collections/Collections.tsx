import { FC } from 'react'

import { ICollection } from '@/screens/collections/collections.interface'

import Description from '@/ui/heading/Description'
import Heading from '@/ui/heading/Heading'

import { IMovie } from '@/shared/types/movie.types'

import Meta from '@/utils/meta/Meta'

import CollectionItem from './CollectionItem'
import styles from './Collections.module.scss'

const title = 'Discovery'
const description = 'In this section you will find all genres on our website'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((c) => (
					<CollectionItem key={c._id} collection={c} />
				))}
			</section>
		</Meta>
	)
}
export default Collections
