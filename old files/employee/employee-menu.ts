import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Dashboard',
		icon: 'shopping-cart-outline',
		link: '/employee/dashboard',
		home: true,
	},
	{
		title: 'OT Requets',
		icon: 'compass-outline',
		link: '/employee/overtime',
	},
	{
		title: 'Time Tracking',
		icon: 'clock-outline',
		link: '/employee/time-tracking',
	},
	{
		title: 'My Pay',
		icon: 'credit-card-outline',
		children: [
			{
				title: 'My Payslip',
				link: '/employee/my-payslip',
			},
		],
	},
];
