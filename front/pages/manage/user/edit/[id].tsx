import UserEdit from '@/screens/admin/edit-user/UserEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />
}
UserEditPage.isOnlyForAdmin = true

export default UserEditPage
