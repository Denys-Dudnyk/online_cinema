import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors()
	// useContainer(app.select(AppModule), { fallbackOnErrors: true })
	await app.listen(4200)
}
bootstrap()
