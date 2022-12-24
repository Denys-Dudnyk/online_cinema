import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'

import { RatingService } from '@/services/rating.service'

import { toastError } from '@/utils/toast-error'

import { getMovieUrl } from '@/config/url.config'

export const useRateMovie = (movieId: string, slug: string) => {
	const { push } = useRouter()
	const { user } = useAuth()
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { refetch } = useQuery(
		['rating movies', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess({ data }) {
				setRating(data)
			},
			onError(error) {
				toastError(error, 'Get rating')
			},
			enabled: !!movieId && !!user,
		}
	)

	const { mutateAsync } = useMutation(
		['set rating movie'],
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError: (error) => {
				toastError(error, 'Rate Movie')
			},
			onSuccess() {
				toastr.success('Rate Movie', 'You have successfully rated!')

				setIsSended(true)
				refetch()

				setTimeout(() => {
					setIsSended(false)
				}, 3000)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)

		await mutateAsync({ value: nextValue })
	}

	const handleHover = async (nextValue: number) => {
		setRating(nextValue)
	}

	return {
		isSended,
		rating,
		handleClick,
		handleHover,
	}
}
