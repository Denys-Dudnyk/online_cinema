import { prop, Ref } from '@typegoose/typegoose'

import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserModel } from 'src/user/user.model'
import { MovieModel } from './../movie/movie.model'

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
	@prop({ ref: () => UserModel })
	userId: Ref<UserModel>

	@prop({ ref: () => MovieModel })
	movieId: Ref<MovieModel>

	@prop()
	value: number
}
