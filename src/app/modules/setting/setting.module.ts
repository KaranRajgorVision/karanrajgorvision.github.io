import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MainSectionComponent } from './main-section/main-section.component';
import { FileUploadlistComponent } from './components/file-uploadlist/file-uploadlist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MainSectionComponent,
    FileUploadlistComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class SettingModule { }
