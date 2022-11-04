import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString({
    message:
      'Refresh token is invalid or invalid format	provided in the refresh token field in the form!',
  })
  refreshToken: string
}
