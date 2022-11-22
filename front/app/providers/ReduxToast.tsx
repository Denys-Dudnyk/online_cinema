import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

import styles from './ReduxToast.module.scss'

const ReduxToast: FC = () => {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			transitionOut="fadeOut"
		/>
	)
}
export default ReduxToast
