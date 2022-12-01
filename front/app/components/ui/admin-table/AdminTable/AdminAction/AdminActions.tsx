import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminAction: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className={styles.actions}>
			<button onClick={() => push(editUrl)}>
				<MaterialIcon name="MdEdit" />
			</button>
			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}
export default AdminAction
