/* MODULES */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng6MiscModule } from './ng/modules/ng6misc';

// https://material.angular.io/components/categories
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

/* COMPONENTS */
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
// admin
import { AdminHeaderComponent } from './pages/admin/_common/header/header.component';
import { AdminAsideComponent } from './pages/admin/_common/aside/aside.component';
import { AdminFooterComponent } from './pages/admin/_common/footer/footer.component'
import { AdminComponent } from './pages/admin/admin.component';
import { AdminUsersComponent } from './pages/admin/users/users.component';
import { AdminWebsitesComponent } from './pages/admin/websites/websites.component';
import { AdminWebsiteSegmentsComponent } from './pages/admin/websiteSegments/websiteSegments.component';
import { AdminRulesComponent } from './pages/admin/rules/rules.component';
import { AdminmModifiersComponent } from './pages/admin/modifiers/modifiers.component';
import { AdminSchedulesComponent } from './pages/admin/schedules/schedules.component';
import { AdminWebsiteUrlsComponent } from './pages/admin/websiteUrls/websiteUrls.component';
import { AdminWebsiteUrlsAppendComponent } from './pages/admin/websiteUrlsAppend/websiteUrlsAppend.component';
import { AdminAgentsComponent } from './pages/admin/agents/agents.component';
import { AdminMediatorsComponent } from './pages/admin/mediators/mediators.component';
import { AdminScraperSitemapComponent } from './pages/admin/scrapers/scraper-sitemap/scraperSitemap.component';
import { AdminScraperSiteurlComponent } from './pages/admin/scrapers/scraper-siteurl/scraperSiteurl.component';
import { AdminUrlopenerSingleComponent } from './pages/admin/urlopeners/urlopener-single/urlopenerSingle.component';
import { AdminUrlopenerMultiComponent } from './pages/admin/urlopeners/urlopener-multi/urlopenerMulti.component';
import { AdminValidatorRunComponent } from './pages/admin/validator/validatorRun/validatorRun.component';
import { AdminValidationErrorsComponent } from './pages/admin/validator/validationErrors/validationErrors.component';
import { AdminFastlyCacheComponent } from './pages/admin/fastly-cache/fastlyCache.component';
// customer
import { CustomerHeaderComponent } from './pages/customer/_common/header/header.component';
import { CustomerAsideComponent } from './pages/customer/_common/aside/aside.component';
import { CustomerFooterComponent } from './pages/customer/_common/footer/footer.component';
import { CustomerComponent } from './pages/customer/customer.component';
// dialogs
import { AdminMatDialogAddedituserComponent } from './pages/admin/_common/mat/dialog/addedituser/addedituser.component';
import { AdminMatDialogAddeditwebsiteComponent } from './pages/admin/_common/mat/dialog/addeditwebsite/addeditwebsite.component';
import { AdminMatDialogAddeditwebsiteSegmentComponent } from './pages/admin/_common/mat/dialog/addeditwebsiteSegment/addeditwebsiteSegment.component';
import { AdminMatDialogAddeditruleComponent } from './pages/admin/_common/mat/dialog/addeditrule/addeditrule.component';
import { AdminMatDialogAddeditmodifierComponent } from './pages/admin/_common/mat/dialog/addeditmodifier/addeditmodifier.component';
import { AdminMatDialogAddeditscheduleComponent } from './pages/admin/_common/mat/dialog/addeditschedule/addeditschedule.component';
import { AdminMatDialogAddeditwebsiteurlComponent } from './pages/admin/_common/mat/dialog/addeditwebsiteUrl/addeditwebsiteUrl.component';
import { AdminMatDialogAddeditagentComponent } from './pages/admin/_common/mat/dialog/addeditagent/addeditagent.component';
import { AdminMatDialogAddeditmediatorComponent } from './pages/admin/_common/mat/dialog/addeditmediator/addeditmediator.component';


/* SERVICES */
import { IsLoggedService, HasRoleService, AutologinService } from 'ngboost-auth';
import { HttpReq } from './ng/services/httpReq.service'


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AutologinService] },
  { path: 'admin', component: AdminComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/websites', component: AdminWebsitesComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/website-segments', component: AdminWebsiteSegmentsComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/rules', component: AdminRulesComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/modifiers', component: AdminmModifiersComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/schedules', component: AdminSchedulesComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/websiteurls', component: AdminWebsiteUrlsComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/websiteurls-append', component: AdminWebsiteUrlsAppendComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/agents', component: AdminAgentsComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/mediators', component: AdminMediatorsComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/scrapers/scraper-sitemap', component: AdminScraperSitemapComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/scrapers/scraper-siteurl', component: AdminScraperSiteurlComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/urlopeners/urlopener-single', component: AdminUrlopenerSingleComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/urlopeners/urlopener-multi', component: AdminUrlopenerMultiComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/validator/run', component: AdminValidatorRunComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/validator/errors', component: AdminValidationErrorsComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'admin/fastly-cache', component: AdminFastlyCacheComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: 'customer', component: CustomerComponent, canActivate: [IsLoggedService, HasRoleService] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NotfoundComponent,

    AdminHeaderComponent,
    AdminAsideComponent,
    AdminFooterComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminWebsitesComponent,
    AdminWebsiteSegmentsComponent,
    AdminRulesComponent,
    AdminmModifiersComponent,
    AdminSchedulesComponent,
    AdminWebsiteUrlsComponent,
    AdminWebsiteUrlsAppendComponent,
    AdminAgentsComponent,
    AdminMediatorsComponent,
    AdminScraperSitemapComponent,
    AdminScraperSiteurlComponent,
    AdminUrlopenerSingleComponent,
    AdminUrlopenerMultiComponent,
    AdminValidatorRunComponent,
    AdminValidationErrorsComponent,
    AdminFastlyCacheComponent,
    // dialogs
    AdminMatDialogAddedituserComponent,
    AdminMatDialogAddeditwebsiteComponent,
    AdminMatDialogAddeditwebsiteSegmentComponent,
    AdminMatDialogAddeditruleComponent,
    AdminMatDialogAddeditmodifierComponent,
    AdminMatDialogAddeditscheduleComponent,
    AdminMatDialogAddeditwebsiteurlComponent,
    AdminMatDialogAddeditagentComponent,
    AdminMatDialogAddeditmediatorComponent,

    CustomerHeaderComponent,
    CustomerAsideComponent,
    CustomerFooterComponent,
    CustomerComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule, ReactiveFormsModule,
    Ng6MiscModule,
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
