import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';


import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { ProductsComponent } from './component/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './services/auth.service';
import { AdminModule } from './admin.module';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart-service';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { OrderService } from './services/order.service';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UnAuthorizedComponent } from './component/un-authorized/un-authorized.component';







  const routes : Routes=[
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},
    { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
  ]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    NotFoundComponent,
    UnAuthorizedComponent
    
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    AdminModule
    
    
  ],
  providers: [AuthService, CategoryService,ProductService,ShoppingCartService,OrderService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
