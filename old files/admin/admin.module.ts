import { NgModule } from '@angular/core';
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
	NbDatepickerModule,
	NbAccordionModule,
	// NbAccordionItemBodyComponent,
	// NbAccordionComponent,
	// NbAccordionItemComponent,
	// NbAccordionItemHeaderComponent,
	// NbListModule,
	// NbRouteTabsetModule,
	// NbStepperModule,
} from '@nebular/theme';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './modals/add-user/add-user.component';
import { TruckMaterialsComponent } from './truck-materials/truck-materials.component';
import { StockMaterialsComponent } from './stock-materials/stock-materials.component';
import { AddMaterialComponent } from './modals/add-material/add-material.component';
import { UpdateProfileComponent } from './modals/update-profile/update-profile.component';
import { UpdateMaterialComponent } from './modals/update-material/update-material.component';
import { UpdateMaterialImageComponent } from './modals/update-material-image/update-material-image.component';
import { AddStockComponent } from './modals/add-stock/add-stock.component';
import { UpdateStockComponent } from './modals/update-stock/update-stock.component';
import { TrucksComponent } from './trucks/trucks.component';
import { AddVehicleComponent } from './modals/add-vehicle/add-vehicle.component';
import { UpdatTruckReqComponent } from './modals/updat-truck-req/updat-truck-req.component';
import { UpdateTruckFileComponent } from './modals/update-truck-file/update-truck-file.component';
import { RequestStockComponent } from './request-stock/request-stock.component';
import { AddRequestStockComponent } from './modals/add-request-stock/add-request-stock.component';
import { UpdateRequestStockComponent } from './modals/update-request-stock/update-request-stock.component';
import { UpdateSelectedRequestComponent } from './modals/update-selected-request/update-selected-request.component';
import { UpdateSelectedStockComponent } from './modals/update-selected-stock/update-selected-stock.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ApproveRequestComponent } from './modals/approve-request/approve-request.component';
import { CompleteRequestComponent } from './complete-request/complete-request.component';

