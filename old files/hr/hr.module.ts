import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbActionsModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSidebarModule, NbUserModule, NbContextMenuModule, NbButtonModule, NbSelectModule, NbIconModule, NbThemeModule, NbCardModule, NbBadgeModule, NbTabsetModule, NbTooltipModule, NbWindowModule, NbCheckboxModule, NbDialogModule, NbInputModule, NbPopoverModule, NbCalendarModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { HrComponent } from './hr.component';
import { SharedModule } from '../shared/shared.module';

import { HrRoutingModule } from './hr-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
import { CreatePayrollComponent } from './modals/create-payroll/create-payroll.component';
import { AddPayrollComponent } from './modals/add-payroll/add-payroll.component';
import { AddOvertimeComponent } from './modals/add-overtime/add-overtime.component';
import { EditOvertimeComponent } from './modals/edit-overtime/edit-overtime.component';
import { CreatePayslipComponent } from './modals/create-payslip/create-payslip.component';
import { DeductionsComponent } from './modals/deductions/deductions.component';
import { AddDeductionsComponent } from './modals/add-deductions/add-deductions.component';
import { TotalHoursComponent } from './modals/total-hours/total-hours.component';
import { CustomDeductionComponent } from './modals/create-payslip/custom-deduction/custom-deduction.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { AddAttendanceToEmployeeComponent } from './modals/add-attendance-to-employee/add-attendance-to-employee.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { NewSSSTableComponent } from './modals/new-ssstable/new-ssstable.component';
import { NewPITableComponent } from './modals/new-pitable/new-pitable.component';
import { NewPhilHealthTableComponent } from './modals/new-phil-health-table/new-phil-health-table.component';
import { NewTaxTableComponent } from './modals/new-taxtable/new-taxtable.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { PayrollComponent } from './payroll/payroll.component';
import { AddAllowanceComponent } from './modals/add-allowance/add-allowance.component';
import { PrintPayslipComponent } from './modals/print-payslip/print-payslip.component';
import { EditPayslipComponent } from './modals/edit-payslip/edit-payslip.component';
import { PayslipComponent } from './modals/payslip/payslip.component';
import { MyPayslipComponent } from './my-payslip/my-payslip.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { UpdateTImeComponent } from './modals/update-time/update-time.component';
import { TimeLogsComponent } from './modals/time-logs/time-logs.component';
import { NewPayrollComponent } from './modals/new-payroll/new-payroll.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { AddWorkingDaysComponent } from './modals/add-working-days/add-working-days.component';
import { EditWorkingDaysComponent } from './modals/edit-working-days/edit-working-days.component';
import { EmployeesComponent } from './employees/employees.component';
import { AgentProfileComponent } from './employees/agent-profile/agent-profile.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { EmploymentInformationComponent } from './employees/employment-information/employment-information.component';
import { ViewAgentProfileComponent } from './employees/view-agent-profile/view-agent-profile.component';
import { ViewEmployeeProfileComponent } from './employees/view-employee-profile/view-employee-profile.component';
import { AddEmployeesComponent } from './modals/add-employees/add-employees.component';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { EditPositionComponent } from './modals/edit-position/edit-position.component';
import { EducationalBackgroundComponent } from './modals/educational-background/educational-background.component';
import { NewPositionComponent } from './modals/new-position/new-position.component';
import { UpdateEmployeeComponent } from './modals/update-employee/update-employee.component';
import { UpdateEmployeeDocImageComponent } from './modals/update-employee-doc-image/update-employee-doc-image.component';
import { UpdateEmployeeFieldComponent } from './modals/update-employee-field/update-employee-field.component';
import { UpdateProfileComponent } from './modals/update-profile/update-profile.component';

const NB_MODULES = [NbLayoutModule, NbMenuModule, NbUserModule, NbActionsModule, NbSearchModule, NbSidebarModule, NbContextMenuModule, NbButtonModule, NbSelectModule, NbIconModule, NbThemeModule, NbCardModule, NbBadgeModule, NbTabsetModule, NbTooltipModule, NbWindowModule, NbCheckboxModule, NbDialogModule, NbInputModule, NbPopoverModule, NbCalendarModule, NbTreeGridModule];

@NgModule({
	imports: [CommonModule, HrRoutingModule, ThemeModule, NbMenuModule.forRoot(), NbActionsModule, NgbModule, BsDropdownModule.forRoot(), SharedModule, ...NB_MODULES],
	declarations: [
		HrComponent,
		DashboardComponent,
		EmployeePayrollComponent,
		PayrollComponent,
		ContributionsComponent,
		AddPayrollComponent,
		AddOvertimeComponent,
		EditOvertimeComponent,
		CreatePayrollComponent,
		CreatePayslipComponent,
		DeductionsComponent,
		AddDeductionsComponent,
		TotalHoursComponent,
		CustomDeductionComponent,
		TimeTrackingComponent,
		AddAttendanceToEmployeeComponent,
		NewTaxTableComponent,
		NewSSSTableComponent,
		NewPhilHealthTableComponent,
		NewPITableComponent,
		EditPayslipComponent,
		PrintPayslipComponent,
		AddAllowanceComponent,
		PayslipComponent,
		MyPayslipComponent,
		TimeSheetComponent,
		TimeLogsComponent,
		UpdateTImeComponent,
		NewPayrollComponent,
		OvertimeComponent,
		WorkingDaysComponent,
		AddWorkingDaysComponent,
		EditWorkingDaysComponent,
		EmployeesComponent,
		AgentProfileComponent,
		EmployeeProfileComponent,
		EmploymentInformationComponent,
		ViewAgentProfileComponent,
		ViewEmployeeProfileComponent,
		AddEmployeesComponent,
		AddUserComponent,
		EditPositionComponent,
		NewPositionComponent,
		EducationalBackgroundComponent,
		UpdateEmployeeComponent,
		UpdateEmployeeDocImageComponent,
		UpdateEmployeeFieldComponent,
		UpdateProfileComponent,
	],

	entryComponents: [
		HrComponent,
		DashboardComponent,
		EmployeePayrollComponent,
		PayrollComponent,
		ContributionsComponent,
		AddPayrollComponent,
		AddOvertimeComponent,
		EditOvertimeComponent,
		CreatePayrollComponent,
		CreatePayslipComponent,
		DeductionsComponent,
		AddDeductionsComponent,
		TotalHoursComponent,
		CustomDeductionComponent,
		AddAttendanceToEmployeeComponent,
		NewTaxTableComponent,
		NewSSSTableComponent,
		NewPhilHealthTableComponent,
		NewPITableComponent,
		EditPayslipComponent,
		PrintPayslipComponent,
		AddAllowanceComponent,
		PayslipComponent,
		TimeSheetComponent,
		TimeLogsComponent,
		UpdateTImeComponent,
		NewPayrollComponent,
		AddWorkingDaysComponent,
		EditWorkingDaysComponent,
		AddEmployeesComponent,
		AddUserComponent,
		EditPositionComponent,
		NewPositionComponent,
		EducationalBackgroundComponent,
		UpdateEmployeeComponent,
		UpdateEmployeeDocImageComponent,
		UpdateEmployeeFieldComponent,
		UpdateProfileComponent,
	],
})
export class HrModule {}
