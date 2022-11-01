import { JwtModuleOptions } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

export const getJWTConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET'),
})
