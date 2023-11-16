import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatelinkmodal',
  templateUrl: './updatelinkmodal.component.html',
  styleUrls: ['./updatelinkmodal.component.scss'],
})
export class UpdatelinkmodalComponent implements OnInit {
  public linkForm: FormGroup;
  fileLink: string;
  isLoaderShow: boolean = false;
  constructor(
    private overlay: Overlay,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdatelinkmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.fileLink = userData?.fileLink;

    const pattern =
      /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.linkForm = this.formBuilder.group({
      fileLink: [
        userData?.fileLink,
        [Validators.required, Validators.pattern(pattern)],
      ],
    });
  }

  //get form control
  get f(): { [key: string]: AbstractControl } {
    return this.linkForm.controls;
  }

  ngOnInit(): void {}

  UpdateUserDataLink() {
    if (this.linkForm.valid) {
      let localStorageData = localStorage.getItem('authToken');
      let userId = this.userData?.userid;
      let currentUserId = 0;

      let requestObj = {
        userID: userId,
        fileLink: this.linkForm.value.fileLink,
        updatedByUserId: 0,
      };

      this.userService.UpdateUserDataLink(requestObj).subscribe((response) => {
        if (response && response.payload != null && response.isSuccess) {
          if (response.payload > 0) {
            this.toastr.success('Link is Updated Sucessfully !!!', 'Success', {
              timeOut: 3000, // or any other configuration
            });

            this.onNoClick();
            this.isLoaderShow = false;
          }
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
