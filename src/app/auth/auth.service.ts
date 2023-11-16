import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserLoginRequest, UserLoginResponse } from '../Models/Login';
import { UserRegisterRequest, UserRegisterResponse } from '../Models/Register';
import { StandardResponse } from '../Models/StandardResponse';
import { isJwtToken } from '../Helper/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseAPIUrl:string = environment.baseAPIURL;
  constructor(private http: HttpClient) { }

  Login(requestObject:UserLoginRequest) : Observable<StandardResponse<UserLoginResponse>>{
    return this.http.post<StandardResponse<UserLoginResponse>>(`${this.baseAPIUrl}Authentication/login`,requestObject);
  }

  Register(requestObject:UserRegisterRequest): Observable<StandardResponse<UserRegisterResponse>>{
    return this.http.post<StandardResponse<UserRegisterResponse>>(`${this.baseAPIUrl}Authentication/register`,requestObject);
  }

  IsAuthrized():boolean{
    const authToken = localStorage.getItem("authToken");
    if (authToken && isJwtToken(JSON.parse(authToken)?.access_token)){
            return true;
    }
    else{
            return false;
    }
  }
}
