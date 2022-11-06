import { IsEmail, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsEmail()
	email: string

	password?: string

	isAdmin?: boolean
}
