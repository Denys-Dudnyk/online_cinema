import { FC, useLayoutEffect, useRef } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/ui/video-player/AuthPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'

interface IRateMovie {
	movieId: string
	slug: string
}

const RateMovie: FC<IRateMovie> = ({ movieId, slug }) => {
	const { user } = useAuth()

	const { handleClick, isSended, rating, handleHover } = useRateMovie(
		movieId,
		slug
	)

	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie?</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating</div>
					) : (
						<StarRating
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							onStarHover={handleHover}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}
export default RateMovie
