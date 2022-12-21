import { FC } from 'react'

import SearchField from '@/ui/search-field/SearchField'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm, clearSearch } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} onClick={clearSearch} />}
		</div>
	)
}

export default Search
