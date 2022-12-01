import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import Statistics from './Statistics/Statistics'

const Admin: FC = () => {
	return (
		<Meta title="Admin Panel">
			<AdminNavigation />
			<Heading title="Some Statistics" />

			<Statistics />
		</Meta>
	)
}
export default Admin
