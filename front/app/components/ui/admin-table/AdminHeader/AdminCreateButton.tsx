import { FC } from 'react'

import Button from '@/ui/form-elements/Button'

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>
}
export default AdminCreateButton
