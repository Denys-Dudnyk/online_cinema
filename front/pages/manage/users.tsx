import UsersList from '@/components/screens/admin/users/UserList'

import { NextPageAuth } from '@/shared/types/auth.types'

const UserListPage: NextPageAuth = () => {
	return <UsersList />
}
UserListPage.isOnlyForAdmin = true

export default UserListPage
