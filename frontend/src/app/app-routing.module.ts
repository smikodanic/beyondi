/* MODULES */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng6MiscModule } from './ng/modules/ng6misc';

// https://material.angular.io/components/categories
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

/* COMPONENTS */
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// admin
// import { AdminHeaderComponent } from './pages/admin/_common/header/header.component';
// import { AdminAsideComponent } from './pages/admin/_common/aside/aside.component';
// import { AdminFooterComponent } from './pages/admin/_common/footer/footer.component'
// import { AdminComponent } from './pages/admin/admin.component';

// customer
// import { CustomerHeaderComponent } from './pages/customer/_common/header/header.component';
// import { CustomerAsideComponent } from './pages/customer/_common/aside/aside.component';
// import { CustomerFooterComponent } from './pages/customer/_common/footer/footer.component';
// import { CustomerComponent } from './pages/customer/customer.component';

// dialogs
// import { AdminMatDialogAddedituserComponent } from './pages/admin/_common/mat/dialog/addedituser/addedituser.component';



/* SERVICES */
import { IsLoggedService, HasRoleService, AutologinService } from 'ngboost-auth';
import { HttpReq } from './ng/services/httpReq.service'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AutologinService] },
  // { path: 'admin', component: AdminComponent, canActivate: [IsLoggedService, HasRoleService] },
  // { path: 'customer', component: CustomerComponent, canActivate: [IsLoggedService, HasRoleService] },
  // { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    // HomeComponent,
    LoginComponent,
    // NotfoundComponent,

    // AdminHeaderComponent,
    // AdminAsideComponent,
    // AdminFooterComponent,
    // AdminComponent,

    // dialogs
    // AdminMatDialogAddedituserComponent,


    // CustomerHeaderComponent,
    // CustomerAsideComponent,
    // CustomerFooterComponent,
    // CustomerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    // Ng6MiscModule,
    MatDialogModule, MatButtonModule, MatMenuModule, MatIconModule,
  ],
  providers: [
    HttpReq
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
