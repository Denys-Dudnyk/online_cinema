import { FC } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import Menu from '../Menu'

import { usePopularGenres } from './usePopularGenres'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={4} className="h-7 mt-6" />
		</div>
	) : (
		<Menu menu={{ title: 'Popular Genres', items: data || [] }} />
	)
}
export default GenreMenu
