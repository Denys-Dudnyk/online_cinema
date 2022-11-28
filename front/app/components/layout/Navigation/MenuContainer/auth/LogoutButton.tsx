import { FC, MouseEvent } from 'react'

import { useActions } from '@/hooks/useActions'

import styles from '../Menu.module.scss'

import MaterialIcon from './../../../../ui/MaterialIcon'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
	}
	return (
		<li>
			<a onClick={handleLogout} className={styles.hover}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	)
}

export default LogoutButton
