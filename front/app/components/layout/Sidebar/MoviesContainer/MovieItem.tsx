import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useRateMovie } from '@/components/screens/single-movie/RateMovie/useRateMovie'

import MaterialIcon from '@/ui/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import { getGenresListEach } from '@/utils/movie/getGenresList'

import { getGenreUrl, getMovieUrl } from '@/config/url.config'

import styles from './MovieList.module.scss'

interface IRateMovie {
	movieId: string
	slug: string
	movie: IMovie
}

const MovieItem: FC<IRateMovie> = ({ movie, movieId, slug }) => {
	const { rating } = useRateMovie(movieId, slug)
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<a>
					<Image
						src={movie.poster}
						width={65}
						height={97}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link key={genre._id} href={getGenreUrl(genre.slug)}>
								<a>{getGenresListEach(idx, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>

				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}
export default MovieItem
