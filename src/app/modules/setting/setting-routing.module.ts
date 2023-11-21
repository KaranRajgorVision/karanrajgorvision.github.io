import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-section/main-section.component';


const routes: Routes = [
  {
    path: '',
    component: MainSectionComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'upload file',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'upload file',
    //     component: FileUploadlistComponent
    //   },
    //   {
    //     path: 'upload link',
    //     component: UploadLinkComponent
    //   }
    // ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
