import { error } from 'console'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from '@/config/url.config'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['Genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'Genre list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['Delete genre'],
		(genreId: string) => GenreService.delete(genreId),
		{
			onError: (error) => {
				toastError(error, 'Delete genre')
			},
			onSuccess: () => {
				toastr.success('Delete genre', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		['Create genre'],
		() => GenreService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create genre')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('Create genre', 'create was successful')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
