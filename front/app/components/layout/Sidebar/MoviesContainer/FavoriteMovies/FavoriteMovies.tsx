import { FC } from 'react'

import styles from './FavoriteMovies.module.scss'
import NotAuthFavorites from './NotAuthFavorites'

const FavoriteMovies: FC = () => {
	return <NotAuthFavorites />
}
export default FavoriteMovies
