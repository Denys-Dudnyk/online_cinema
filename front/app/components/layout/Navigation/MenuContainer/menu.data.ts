import { IMenu } from './menu.interface'

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			title: 'Home',
			link: '/',
		},
		{
			icon: 'MdExplore',
			title: 'Discovery',
			link: '/genres',
		},
		{
			icon: 'MdRefresh',
			title: 'Fresh movies',
			link: '/fresh',
		},
		{
			icon: 'MdLocalFireDepartment',
			title: 'Trending now',
			link: '/trending',
		},
	],
}

export const userMenu: IMenu = {
	title: 'General',
	items: [],
}
