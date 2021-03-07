import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users/users.component';


// import { UsersComponent } from './users/users.component';
// import { StockMaterialsComponent } from './stock-materials/stock-materials.component';
// import { TruckMaterialsComponent } from './truck-materials/truck-materials.component';
// import { TrucksComponent } from './trucks/trucks.component';
// import { RequestStockComponent } from './request-stock/request-stock.component';
// // import { EmployeesComponent } from './employees/employees/employees.component';
// // import { EmployeesComponent } from './employees/employees/employees.component';
// import { ConfirmRequestComponent } from './confirm-request/confirm-request.component';
// import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
// import { PayrollComponent } from './payroll/payroll.component';
// import { TimeTrackingComponent } from './time-tracking/time-tracking.component';
// import { ContributionsComponent } from './contributions/contributions.component';
// import { EmployeeProfileComponent } from './employees/employee-profile/employee-profile.component';
// import { ViewEmployeeProfileComponent } from './employees/view-employee-profile/view-employee-profile.component';
// import { EmploymentInformationComponent } from './employees/employment-information/employment-information.component';
// import { EmployeesComponent } from './employees/employees.component';
// import { TimeSheetComponent } from './time-sheet/time-sheet.component';
// import { MyPayslipComponent } from './my-payslip/my-payslip.component';
// import { PayslipPayrollComponent } from './my-payslip/payrolls/payroll.component';
// import { WorkingDaysComponent } from './working-days/working-days.component';
// import { OvertimeComponent } from './overtime/overtime.component';
// import { ViewMaintenanceComponent } from './view-maintenance/view-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
        path: 'users',
        component: UsersComponent,
      },

    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
