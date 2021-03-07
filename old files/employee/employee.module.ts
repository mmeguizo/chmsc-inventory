import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NbActionsModule,
	NbLayoutModule,
	NbMenuModule,
	NbSearchModule,
	NbSidebarModule,
	NbUserModule,
	NbContextMenuModule,
	NbButtonModule,
	NbSelectModule,
	NbIconModule,
	NbThemeModule,
	NbCardModule,
	NbBadgeModule,
	NbTabsetModule,
	NbTooltipModule,
	NbWindowModule,
	NbCheckboxModule,
	NbDialogModule,
	NbInputModule,
	NbPopoverModule,
	NbCalendarModule,
	NbTreeGridModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';

// import { HrRoutingModule } from './employee-routing.module';
// import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { OvertimeComponent } from './overtime/overtime.component';
import { EditOvertimeComponent } from './modals/edit-overtime/edit-overtime.component';
import { AddOvertimeComponent } from './modals/add-overtime/add-overtime.component';
import { MyPayslipComponent } from './my-payslip/my-payslip.component';
import { PayslipComponent } from './modals/payslip/payslip.component';
import { PrintPayslipComponent } from './modals/print-payslip/print-payslip.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TimeLogsComponent } from './modals/time-logs/time-logs.component';
import { EmployeeRoutingModule } from './employee-routing.module';

const NB_MODULES = [
	NbLayoutModule,
	NbMenuModule,
	NbUserModule,
	NbActionsModule,
	NbSearchModule,
	NbSidebarModule,
	NbContextMenuModule,
	NbButtonModule,
	NbSelectModule,
	NbIconModule,
	NbThemeModule,
	NbCardModule,
	NbBadgeModule,
	NbTabsetModule,
	NbTooltipModule,
	NbWindowModule,
	NbCheckboxModule,
	NbDialogModule,
	NbInputModule,
	NbPopoverModule,
	NbCalendarModule,
	NbTreeGridModule,
];

@NgModule({
	imports: [CommonModule, EmployeeRoutingModule, ThemeModule, NbMenuModule.forRoot(), NbActionsModule, BsDropdownModule.forRoot(), SharedModule, ...NB_MODULES],
	declarations: [
		EmployeeComponent,
		DashboardComponent,
		OvertimeComponent,
		EditOvertimeComponent,
		AddOvertimeComponent,
		MyPayslipComponent,
		PayslipComponent,
		PrintPayslipComponent,
		TimeTrackingComponent,
		TimeSheetComponent,
		TimeLogsComponent,
	],

	entryComponents: [EmployeeComponent, DashboardComponent, EditOvertimeComponent, AddOvertimeComponent, PayslipComponent, PrintPayslipComponent, TimeLogsComponent],
})
export class EmployeeModule {}
