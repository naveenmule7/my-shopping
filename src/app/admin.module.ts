import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminCategoriesComponent } from "./component/admin-categories/admin-categories.component";
import { AdminProductsComponent } from "./component/admin-products/admin-products.component";
import { NgxPaginationModule } from "ngx-pagination";
import { AdminOrdersComponent } from "./component/admin-orders/admin-orders.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";



const routes: Routes = [
    { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard]  },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] }
];

@NgModule({
    declarations: [
        AdminCategoriesComponent,
        AdminProductsComponent,
        AdminOrdersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgxPaginationModule
    ],
    providers: []
})

export class AdminModule { }