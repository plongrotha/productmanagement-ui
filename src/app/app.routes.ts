import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { BillingComponent } from './pages/billing/billing.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
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
    path: 'billing',
    component: BillingComponent,
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
