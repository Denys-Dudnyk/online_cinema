import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ActorDto } from './actor.dto'
import { ActorModel } from './actor.model'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
	) {}

	async bySlug(slug: string) {
		const doc = await this.ActorModel.findOne({ slug }).exec()
		if (!doc) throw new NotFoundException('Actor not found')
		return doc
	}

	async getAll(searchTerm?: string) {
		let options = {}

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
				],
			}

		//Aggregating

		return this.ActorModel.aggregate()
			.match(options)
			.lookup({
				from: 'Movie',
				foreignField: 'actors',
				localField: '_id',
				as: 'movies',
			})
			.addFields({
				countMovies: {
					$size: '$movies',
				},
			})
			.project({ __v: 0, updatedAt: 0, movies: 0 })
			.sort({
				createdAt: -1,
			})
			.exec()
	}

	/* Admin Place */

	async byId(_id: string) {
		const actor = await this.ActorModel.findById(_id)

		if (!actor) throw new NotFoundException('Actor not found')

		return actor
	}

	async create() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: '',
		}
		const actor = await this.ActorModel.create(defaultValue)
		return actor._id
	}

	async update(_id: string, dto: ActorDto) {
		const updateDoc = await this.ActorModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()

		if (!updateDoc) throw new NotFoundException('Actor not found')

		return updateDoc
	}

	async delete(id: string) {
		const deleteDoc = await this.ActorModel.findByIdAndDelete(id).exec()

		if (!deleteDoc) throw new NotFoundException('Actor not found')

		return deleteDoc
	}
}
