import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ApiMethodService } from 'src/app/services/apiService/api-method.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalVariableService } from 'src/app/services/global-variable.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatelinkmodal',
  templateUrl: './updatelinkmodal.component.html',
  styleUrls: ['./updatelinkmodal.component.scss'],
})
export class UpdatelinkmodalComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['linkUrl', 'status', 'uploadedBy', 'action'];
  isSubmit: boolean = false;
  getUserId: number;
  uploadLinkEmpty = false;
  isLoaderShow: boolean = false;
  responseData: any;
  @ViewChild('uploadLink') uploadLink: ElementRef;
  updateUrlFrom = new FormGroup({
    updateUrl: new FormControl(''),
  });
  pattern =
    /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  constructor(
    public dialogRef: MatDialogRef<UpdatelinkmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private toastr: ToastrService,
    private apiService: ApiMethodService,
    private globalSpinner: GlobalVariableService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {

    this.updateUrlFrom = this.formBuilder.group({
      updateUrl: new FormControl(this.userData.fileLink, [Validators.required, Validators.pattern(this.pattern)]),
    })

    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const authData = JSON.parse(authToken);
      if (authData && authData.currentUserId) {
        this.getUserId = authData.currentUserId;
      }
    }
    this.getFileData(this.userData.userid);
  }

  // currectUrlUpload(uploadLinkString) {
  //   const pattern =
  //     /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  //   if (pattern.test(uploadLinkString)) {
  //     this.isSubmit = false;
  //   } else {
  //     this.isSubmit = true;
  //   }
  // }

  uploadLinkEvent(uploadLinkString) {
    this.isSubmit = true;
    if (this.updateUrlFrom.valid && this.isSubmit) {

      const uploadLink = "User/UpdateUserDataLink"
      const UploadData = {
        userID: this.userData.userid,
        fileLink: uploadLinkString.updateUrl,
        updatedByUserId: this.getUserId
      }

      this.apiService.modifyData(uploadLink, UploadData).subscribe(
        (response) => {
          if (response) {
            if (response) {
              this.toastr.success('Link Updated Sucessfully !!', 'Success', {
                timeOut: 3000,
              });
              this.isLoaderShow = false;
              this.globalSpinner.hideSpinner();
              this.onNoClick()
              this.getFileData(this.userData.userid);
            }
            this.updateUrlFrom.get('updateUrl')?.setValue('');
            this.isSubmit = false;
          }
        },
        (error) => {
          this.globalSpinner.hideSpinner();
          if (error && error.error) {
            alert(error?.error?.errorMessage);
          } else {
            alert('Oops some error occured.');
          }
        }
      );
    }
    else {
      this.isSubmit = true;
    }

  }

  AcceptRejectUserLink(item, proveStatus) {

    const apiUrl = "User/AcceptRejectUserLink"
    // const passData = {
    //   userLinkId: item.userLinkId,
    //   linkUrl: item.linkUrl,
    //   isApproved: proveStatus
    // };

    const passData = {
      userLinkId: item.userLinkId,
      userId: this.userData.userid,
      isApproved: proveStatus,
    };
    const iconeName = `${proveStatus ? 'success' : 'warning'}`;

    Swal.fire({
      title: `Are you sure you want to ${proveStatus ? 'accept' : 'reject'} this link ?`,
      icon: `${proveStatus ? 'success' : 'warning'}`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this.apiService.createData(apiUrl, passData)
          ?.subscribe((response: any) => {
            if (
              response &&
              response != null &&
              response.payload != null &&
              response.payload
            ) {
              this.onNoClick();
              this.getFileData(this.userData.userid);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'error');
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFileData(id: any) {
    const apiUrl = `User/GetUserUploadedLink?UserId=${id}`
    this.apiService.getList(apiUrl)
      ?.subscribe((response: any) => {
        if (
          response &&
          response != null &&
          response.payload != null &&
          response.payload
        ) {
          this.responseData = response.payload;
          const data: any[] = [];
          data.push(response.payload);
          this.dataSource = new MatTableDataSource(data);
        }
      });
  }

}
