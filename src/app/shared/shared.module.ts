import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberValidatorDirective } from './directive/number-validator.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    NumberValidatorDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    NumberValidatorDirective,
  ]
})
export class SharedModule { }
