import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StandardResponse } from '../Models/StandardResponse';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseAPIUrl:string = environment.baseAPIURL;
  constructor(private http: HttpClient) { }

  DownloadAndProcessFile(): Observable<any>{
    return this.http.get<any>(`${this.baseAPIUrl}ProcessCSVData/DownloadFileData`);
  }

  GetProcessData(requestObject:any): Observable<any>{
    return this.http.post<any>(`${this.baseAPIUrl}ProcessCSVData/GetFileData`,requestObject);
  }

  GetCardData(requestObject:any):Observable<any>{
    return this.http.post<any>(`${this.baseAPIUrl}User/GetUserSalesDataByDateCard`,requestObject)
  }

  ProcessCSVData(): Observable<StandardResponse<any>>{
    return this.http.get<StandardResponse<any>>(`${this.baseAPIUrl}ImportData/ImportHistoricalData`);
  }

  ProcessLinkData(): Observable<StandardResponse<any>>{
    return this.http.get<StandardResponse<any>>(`${this.baseAPIUrl}ImportData/ImportUserDataByLink`);
  }
}
