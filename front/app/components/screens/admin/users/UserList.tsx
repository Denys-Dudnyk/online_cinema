import { FC } from 'react'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import AdminTable from './../../../ui/admin-table/AdminTable/AdminTable'
import { useUsers } from './useUsers'

const UsersList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers()

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register']}
				tableItems={data || []}
			/>
		</Meta>
	)
}
export default UsersList