import { AddEmployeesComponent } from './modals/add-employees/add-employees.component';
import { EmployeesComponent } from './employees/employees.component';
import { UpdateEmployeeFieldComponent } from './modals/update-employee-field/update-employee-field.component';
import { ConfirmRequestComponent } from './confirm-request/confirm-request.component';
import { AddPositionComponent } from './modals/add-position/add-position.component';
import { UpdatePositionComponent } from './modals/update-position/update-position.component';
import { UpdateEmployeeComponent } from './modals/update-employee/update-employee.component';
import { UpdateEmployeeDocImageComponent } from './modals/update-employee-doc-image/update-employee-doc-image.component';
// import { ViewMaintenanceComponent } from './modals/view-maintenance/view-maintenance.component';
import { UpdateChangeOilComponent } from './modals/update-change-oil/update-change-oil.component';
import { UpdateOrdometerComponent } from './modals/update-ordometer/update-ordometer.component';
import { AddTruckMaintenanceComponent } from './modals/add-truck-maintenance/add-truck-maintenance.component';
import { UpdateUserComponent } from './modals/update-user/update-user.component';
import { UpdateTruckMaintenanceComponent } from './modals/update-truck-maintenance/update-truck-maintenance.component';
import { EmployeeRenewalsComponent } from './modals/employee-renewals/employee-renewals.component';
import { AddNewCategoriesComponent } from './modals/add-new-categories/add-new-categories.component';
import { AddTruckTypeComponent } from './modals/add-truck-type/add-truck-type.component';
import { RenewalCardComponent } from './dashboard/renewal-card/renewal-card.component';
import { ChangeOilComponent } from './dashboard/change-oil/change-oil.component';
import { PartsRequestedComponent } from './dashboard/parts-requested/parts-requested.component';
import { BrokenRequestComponent } from './modals/add-truck-maintenance/broken-request/broken-request.component';
import { BrokenMaterialRequestComponent } from './request-stock/broken-material-request/broken-material-request.component';
import { NormalRequestComponent } from './request-stock/normal-request/normal-request.component';
import { BillingComponent } from './view-maintenance/billing/billing.component';
import { TruckChecklistComponent } from './view-maintenance/truck-checklist/truck-checklist.component';
import { AccomplishmentFormComponent } from './view-maintenance/accomplishment-form/accomplishment-form.component';
import { RoadtestChecklistComponent } from './view-maintenance/roadtest-checklist/roadtest-checklist.component';
import { EducationalBackgroundComponent } from './modals/educational-background/educational-background.component';
import { RenewalsComponent } from './dashboard/renewals/renewals.component';
import { EditPositionComponent } from './modals/edit-position/edit-position.component';
import { NewPositionComponent } from './modals/new-position/new-position.component';
import { ContributionsComponent } from './contributions/contributions.component';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AddAllowanceComponent } from './modals/add-allowance/add-allowance.component';
import { AddAttendanceToEmployeeComponent } from './modals/add-attendance-to-employee/add-attendance-to-employee.component';
import { AddDeductionsComponent } from './modals/add-deductions/add-deductions.component';
import { AddPayrollComponent } from './modals/add-payroll/add-payroll.component';
import { AddOvertimeComponent } from './modals/add-overtime/add-overtime.component';
import { EditOvertimeComponent } from './modals/edit-overtime/edit-overtime.component';
import { CreatePayrollComponent } from './modals/create-payroll/create-payroll.component';
import { CreatePayslipComponent } from './modals/create-payslip/create-payslip.component';
import { DeductionsComponent } from './modals/deductions/deductions.component';
import { EditPayslipComponent } from './modals/edit-payslip/edit-payslip.component';
import { NewPhilHealthTableComponent } from './modals/new-phil-health-table/new-phil-health-table.component';
import { NewPITableComponent } from './modals/new-pitable/new-pitable.component';
import { NewSSSTableComponent } from './modals/new-ssstable/new-ssstable.component';
import { NewTaxTableComponent } from './modals/new-taxtable/new-taxtable.component';
import { PayslipComponent } from './modals/payslip/payslip.component';
import { PrintPayslipComponent } from './modals/print-payslip/print-payslip.component';
import { TotalHoursComponent } from './modals/total-hours/total-hours.component';
import { CustomDeductionComponent } from './modals/create-payslip/custom-deduction/custom-deduction.component';
import { AgentProfileComponent } from './employees/agent-profile/agent-profile.component';
import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
import { EmploymentInformationComponent } from './employees/employment-information/employment-information.component';
import { ViewAgentProfileComponent } from './employees/view-agent-profile/view-agent-profile.component';
import { ViewEmployeeProfileComponent } from './employees/view-employee-profile/view-employee-profile.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { UpdateTImeComponent } from './modals/update-time/update-time.component';
import { TimeLogsComponent } from './modals/time-logs/time-logs.component';
import { MyPayslipComponent } from './my-payslip/my-payslip.component';
import { PayslipPayrollComponent } from './my-payslip/payrolls/payroll.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { AddWorkingDaysComponent } from './modals/add-working-days/add-working-days.component';
import { EditWorkingDaysComponent } from './modals/edit-working-days/edit-working-days.component';
import { NewPayrollComponent } from './modals/new-payroll/new-payroll.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { LogoutComponent } from './modals/logout/logout.component';
import { ViewMaintenanceComponent } from './view-maintenance/view-maintenance.component';
import { MaintenancerepairComponent } from './view-maintenance/maintenancerepair/maintenancerepair.component';

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
	NbAccordionModule,
	// NbAccordionItemBodyComponent,
	// NbAccordionComponent,
	// NbAccordionItemComponent,
	// NbAccordionItemHeaderComponent,
	// NbListModule,
	// NbRouteTabsetModule,
	// NbStepperModule,
];

