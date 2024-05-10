import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewClaimRequestFormComponent } from './new-claim-request-form/new-claim-request-form.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ProcessClaimComponent } from './process-claim/process-claim.component';
import { AuthGuardManagerService } from './services/auth-guard-manager.service';
import { AuthGuardCustomerService } from './services/auth-guard-customer.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'claims', component: ClaimListComponent, canActivate: [AuthGuardManagerService] },
  { path: 'claims/:claimId', component: ProcessClaimComponent, canActivate: [AuthGuardManagerService] },
  { path: 'claims-add', component: NewClaimRequestFormComponent, canActivate: [AuthGuardCustomerService] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
