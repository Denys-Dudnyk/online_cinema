import { Injectable, NotFoundException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateMovieDto } from './update-movie.dto'
import { MovieModel } from './movie.model'
import { Types } from 'mongoose'
import { TelegramService } from 'src/telegram/telegram.service'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>,
		private readonly telegramService: TelegramService
	) {}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}

		return this.movieModel
			.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('genres actors')
			.exec()
	}

	async bySlug(slug: string) {
		const doc = await this.movieModel
			.findOne({ slug })
			.populate('genres actors')
			.exec()
		if (!doc) throw new NotFoundException('Movie not found')
		return doc
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.movieModel.find({ actors: actorId }).exec()
		if (!docs) throw new NotFoundException('Movies not found')
		return docs
	}

	async byGenres(
		genreIds: Types.ObjectId[]
	): Promise<DocumentType<MovieModel>[]> {
		return this.movieModel
			.find({ genres: { $in: genreIds } })
			.sort({
				countOpened: -1,
			})
			.exec()
	}

	async getMostPopular() {
		return await this.movieModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate('genres')
			.exec()
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.movieModel
			.findOneAndUpdate(
				{ slug },
				{
					$inc: {
						countOpened: 1,
					},
				},
				{
					new: true,
				}
			)
			.exec()

		if (!updateDoc) throw new NotFoundException('Movie not found')

		return updateDoc
	}

	async updateRating(id: Types.ObjectId, newRating: number) {
		return this.movieModel
			.findByIdAndUpdate(
				id,
				{
					rating: newRating,
				},
				{
					new: true,
				}
			)
			.exec()
	}

	/* Admin Place */

	async byId(_id: string) {
		const doc = await this.movieModel.findById(_id)

		if (!doc) throw new NotFoundException('Movie not found')

		return doc
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			bigPoster: '',
			poster: '',
			title: '',
			slug: '',
			videoUrl: '',
			genres: [],
			actors: [],
		}
		const doc = await this.movieModel.create(defaultValue)
		return doc._id
	}

	async update(_id: string, dto: UpdateMovieDto) {
		/*Telegram notification  */
		// if (!dto.isSendTelegram) {
		//
		// 	dto.isSendTelegram = 'true'
		// }
		// await this.sendNotifications(dto)

		const updateDoc = await this.movieModel
			.findByIdAndUpdate(_id, dto, {
				new: true,
			})
			.exec()

		if (!updateDoc) throw new NotFoundException('Movie not found')

		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.movieModel.findByIdAndDelete(id).exec()

		if (!deleteDoc) throw new NotFoundException('Movie not found')

		return deleteDoc
	}

	/* async sendNotifications(dto: UpdateMovieDto) {
		// if (process.env.NODE_ENV !== 'development')
		await this.telegramService.sendPhoto(dto.poster)
		// await this.telegramService.sendPhoto(
		// 	'https://terrigen-cdn-dev.marvel.com/content/prod/1x/spider-mannowayhome_lob_crd_03.jpg'
		// )
		// +`${dto.description}\n\n`
		const msg = `<b>${dto.title}</b>\n\n`

		await this.telegramService.sendMessage(msg, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							url: 'https://www.netflix.com/sk/',
							text: '🍿 Go to watch',
						},
					],
				],
			},
		})
	} */
}
