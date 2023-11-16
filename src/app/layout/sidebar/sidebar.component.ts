import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { RolebaseAuthService } from 'src/app/auth/rolebase-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  decodeToken: any;
  isLoaderShow : boolean = false;

  constructor(private rolebaseAuth: RolebaseAuthService,
    private dataService : DataService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    this.decodeToken = this.rolebaseAuth.getDecodedAccessToken(token);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ProcessCSVData(){
    this.isLoaderShow = true;
    this.dataService.ProcessCSVData().subscribe(
          (response) => {
              this.isLoaderShow = false;
              this.toastr.success('CSV Data Has been Processed', 'Success', {
                timeOut: 3000,
              });
          },
          (error) => {
              this.isLoaderShow = false;
              this.toastr.error('Oops some error occured', 'Error', {
                timeOut: 3000,
              });
          }
    );
  }

  ProcessLinkData(){
    this.isLoaderShow = true;
    this.dataService.ProcessLinkData().subscribe(
      (response) => {
        this.isLoaderShow = false;
        this.toastr.success('Date from Link Has been Processed', 'Success', {
          timeOut: 3000,
        });
      },
      (error) => {
        this.isLoaderShow = false;
        this.toastr.error('Oops some error occured', 'Error', {
          timeOut: 3000,
        });
      }
);
  }
}
