import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewClaimRequestFormComponent } from './new-claim-request-form/new-claim-request-form.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProcessClaimComponent } from './process-claim/process-claim.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewClaimRequestFormComponent,
    ClaimListComponent,
    ProcessClaimComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
