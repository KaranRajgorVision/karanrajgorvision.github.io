import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserLoginRequest, UserLoginResponse } from 'src/app/Models/Login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/Models/Common';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string;

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  isLoaderShow: boolean = false;
  isErrorMessage: boolean = false;
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private toastr: ToastrService
  ) {
    const currentLanguage = this.translate.getBrowserLang();
    this.translate.setDefaultLang(currentLanguage!);
    this.translate.use(currentLanguage!);
  }

  ngOnInit(): void { }

  //get form control
  get f(): { [key: string]: AbstractControl } {
    return this.LoginForm.controls;
  }

  submit(loginRequestModel) {
    if (this.LoginForm.valid) {
      this.error = null;
      this.isLoaderShow = true;
      this.login(loginRequestModel);
    } else {
      if (
        !this.LoginForm?.controls?.['username']?.value &&
        !this.LoginForm?.controls?.['password']?.value
      ) {
        this.error = 'Username and Password is required.';
      } else if (!this.LoginForm?.controls?.['username']?.value) {
        this.error = 'Username is required.';
      } else if (!this.LoginForm?.controls?.['password']?.value) {
        this.error = 'Password is required.';
      }
    }
  }

  login(loginObj: UserLoginRequest): UserLoginResponse {
    let userResponse: UserLoginResponse = {
      userId: 0,
      email: '',
      role: '',
      token: '',
    };
    if (loginObj != null) {
      this.authService.Login(loginObj).subscribe(
        (response) => {
          if (response && response.payload != null && response.isSuccess) {
            userResponse = response.payload;
            this.setToken(response.payload.token, response.payload.userId);
            this.isLoaderShow = false;

            // this.toastr.success('Success message', 'Success', {
            //   timeOut: 3000, // or any other configuration
            // });

            // this.snackBar.open('User Logged in Successfully !!!', 'close', {
            //   duration: 2000,
            //   panelClass: ['snackbar-success'],

            //   // Duration in milliseconds (3 seconds in this example)
            //   verticalPosition: 'top', // 'top', 'bottom', or 'center'
            //   horizontalPosition: 'right',
            // });
            // this.snackBar.open('User Logged in Sucessfully !!!');
            this.router.navigate(['/dashboard']);
          } else {
            this.error = response?.errorMessage;

          }
        },
        (error) => {
          // Handle errors here
          this.isLoaderShow = false;
          this.error = error?.error?.errorMessage;
          this.isErrorMessage = true;
        }
      );
    }
    return userResponse; // Return the UserLoginResponse
  }
  setToken(token: string, CurrentUserId: number): void {
    let tokenObj: Token = {
      access_token: token,
      currentUserId: CurrentUserId,
    };
    localStorage.setItem('authToken', JSON.stringify(tokenObj));
  }

  setLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
  getCurrentLanguage(value) {
    this.setLanguage(value);
  }
}
