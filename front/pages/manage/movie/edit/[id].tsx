import MovieEdit from '@/components/screens/admin/edit-movie/MovieEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const MovieEditPage: NextPageAuth = () => {
	return <MovieEdit />
}
MovieEditPage.isOnlyForAdmin = true

export default MovieEditPage
