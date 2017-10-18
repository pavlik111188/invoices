import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {CustomerComponent} from './customer/customer.component';
import {ProductComponent} from './product/product.component';

const routes: Routes = [
    {
        path: '',
        component: InvoiceComponent,
        pathMatch: 'full'
    },
    {
        path: 'invoices',
        component: InvoiceComponent,
        pathMatch: 'full'
    },
    {
        path: 'customers',
        component: CustomerComponent,
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductComponent,
        pathMatch: 'full'
    },
    // otherwise redirect to home
    // { path: '**', redirectTo: '' },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}