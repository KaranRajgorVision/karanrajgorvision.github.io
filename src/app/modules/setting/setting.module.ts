import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MainSectionComponent } from './main-section/main-section.component';
import { FileUploadlistComponent } from './components/file-uploadlist/file-uploadlist.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UpdateLinkComponent } from './components/update-link/update-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainSectionComponent,
    FileUploadlistComponent,
    UpdateLinkComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SettingModule { }
