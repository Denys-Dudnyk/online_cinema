import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useFavorites } from '@/screens/favorites/useFavorites'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import styles from './FavoriteButton.module.scss'
import LikeImage from './heart-animation.png'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isClicked, setIsClicked] = useState(false)

	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		if (!favoriteMovies) return

		const isHaveMovie = favoriteMovies.some((f) => f._id === movieId)
		if (isClicked !== isHaveMovie) setIsClicked(isHaveMovie)
	}, [favoriteMovies, isClicked, movieId])

	const { mutateAsync } = useMutation(
		['update favorites'],
		() => UserService.updateFavorites(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorites')
			},
			onSuccess() {
				setIsClicked(!isClicked)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isClicked,
			})}
			style={{ backgroundImage: `url(${LikeImage.src})` }}
		/>
	)
}
export default FavoriteButton
