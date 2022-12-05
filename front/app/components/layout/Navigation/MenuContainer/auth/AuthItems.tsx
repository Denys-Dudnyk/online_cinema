import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { getAdminHomeUrl } from '@/config/url.config'

import MenuItem from './../MenuItem'
import LogoutButton from './LogoutButton'

const AuthItems: FC = () => {
	const { user } = useAuth()
	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>

					{user?.isAdmin && (
						<MenuItem
							item={{
								icon: 'MdAdminPanelSettings',
								link: getAdminHomeUrl(),
								title: 'Admin Panel',
							}}
						/>
					)}
					<LogoutButton />
				</>
			) : (
				<MenuItem
					item={{
						icon: 'MdLogin',
						link: '/auth',
						title: 'Login',
					}}
				/>
			)}
		</>
	)
}
export default AuthItems
