import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  UserRegisterRequest,
  UserRegisterResponse,
} from 'src/app/Models/Register';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  isdataExist: boolean = false;
  public RagistrationForm: FormGroup;
  public error: any = '';
  public isLoaderShow: boolean = false;
  public isRoute: boolean;
  passwordNotMatch: boolean = false;
  addUserTitleShow: boolean = false;
  showMessageAfterREgister: boolean = false;

  constructor(
    // public dialogRef: MatDialogRef<RegisterComponent>,
    // @Inject(MAT_DIALOG_DATA) public userData: any,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,

  ) {
    const currentLanguage = this.translate.getBrowserLang();
    this.translate.setDefaultLang(currentLanguage!);
    this.translate.use(currentLanguage!);
    this.isRoute = false;
  }

  ngOnInit(): void {
    const IsAuthToken = localStorage.getItem('authToken');
    if (IsAuthToken) {
      this.addUserTitleShow = true;
    }

    this.RagistrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: [null],
      createdBy: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      phoneNo: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8),
      ]],
    });
  }

  //get form control
  get f(): { [key: string]: AbstractControl } {
    return this.RagistrationForm.controls;
  }

  public submit() {
    if (this.RagistrationForm.value.password != this.RagistrationForm.value.confirmPassword) {
      this.passwordNotMatch = true;
    }
    else {
      this.passwordNotMatch = false;
    }

    if (this.RagistrationForm.valid) {
      if (!this.passwordNotMatch) {
        this.isLoaderShow = true;
        this.error = false;
        let loginRequestModel: UserRegisterRequest = {
          email: this.RagistrationForm?.controls?.['email']?.value,
          password: this.RagistrationForm?.controls?.['password']?.value,
          role: 2,
          createdBy: 1,
          firstName: this.RagistrationForm?.controls?.['firstName']?.value,
          lastName: this.RagistrationForm?.controls?.['lastName']?.value,
          companyName: this.RagistrationForm?.controls?.['companyName']?.value,
          phoneNo: this.RagistrationForm?.controls?.['phoneNo']?.value,
        };
        this.Register(loginRequestModel);
      } else {
        this.error =
          'Please fill in all required fields and make sure passwords match.';
      }
    } else {
      this.error =
        'Please fill in all required fields and make sure passwords match.';
    }
  }

  Register(loginObj: UserRegisterRequest): UserRegisterResponse {
    let userResponse: UserRegisterResponse = {
      UserId: 0,
      Email: '',
      Role: '',
      Token: '',
    };
    if (loginObj != null) {
      this.authService.Register(loginObj).subscribe(
        (response) => {
          if (response && response.payload != null && response.isSuccess) {
            this.isdataExist = false;
            userResponse = response.payload;
            this.isLoaderShow = false;
            this.showMessageAfterREgister = true

            if (this.isRoute == true) {
              // this.router.navigate(['/login']);
              this.toastr.success(
                'Link is Updated Sucessfully !!!',
                'Success',
                {
                  timeOut: 3000, // or any other configuration
                }
              );
            }
            this.toastr.success(
              'User Successful Register',
              'Success',
              {
                timeOut: 4000,
              }
            );
            // setTimeout(() => {
            //   this.router.navigate(['/login']);
            // }, 6000);
          } else {
            this.error = response?.errorMessage;
          }
        },

        (error) => {
          // Handle errors here
          this.isLoaderShow = false;
          this.error = error?.error?.errorMessage;
          this.isdataExist = true;
        }
      );
    }
    return userResponse; // Return the UserLoginResponse
  }

  setLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  getCurrentLanguage(value) {
    this.setLanguage(value);
  }

  loginPage() {
    const notoken = localStorage.clear()
    if (notoken == null) {
      window.location.reload();
      setTimeout(() => {
        this.showMessageAfterREgister = false;
      }, 1000);
    }
  }
}
