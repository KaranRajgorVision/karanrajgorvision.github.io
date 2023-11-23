import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariableService } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-filedialog',
  templateUrl: './filedialog.component.html',
  styleUrls: ['./filedialog.component.scss'],
  providers: [DatePipe],
})
export class FiledialogComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['view', 'fileName', 'createdDate', 'status','uploaded-by','action'];
  buttonClicked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FiledialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private userService: UserService,
    private toastr: ToastrService,
    private globalSpinner: GlobalVariableService
  ) { }

  @ViewChild('fileUpload') fileUpload: ElementRef;
  @Input() multiple;
  @Input() files: File[] = [];
  inputFileName: string;
  fileData: any;
  isLoaderShow: boolean = false;

  filelistData: any[] = [];
  data: any;
  getCurrentUserId: number;

  ngOnInit(): void {
    let userId = this.userData?.userid;
    this.getFileData(userId);

    let localStorageData = localStorage.getItem('authToken');
    if (localStorageData) {
      this.getCurrentUserId = JSON.parse(localStorageData)?.currentUserId;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  //code for check validation on file upload
  public onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      this.inputFileName = file.name;
    }

    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    const inputElement = event.target as HTMLInputElement;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        if (!this.isMultiple()) {
          this.files = [];
        }
        this.files.push(files[i]);
      }
    }
    this.fileData = files;
  }

  public clearInputElement() {
    this.fileUpload.nativeElement.value = '';
  }

  isMultiple(): boolean {
    return this.multiple;
  }

  validate(file: File) {
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }

  public ImportHistoricalData() {
    this.buttonClicked = true;
    if (this.fileData) {
      this.globalSpinner.showSpinner();
      let localStorageData = localStorage.getItem('authToken');
      let userId = this.userData?.userid;
      let currentUserId = 0;
      if (localStorageData) {
        currentUserId = JSON.parse(localStorageData)?.currentUserId;
      }
      const formData = new FormData();
      formData.append('files', this.fileData[0], this.fileData[0].name);
      formData.append('UserId', String(userId));
      formData.append('CreatedByUserId', String(currentUserId));
      formData.append('IsApproved', JSON.stringify(true));

      this.userService.ImportHistoricalData(formData).subscribe(
        (response) => {
          if (response && response.payload != null && response.isSuccess) {
            if (response.payload > 0) {
              this.toastr.success('File Uploaded Sucessfully !!', 'Success', {
                timeOut: 3000, // or any other configuration
              });
              // this.onNoClick();
              this.globalSpinner.hideSpinner();
              this.getFileData(userId);
            }
          }
        },
        (error) => {
          this.globalSpinner.hideSpinner();
          if (error && error.error) {
            alert(error?.error?.errorMessage);
          } else {
            alert('Oops some error occured.');
          }

          this.onNoClick();
        }
      );
    }
  }

  formatDate(date: any) {
    const formateDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formateDate;
  }

  getFileData(id: any) {
    this.userService
      .GetUserHistoricalDataFileList(id)
      ?.subscribe((response: any) => {
        if (
          response &&
          response != null &&
          response.payload != null &&
          response.payload
        ) {
          this.filelistData = response.payload;
          for (let item of this.filelistData) {
            const originalDate = this.formatDate(item.createdDate);
            item.createdDate = originalDate;
          }
          this.dataSource = new MatTableDataSource(this.filelistData);
        }
      });
  }

  // public deleteHistoricalFile(user: any) {
  //   let userId = this.userData?.userid;

  //     let requestObj = {
  //       userId: this.userData?.userid,
  //       historicalUserDataId: user.historicalUserDataId,
  //       fullPath: user.fullPath,
  //     };

  //     Swal.fire({
  //       title: 'Are you sure want to Delete this?',
  //       text: 'This process is irreversible.',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No',
  //     }).then((result) => {
  //       if (result.value) {

  //         this.userService
  //         .DeleteUnprocessedHistoricalFile(requestObj)
  //         .subscribe((response) => {
  //           if (response && response.payload != null && response.isSuccess) {
  //             Swal.fire('Removed!', 'File removed successfully.', 'success');
  //             this.getFileData(userId);
  //           }

  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         // User clicked "No," show a message
  //         Swal.fire('Cancelled', 'Brand still in our database.', 'error');
  //       }
  //       }

  //     // this.userService
  //     //   .DeleteUnprocessedHistoricalFile(requestObj)
  //     //   .subscribe((response) => {
  //     //     if (response && response.payload != null && response.isSuccess) {
  //     //       alert('File Deleted Successfully.');
  //     //       this.getFileData(userId);
  //     //     }
  //     //     (error) => {
  //     //       // Handle error here
  //     //       console.error('Error deleting file:', error);
  //     //     };
  //     //   });
  //   }
  // }

  public deleteHistoricalFile(user: any) {
    let userId = this.userData?.userid;

    let requestObj = {
      userId: this.userData?.userid,
      historicalUserDataId: user.historicalUserDataId,
      fullPath: user.fullPath,
    };

    Swal.fire({
      title: 'Are you sure you want to delete this?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userService.DeleteUnprocessedHistoricalFile(requestObj).subscribe(
          (response) => {
            if (response && response.payload != null && response.isSuccess) {
              Swal.fire('Removed!', 'File removed successfully.', 'success');
              this.getFileData(userId);
            }
          },
          (error) => {
            console.error('Error deleting file:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'File still in our database.', 'error');
      }
    });
  }

  public revertHistoricalFile(user: any) {
    let userId = this.userData?.userid;
    let requestObj = {
      userId: this.userData?.userid,
      historicalUserDataId: user.historicalUserDataId,
    };

    Swal.fire({
      title: 'Are you sure you want to revert this file ?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userService.RevertUserHistoricalData(requestObj).subscribe(
          (response) => {
            if (response && response.payload != null && response.isSuccess) {
              this.getFileData(userId);
            }
          },
          (error) => {
            console.error('Error reverting file:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'File still in our database.', 'error');
      }
    });

    // this.userService
    //   .RevertUserHistoricalData(requestObj)
    //   .subscribe((response) => {
    //     if (response && response.payload != null && response.isSuccess) {
    //       alert('File Reverted Successfully.');
    //       this.getFileData(userId);
    //     }
    //     (error) => {
    //       // Handle error here
    //       console.error('Error reverting file:', error);
    //     };
    //   });
  }
  AcceptRejectHistoricalUserDataFile(item, proveStatus) {

    const passData = {
      historicalUserDataId: item.historicalUserDataId,
      isApprove: proveStatus
    }
    const iconeName = `${proveStatus ? 'success' : 'warning'}`

    Swal.fire({
      title: `Are you sure you want to ${proveStatus ? 'Accent' : 'Reject'} this file ?`,
      icon: `${proveStatus ? 'success' : 'warning'}`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.userService.AcceptRejectHistoricalUserDataFile(passData)
          ?.subscribe((response: any) => {
            if (
              response &&
              response != null &&
              response.payload != null &&
              response.payload
            ) {

              this.getFileData(this.userData?.userid);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No," show a message
        Swal.fire('Cancelled', 'File still in our database.', 'error');
      }
    });
  }

  ViewUserUplodedFile(item) {
    const passData = {
      HistoricalUserDataId: item.historicalUserDataId,
    }
    this.userService.ViewUserUplodedFile(passData.HistoricalUserDataId)
      ?.subscribe((response: ArrayBuffer) => {

        if (response) {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const currentTime = new Date().getTime();
          const fileName = `${currentTime}.csv`;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Invalid data received');
        }
      }
      );
  }

  setDataColor(data) {
    if (data.status == "Review Pending") {
      return 1;
    }
    else if (data.status == "Process Pending" || data.status == "Processed") {
      return 2;
    }
    else if (data.status == "Rejected") {
      return 3;
    }
    else {
      return 4;
    }
  }
}
