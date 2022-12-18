import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/screens/single-movie/SingleMovie'

import Catalog from '@/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

import { IGalleryItem } from './../../app/components/ui/gallery/gallery.interface'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		)

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}))

		return {
			props: {
				movie,
				similarMovies,
			},
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await MovieService.getAll()
		const paths = actors.map((a) => ({
			params: { slug: a.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export default MoviePage
