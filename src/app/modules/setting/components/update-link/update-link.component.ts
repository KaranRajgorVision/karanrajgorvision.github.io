import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ApiMethodService } from 'src/app/services/apiService/api-method.service';

import { IGetUserUploadedLinkApiResponceData, IUploadApiResponceData, IUploadDataType } from 'src/app/Models/setting-model';
import { SERVICE_URLS } from 'src/app/services/apiService/api-url';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-link',
  templateUrl: './update-link.component.html',
  styleUrls: ['./update-link.component.scss']
})
export class UpdateLinkComponent {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['linkUrl', 'status', 'uploadedBy'];
  isSubmit: boolean = false;
  getUserId: number;
  uploadLinkEmpty = false;
  isLoaderShow: boolean = false;
  responseData: any;
  @ViewChild('uploadLink') uploadLink: ElementRef<any>;
  pattern =
    /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  updateUrlFrom = new FormGroup({
    updateUrl: new FormControl(''),
  });



  constructor(
    private toastr: ToastrService,
    private apiService: ApiMethodService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.updateUrlFrom = this.formBuilder.group({
      updateUrl: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    })
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const authData = JSON.parse(authToken);
      if (authData && authData.currentUserId) {
        this.getUserId = authData.currentUserId;
      }
    }
    this.getFileData(this.getUserId);
  }

  currectUrlUpload(uploadLinkString) {
    const pattern =
      /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (pattern.test(uploadLinkString)) {
      this.isSubmit = false;
    } else {
      this.isSubmit = true;
    }
  }

  uploadLinkEvent(uploadLinkString) {
    this.isSubmit = true;
    if (this.updateUrlFrom.valid && this.isSubmit) {
      const UploadData: IUploadDataType = {
        userID: this.getUserId,
        linkUrl: uploadLinkString.updateUrl
      }
      this.apiService.createData<IUploadApiResponceData>(SERVICE_URLS.UserUrl.addUpdateUserLink, UploadData).subscribe({
        next: (response: IUploadApiResponceData) => {
          if (response) {
            if (response) {
              this.toastr.success('Link Update Sucessfully !!', 'Success', {
                timeOut: 3000,
              });
              this.updateUrlFrom.get('updateUrl')?.setValue('');
              this.isSubmit = false;  
              this.isLoaderShow = false;
              this.getFileData(this.getUserId);
            }
          }
        },
        error: (error) => {
          this.isLoaderShow = false;
          if (error && error.error) {
            alert(error?.error?.errorMessage);
          } else {
            alert('Oops some error occured.');
          }
        }
      }
      );
    }
    else {
      this.isSubmit = true;
    }

  }

  getFileData(id: any) {
    const apiUrl = `${SERVICE_URLS.UserUrl.getUserUploadedLink}?UserId=${id}`
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


