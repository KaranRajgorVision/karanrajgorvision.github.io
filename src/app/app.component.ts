import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './services/data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SellerBoardFE';
 isLoaderShow:boolean = false;
  displayedColumns: string[] = []; // Dynamic column names
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService : DataService) {

  }

  columns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  downloadAndProcessCSVFile(){
    this.isLoaderShow = true;
    this.dataService.DownloadAndProcessFile().subscribe((response)=>{
      if(response && response!= null && response.payload != null && response.payload){
        this.getProcessFileData(1,20);
      }
    });
  }

  getProcessFileData(pageNumber:any,pageSize:any){
    let requestObject = {
      pageNumber : pageNumber,
      pageSize:pageSize
    }
    this.dataService.GetProcessData(requestObject).subscribe((response)=>{
      if(response && response!= null && response.payload != null && response.payload){
        this.displayedColumns = this.getAllKeys(response);
        this.dataSource = new MatTableDataSource<any>(response.payload.paginationDataList);
        this.dataSource.paginator = this.paginator;
        this.isLoaderShow = false;
      }
    });

  }

  getAllKeys(response:any) {
    let allkeys : any[] =[];
    // Iterate through the objects in the payload array
    for (const item of response.payload.paginationDataList) {
      // Get keys of each object and add them to allKeys
      allkeys.push(...Object.keys(item));
    }

    // Remove duplicate keys (if needed)
    allkeys = [...new Set(allkeys)];
    return allkeys;
  }
}





