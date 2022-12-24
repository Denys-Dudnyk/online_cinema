import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import styles from './Favorites.module.scss'
import FavoritesItem from './FavoritesItem'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites()

	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />

			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoritesItem key={movie._id} movie={movie} />
					))
				)}
			</section>
		</Meta>
	)
}
export default Favorites
