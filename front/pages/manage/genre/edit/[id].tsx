import GenreEdit from '@/screens/admin/edit-genre/GenreEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}
GenreEditPage.isOnlyForAdmin = true

export default GenreEditPage
