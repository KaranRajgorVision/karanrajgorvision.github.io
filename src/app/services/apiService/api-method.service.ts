import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodService {

  constructor(private http: HttpClient) { }


  getList(apiUrl: any) {
    return this.http.get<any>(`${environment.baseAPIURL}${apiUrl}`);
  }

  // getList<T>(apiUrl: any, Id?: number): Observable<T> {
  //    
  //   if (Id && apiUrl) {
  //     return this.http.get<T>(`${environment.baseAPIURL}${apiUrl}${Id}`)
  //   }
  //   else {
  //     return this.http.get<T>(`${environment.baseAPIURL}`)
  //   }
  // }

  createData<T>(apiEndPoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${environment.baseAPIURL}${apiEndPoint}`, data);
  }

  modifyData<T>(apiEndPoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${environment.baseAPIURL}${apiEndPoint}`, data);
  }
}
