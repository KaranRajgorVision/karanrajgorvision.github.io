import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { RolebaseAuthService } from 'src/app/auth/rolebase-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('mainListMenu') mainListMenu: ElementRef;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  decodeToken: any;
  isLoaderShow: boolean = false;

  constructor(private rolebaseAuth: RolebaseAuthService,
    private dataService: DataService,
    private toastr: ToastrService
  ) { }
  ngAfterViewInit(): void {

    let mainListMenu = document.querySelectorAll('.add-sub-menu > .list-item-contant');
    let toggle = false;
    mainListMenu.forEach((x) => {
       
      x.addEventListener('click', (x: any) => {
        const currentTarget = x.currentTarget;
        const targetSubMenu = x.currentTarget.parentElement.querySelector('.list-menu');
         
        if (currentTarget && targetSubMenu && !toggle) {
          toggle = true;
          // currentTarget.parentElement.classList.add('activeSubMenu');
          let subMenuItemTarget = currentTarget.parentElement.querySelector('.list-menu');
          const totalHeightSubMenu = subMenuItemTarget.children[0].clientHeight * subMenuItemTarget.children.length;
          currentTarget.parentElement.querySelector('.list-menu').style.height = totalHeightSubMenu + 'px';
        }
        else {
          toggle = false;
          currentTarget.parentElement.querySelector('.list-menu').style.height = '0' + 'px';
        }
      })
    })
  }

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

  ProcessCSVData() {
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

  ProcessLinkData() {
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
