import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  baseAPIUrl: string = environment.baseAPIURL;
  token: any;
  showLoginButton = false;
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute, private router: Router, private toastr: ToastrService,) { }
  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe((params: any) => {
        if (params.token) {
          this.token = params.token;
        }
      });

    if (this.token.length > 0) {
      this.http.get(`${this.baseAPIUrl}Authentication/Verify?token=${this.token}`).subscribe(
        (res: any) => {
          if (res && res.isSuccess && res.payload > 0) {
            this.showLoginButton = false;
            this.toastr.success(
              'verify your email',
              'Success',
              {
                timeOut: 3000,
              }
            );
          }
          else {
            this.showLoginButton = true;
          }
        },
        (error) => {
          this.showLoginButton = true;
        }
      )
    }
  }

  loginPage() {
    const notoken = localStorage.clear()
    if (notoken == null) {
      this.router.navigate(["/login"])
    }
  }

}
