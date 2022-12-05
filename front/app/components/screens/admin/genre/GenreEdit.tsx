import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import TextEditor from '@/components/ui/form-elements/TextEditor'
import Heading from '@/components/ui/heading/Heading'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Button from '@/ui/form-elements/Button'
import Field from '@/ui/form-elements/Field'
import formStyles from '@/ui/form-elements/admin-form.module.scss'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import SlugField from './../../../ui/form-elements/SlugField/SlugField'
import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit Genre" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')))
									}}
								/>
							</div>

							<Field
								{...register('icon', {
									required: 'Icon is required',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>

							<Controller
								control={control}
								name="description"
								defaultValue=""
								render={({
									field: { value, onChange },
									formState: { errors },
								}) => {}}
							/>
							<TextEditor />
							<Button>Update</Button>
						</div>
					</>
				)}
			</form>
		</Meta>
	)
}
export default GenreEdit
