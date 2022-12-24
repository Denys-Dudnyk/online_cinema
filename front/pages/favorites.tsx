import { GetStaticProps, NextPage } from 'next'

import Favorites from '@/screens/favorites/Favorites'

import Catalog from '@/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

const FavoritesPage: NextPage = () => {
	return <Favorites />
}

export default FavoritesPage