@NgModule({
	imports: [
		MatTabsModule,
		MatDividerModule,
		MatCardModule,
		AdminRoutingModule,
		ThemeModule,
		NbMenuModule.forRoot(),
		NbActionsModule,
		NbDatepickerModule,
		BsDropdownModule.forRoot(),
		SharedModule,
		NbAccordionModule,
		...NB_MODULES,
	],
	declarations: [
		AdminComponent,
		DashboardComponent,
		UsersComponent,
		AddUserComponent,
		EducationalBackgroundComponent,
		TruckMaterialsComponent,
		StockMaterialsComponent,
		AddMaterialComponent,
		UpdateProfileComponent,
		UpdateMaterialComponent,
		UpdateMaterialImageComponent,
		AddStockComponent,
		UpdateStockComponent,
		TrucksComponent,
		AddVehicleComponent,
		UpdatTruckReqComponent,
		UpdateTruckFileComponent,
		RequestStockComponent,
		AddRequestStockComponent,
		UpdateRequestStockComponent,
		UpdateSelectedRequestComponent,
		UpdateSelectedStockComponent,
		ApproveRequestComponent,
		CompleteRequestComponent,
		AddEmployeesComponent,
		EmployeesComponent,
		UpdateEmployeeFieldComponent,
		ConfirmRequestComponent,
		NewPositionComponent,
		AddPositionComponent,
		UpdatePositionComponent,
		UpdateEmployeeComponent,
		UpdateEmployeeDocImageComponent,
		ViewMaintenanceComponent,
		UpdateChangeOilComponent,
		UpdateOrdometerComponent,
		AddTruckMaintenanceComponent,
		UpdateUserComponent,
		UpdateTruckMaintenanceComponent,
		EmployeeRenewalsComponent,
		AddNewCategoriesComponent,
		AddTruckTypeComponent,
		RenewalCardComponent,
		ChangeOilComponent,
		RenewalsComponent,
		PartsRequestedComponent,
		BrokenRequestComponent,
		BrokenMaterialRequestComponent,
		NormalRequestComponent,
		BillingComponent,
		TruckChecklistComponent,
		AccomplishmentFormComponent,
		RoadtestChecklistComponent,
		EditPositionComponent,
		ContributionsComponent,
		EmployeePayrollComponent,
		TimeTrackingComponent,
		PayrollComponent,
		PayslipPayrollComponent,
		TotalHoursComponent,
		PrintPayslipComponent,
		PayslipComponent,
		NewTaxTableComponent,
		NewSSSTableComponent,
		NewPITableComponent,
		NewPhilHealthTableComponent,
		EditPayslipComponent,
		DeductionsComponent,
		CreatePayslipComponent,
		CreatePayrollComponent,
		AddPayrollComponent,
		AddOvertimeComponent,
		EditOvertimeComponent,
		AddDeductionsComponent,
		AddAttendanceToEmployeeComponent,
		AddAllowanceComponent,
		CustomDeductionComponent,
		AgentProfileComponent,
		EmployeeProfileComponent,
		EmploymentInformationComponent,
		ViewAgentProfileComponent,
		ViewEmployeeProfileComponent,
		TimeSheetComponent,
		TimeLogsComponent,
		UpdateTImeComponent,
		MyPayslipComponent,
		WorkingDaysComponent,
		AddWorkingDaysComponent,
		EditWorkingDaysComponent,
		NewPayrollComponent,
		OvertimeComponent,
		LogoutComponent,
		MaintenancerepairComponent,
		// NbAccordionItemBodyComponent,
		// NbAccordionComponent,
		// NbAccordionItemComponent,
		// NbAccordionItemHeaderComponent,
		// NbListModule,
		// NbRouteTabsetModule,
		// NbStepperModule,
	],
	entryComponents: [
		AddUserComponent,
		TruckMaterialsComponent,
		StockMaterialsComponent,
		AddMaterialComponent,
		UpdateProfileComponent,
		UpdateMaterialComponent,
		UpdateMaterialImageComponent,
		AddStockComponent,
		UpdateStockComponent,
		TrucksComponent,
		AddVehicleComponent,
		UpdatTruckReqComponent,
		RequestStockComponent,
		UpdateTruckFileComponent,
		AddRequestStockComponent,
		UpdateRequestStockComponent,
		UpdateSelectedRequestComponent,
		UpdateSelectedStockComponent,
		ApproveRequestComponent,

		CompleteRequestComponent,
		AddEmployeesComponent,
		EmployeesComponent,
		UpdateEmployeeFieldComponent,
		ConfirmRequestComponent,
		NewPositionComponent,
		AddPositionComponent,
		UpdateEmployeeComponent,
		UpdatePositionComponent,
		UpdateEmployeeDocImageComponent,
		ViewMaintenanceComponent,
		UpdateChangeOilComponent,
		UpdateOrdometerComponent,
		AddTruckMaintenanceComponent,
		UpdateUserComponent,
		UpdateTruckMaintenanceComponent,
		EmployeeRenewalsComponent,
		AddNewCategoriesComponent,
		AddTruckTypeComponent,
		RenewalCardComponent,
		ChangeOilComponent,
		RenewalsComponent,
		PartsRequestedComponent,
		BrokenRequestComponent,
		BrokenMaterialRequestComponent,
		NormalRequestComponent,
		BillingComponent,
		TruckChecklistComponent,
		AccomplishmentFormComponent,
		RoadtestChecklistComponent,
		EditPositionComponent,
		TotalHoursComponent,
		PrintPayslipComponent,
		PayslipComponent,
		NewTaxTableComponent,
		NewSSSTableComponent,
		NewPITableComponent,
		NewPhilHealthTableComponent,
		EditPayslipComponent,
		DeductionsComponent,
		CreatePayslipComponent,
		CreatePayrollComponent,
		AddPayrollComponent,
		AddOvertimeComponent,
		EditOvertimeComponent,
		AddDeductionsComponent,
		AddAttendanceToEmployeeComponent,
		AddAllowanceComponent,
		CustomDeductionComponent,
		TimeLogsComponent,
		UpdateTImeComponent,
		AddWorkingDaysComponent,
		EditWorkingDaysComponent,
		NewPayrollComponent,
		LogoutComponent,
	],
})
export class AdminModule {}
