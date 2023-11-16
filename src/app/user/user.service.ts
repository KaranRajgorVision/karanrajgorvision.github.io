import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { StandardResponse } from '../Models/StandardResponse';
import { AcceptRejectHistoricalUserDataFile, UserList } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseAPIUrl: string = environment.baseAPIURL;
  constructor(private http: HttpClient) { }

  GetUsersList(): Observable<StandardResponse<UserList[]>> {
    return this.http.get<StandardResponse<UserList[]>>(
      `${this.baseAPIUrl}User/GetUserList`
    );
  }

  // GetUsersList(): Observable<any[]> {
  //   return this.UserList;
  // }
  // GetUsersList(): Observable<any[]> {
  //   return of(this.UserList); // Wrap your data array with 'of' to create an Observable
  // }

  ImportHistoricalData(requestObj: any): Observable<StandardResponse<number>> {
    return this.http.post<StandardResponse<number>>(
      `${this.baseAPIUrl}User/InsertHistoricalData`,
      requestObj
    );
  }

  public UpdateUserDataLink(
    requestObj: any
  ): Observable<StandardResponse<number>> {
    return this.http.put<StandardResponse<number>>(
      `${this.baseAPIUrl}User/UpdateUserDataLink`,
      requestObj
    );
  }

  GetUserHistoricalDataFileList(userid: number): Observable<StandardResponse<number>> {
    return this.http.get<StandardResponse<number>>(
      `${this.baseAPIUrl}User/GetUserHistoricalDataFileList?UserId=${userid}`
    )
  }

  DeleteUnprocessedHistoricalFile(requestObj: any): Observable<StandardResponse<number>> {
    return this.http.post<StandardResponse<number>>(
      `${this.baseAPIUrl}User/DeleteUnprocessedHistoricalFile`,
      requestObj
    );
  }

  RevertUserHistoricalData(requestObj: any): Observable<StandardResponse<number>> {
    return this.http.post<StandardResponse<number>>(
      `${this.baseAPIUrl}User/RevertUserHistoricalData`,
      requestObj
    );
  }

  AcceptRejectHistoricalUserDataFile(requestObj: AcceptRejectHistoricalUserDataFile) {

    return this.http.post<StandardResponse<AcceptRejectHistoricalUserDataFile>>(
      `${this.baseAPIUrl}User/AcceptRejectHistoricalUserDataFile`,
      requestObj
    );
  }

  // ViewUserUplodedFile(requestObj: any): Observable<StandardResponse<number>> {
  //
  //   return this.http.get<StandardResponse<number>>(
  //     `${this.baseAPIUrl}File/ViewUserUplodedFile?HistoricalUserDataId=${requestObj}`
  //   );
  // }

  ViewUserUplodedFile(HistoricalUserDataId: number) {

    return this.http.get(`${this.baseAPIUrl}File/ViewUserUplodedFile`, {
      responseType: 'arraybuffer', // Set responseType to 'arraybuffer' to handle binary data
      params: { HistoricalUserDataId: HistoricalUserDataId }
    });
  }



  // private UserList: any[] = [
  //   {
  //     userid: 1,
  //     fullName: 'demo john',
  //     username: 'demojohn',
  //     email: 'demojohn@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 2,
  //     fullName: 'new user',
  //     username: 'demousersdf',
  //     email: 'new@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 3,
  //     fullName: 'some full name',
  //     username: 'somenewusername',
  //     email: 'somenewusername@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 4,
  //     fullName: 'some new user with new name',
  //     username: 'demousersdfnew',
  //     email: 'demo@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 5,
  //     fullName: 'task master new user',
  //     username: 'taskmaster',
  //     email: 'task@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 6,
  //     fullName: 'demo name full',
  //     username: 'testinguser',
  //     email: 'testing@123',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 7,
  //     fullName: 'ds some new username',
  //     username: 'dashboarduser',
  //     email: 'ds@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 8,
  //     fullName: 'full name some',
  //     username: 'testing@123',
  //     email: 'testing@123.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  //   {
  //     userid: 9,
  //     fullName: 'demotesting',
  //     username: 'demotesting',
  //     email: 'demotesting@gmail.com',
  //     roleId: 2,
  //     role: 'User',
  //   },
  // ];
}
