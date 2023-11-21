import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file-uploadlist',
  templateUrl: './file-uploadlist.component.html',
  styleUrls: ['./file-uploadlist.component.scss'],
  providers: [DatePipe],
})
export class FileUploadlistComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['fileName', 'createdDate', 'status'];
  buttonClicked: boolean = false;
  getUserId: any;
  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
  ) { }
  ngOnInit(): void {

    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const authData = JSON.parse(authToken);
      if (authData && authData.currentUserId) {
        this.getUserId = authData.currentUserId;
      }
    }
    this.getFileData(this.getUserId);
  }
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @Input() multiple;
  @Input() files: File[] = [];
  inputFileName: string = '';
  fileData: any = '';
  isLoaderShow: boolean = false;

  filelistData: any[] = [];
  data: any;

  onNoClick(): void {
    // this.dialogRef.close();
  }

  onClick(event) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }


  public onFileSelected(event) {
     
    const file = event.target.files[0];
    if (file) {
      this.inputFileName = file.name;
      this.fileData = file.name;
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


  clearInputElement() {
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

  ImportHistoricalData() {
     
    this.buttonClicked = true;
    if (this.fileData) {
      this.isLoaderShow = true;
      // let localStorageData = localStorage.getItem('authToken');
      // // let userId = this.userData?.userid;
      // let currentUserId = 0;
      // if (localStorageData) {
      //   currentUserId = JSON.parse(localStorageData)?.currentUserId;
      // }
      const formData = new FormData();
      formData.append('files', this.fileData[0], this.fileData[0].name);
      // formData.append('UserId', String(userId));
      formData.append('CreatedByUserId', String(this.getUserId));
      formData.append('UserId', String(this.getUserId))
      formData.append('IsApproved', JSON.stringify(false));

      this.userService.ImportHistoricalData(formData).subscribe(
        (response) => {

          if (response && response.payload != null && response.isSuccess) {
            if (response.payload > 0) {
              this.toastr.success('File Uploaded Sucessfully !!', 'Success', {
                timeOut: 3000, // or any other configuration
              });
              // this.onNoClick();
              this.isLoaderShow = false;
              this.getFileData(this.getUserId);
              this.inputFileName = '';
              this.buttonClicked = false;
              this.fileData = '';
            }
          }
        },
        (error) => {
          this.isLoaderShow = false;
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
}
