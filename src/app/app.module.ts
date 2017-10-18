import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { UsersService } from './services/users.service';
import { HttpProviderService } from './services/http-provider.service';
 
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    DashboardRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpProviderService,
      multi: true,
    },
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
