import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserList } from 'src/app/Models/User';
import { UserService } from '../user.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FiledialogComponent } from '../filedialog/filedialog.component';
import { UpdatelinkmodalComponent } from '../updatelinkmodal/updatelinkmodal.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { GlobalVariableService } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public responseData: any[] = [];
  public FullName: any;
  fullNamesObjects: { FullName: string }[] = [];

  displayedColumns: string[] = [
    'FullName',
    'Email',
    'CompanyName',
    'PhoneNo',
    'ImportFile',
  ];

  dataSource = new MatTableDataSource<UserList>(this.responseData);

  isLoaderShow = false;
  getAllUSerdata: any[] = [];
  filelistData: any;
  constructor(private userService: UserService, public dialog: MatDialog,
    private globalSpinner: GlobalVariableService) { }

  ngOnInit(): void {
    this.GetUsersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public GetUsersList(): void {
    this.globalSpinner.showSpinner();
    this.userService.GetUsersList().subscribe((response: any) => {
      // console.log(response.payload, 'user list');
      if (response && response != null) {
        this.getAllUSerdata = response.payload;
        if (this.getAllUSerdata) {
          this.dataSource = new MatTableDataSource<UserList>(response.payload);
        }
      }

      this.globalSpinner.hideSpinner();
    });
  }

  openDialog(userData: any): void {
    const dialogRef = this.dialog.open(FiledialogComponent, {
      data: userData,
    });
    // this.getFileData(userData.userid)

    dialogRef.afterClosed().subscribe((result) => { });
  }

  openLinkUploadDialog(userData: any): void {
    const dialogRef = this.dialog.open(UpdatelinkmodalComponent, {
      data: userData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetUsersList();
    });
  }

  addNewUser(Data: any): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: Data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.GetUsersList();
    });
  }

  // getFileData(id:any){
  //   this.userService.GetUserHistoricalDataFileList(id).subscribe((response:any)=>{
  //     if(response.isSuccess){
  //       let fileData = response.payload
  //       console.log(this.filelistData);
  //     }
  //   })
  // }
}
