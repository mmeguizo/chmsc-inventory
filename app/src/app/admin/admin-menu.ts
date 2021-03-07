import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'monitor-outline',
    link: '/admin/dashboard',
    home: true
  },
  {
    title: 'Users ',
    icon: 'person-add-outline',
    children: [
      {
        title: 'User List',
        link: '/admin/users',
      },
    ]
  },
  // {
  //   title: 'Users',
  //   icon: 'people-outline',
  //   link: '/admin/users',
  // },
  // {
  //   title: 'Employees ',
  //   icon: 'person-add-outline',
  //   children : [
  //     {
  //       title: 'Employee List',
  //       link: '/admin/employees',
  //     },
  //   ]
  // },
  // {
  //   title : 'Trucks',
  //   icon : 'car-outline',
  //   link : '/admin/trucks'
  // },
  // {
  //   title : 'Inventory',
  //   icon :'briefcase-outline',
  //   children : [
  //     {
  //       title : 'Materials',
  //       link : '/admin/truck-materials'

  //     },
  //     {
  //       title : 'Stocks',
  //       link : '/admin/stock-materials'

  //     },

  //   ]
  // },
  // {
  //  title : 'Request',
  //  icon : 'clipboard-outline',
  // children : [
  //   {
  //     title : 'Request Materials',
  //     link : '/admin/request-materials'
  //   },
  //   {
  //     title : 'Confirmed Requests',
  //     link : '/admin/confirm-Request'
  //   }
  // ]  },
  // {
  //   title: 'Employee Payroll',
  //   icon: 'credit-card-outline',
  //   link: '/admin/payroll',
  // },
  // {
  //   title: 'OT Requets',
  //   icon: 'compass-outline',
  //   link: '/admin/overtime',
  // },
  // {
  //   title: 'Time Tracking',
  //   icon: 'clock-outline',
  //   link: '/admin/time-tracking',
  // },
  //  {
  //   title : 'PaySlip',
  //   icon : 'credit-card-outline',
  //   children  : [
  //     {
  //       title : 'All Payslip',
  //       link : '/admin/my-payslip'
  //     },

  //   ]
  // },
  // {
  //   title: 'General Settings',
  //   icon: 'settings-2-outline',
  //   children  : [
  //     {
  //       title : 'Day/Time Settings',
  //       icon : 'calendar-outline',
  //       link : '/admin/working-days'
  //     },
  //   ]
  // },


];

