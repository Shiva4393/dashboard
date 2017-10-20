import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconRegistry,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class CustomMaterialModule {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'avatar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/user.svg'));
  }
}
