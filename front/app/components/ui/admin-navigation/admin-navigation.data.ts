import { FaTheaterMasks } from 'react-icons/fa'

import { getAdminHomeUrl, getAdminUrl } from './../../../config/url.config'
import { INavItem } from './admin-navigation.interface'

export const navItems: INavItem[] = [
	{
		title: 'Statistics',
		icon: 'MdLeaderboard',
		link: getAdminHomeUrl(),
	},
	{
		title: 'Users',
		icon: 'MdSupervisedUserCircle',
		link: getAdminUrl('users'),
	},
	{
		title: 'Movies',
		icon: 'MdLocalMovies',
		link: getAdminUrl('movies'),
	},
	{
		title: 'Actors',
		icon: 'MdPeople',
		link: getAdminUrl('actors'),
	},
	{
		title: 'Genres',
		icon: 'MdTheaterComedy',
		link: getAdminUrl('genres'),
	},
]
