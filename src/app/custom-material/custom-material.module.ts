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
  MatInputModule,
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
    MatInputModule,
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
    MatInputModule,
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
