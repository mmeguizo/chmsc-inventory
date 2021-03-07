import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
	{
		title: 'Dashboard',
		icon: 'shopping-cart-outline',
		link: '/hr/dashboard',
		home: true,
	},
	{
		title: 'Employees ',
		icon: 'person-add-outline',
		children: [
			{
				title: 'Employee List',
				link: '/hr/employees',
			},
		],
	},
	{
		title: 'Employee Payroll',
		icon: 'credit-card-outline',
		link: '/hr/payroll',
	},
	{
		title: 'OT Requets',
		icon: 'compass-outline',
		link: '/hr/overtime',
	},
	{
		title: 'Time Tracking',
		icon: 'clock-outline',
		link: '/hr/time-tracking',
	},
	{
		title: 'My Pay',
		icon: 'credit-card-outline',
		children: [
			{
				title: 'My Payslip',
				link: '/hr/my-payslip',
			},
		],
	},
	{
		title: 'General Settings',
		icon: 'settings-2-outline',
		children: [
			{
				title: 'Day/Time Settings',
				icon: 'calendar-outline',
				link: '/hr/working-days',
			},
		],
	},
];
