import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrComponent } from './hr.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
import { CreatePayrollComponent } from './modals/create-payroll/create-payroll.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { PayrollComponent } from './payroll/payroll.component';
import { MyPayslipComponent } from './my-payslip/my-payslip.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { ViewEmployeeProfileComponent } from './employees/view-employee-profile/view-employee-profile.component';
import { EmploymentInformationComponent } from './employees/employment-information/employment-information.component';

const routes: Routes = [
	{
		path: '',
		component: HrComponent,
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
				path: 'employees',
				component: EmployeesComponent,
			},
			{
				path: 'payroll',
				component: EmployeePayrollComponent,
			},
			{
				path: 'payroll/:id',
				component: PayrollComponent,
			},
			{
				path: 'time-tracking',
				component: TimeTrackingComponent,
			},
			{
				path: 'contributions',
				component: ContributionsComponent,
			},
			{
				path: 'employeeProfile/:id',
				component: EmployeeProfileComponent,
			},
			{
				path: 'viewEmployeeProfile/:id',
				component: ViewEmployeeProfileComponent,
			},
			{
				path: 'employmentInformation/:id',
				component: EmploymentInformationComponent,
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
				path: 'overtime',
				component: OvertimeComponent,
			},
			{
				path: 'working-days',
				component: WorkingDaysComponent,
			},
		],
	},
	{ path: '**', redirectTo: 'dashboard' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HrRoutingModule {}
