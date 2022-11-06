import {
	PipeTransform,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
	transform(value: string, meta: ArgumentMetadata) {
		if (meta.type === 'param') return value

		if (!Types.ObjectId.isValid(value))
			throw new BadRequestException('Invalid format id')

		return value
	}
}
