import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng4FilesModule } from 'angular4-files-upload';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material/custom-material.module';

import { UsersService } from './services/users.service';
import { HttpProviderService } from './services/http-provider.service';
 
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserPermissionsComponent } from './users/user-permissions/user-permissions.component';

import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailsComponent,
    UserPermissionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4FilesModule,
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
