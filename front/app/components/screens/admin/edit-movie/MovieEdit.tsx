import dynamic from 'next/dynamic'
import { FC } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import formStyles from '@/ui/form-elements/admin-form.module.scss'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import SlugField from '../../../ui/form-elements/SlugField/SlugField'

import { IMovieEditInput } from './movie-edit.interface'
import { useMovieEdit } from './useMovieEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit Movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder="Title"
								error={errors.title}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('title')))
								}}
							/>

							{/* <Controller
							control={control}
							name="photo"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
					//photo upload
							)}
							rules={{
									required: 
										'Photo is required!'
							}}
						/> */}
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
export default GenreEdit
