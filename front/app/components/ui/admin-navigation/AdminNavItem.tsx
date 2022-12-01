import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './AdminNavigation.module.scss'
import { INavItem } from './admin-navigation.interface'

const AdminNavItem: FC<{ item: INavItem }> = ({
	item: { link, title, icon },
}) => {
	const { asPath } = useRouter()

	return (
		<li>
			<Link href={link}>
				<a
					className={cn({
						[styles.active]: asPath === link,
					})}
				>
					<MaterialIcon name={icon} />
					<span>{title}</span>
				</a>
			</Link>
		</li>
	)
}
export default AdminNavItem
