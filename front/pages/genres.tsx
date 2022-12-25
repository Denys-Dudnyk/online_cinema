import { GetStaticProps, NextPage } from 'next'

import Collections from '@/screens/collections/Collections'
import { ICollection } from '@/screens/collections/collections.interface'

import { IMovie } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'

import Error404 from './404'

const GenresPage: NextPage<{
	collections: ICollection[]
}> = ({ collections }) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await GenreService.getCollections()

		return {
			props: {
				collections,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default GenresPage
