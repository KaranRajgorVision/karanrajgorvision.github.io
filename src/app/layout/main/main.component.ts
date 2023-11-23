import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { GlobalVariableService } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public isShowSidebar: boolean;
  isLoading: any = false
  constructor(private globalSpinner: GlobalVariableService) {}
  getShowSidebarEvent(event) {
    this.isShowSidebar = event;
  }
  ngOnInit(): void {
    this.isLoading = this.globalSpinner.getSpinnerVisibility();
    this.globalSpinner.showSpinner();
   
  }

}
