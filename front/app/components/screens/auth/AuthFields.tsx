import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/form-elements/Field'

import { validEmail } from '@/shared/regex'

interface IAuthField {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthField> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email',
					},
				})}
				placeholder="E-mail"
				// @ts-ignore
				error={errors.email}
			/>

			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length must be at least 6 symbols',
								},
						  }
						: {}
				)}
				placeholder="Password"
				type="password"
				// @ts-ignore
				error={errors.password}
			/>
		</>
	)
}
export default AuthFields
