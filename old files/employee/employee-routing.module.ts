import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { MyPayslipComponent } from './my-payslip/my-payslip.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';

const routes: Routes = [
	{
		path: '',
		component: EmployeeComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'overtime',
				component: OvertimeComponent,
			},
			{
				path: 'my-payslip',
				component: MyPayslipComponent,
			},
			{
				path: 'timeSheet/:id',
				component: TimeSheetComponent,
			},
			{
				path: 'time-tracking',
				component: TimeTrackingComponent,
			},
		],
	},
	{ path: '**', redirectTo: 'dashboard' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
