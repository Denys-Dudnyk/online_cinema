import { FC } from 'react'

import FavoriteMovies from './FavoriteMovies/FavoriteMovies'
import PopularMovies from './PopularMovies'

const MoviesContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	)
}
export default MoviesContainer
