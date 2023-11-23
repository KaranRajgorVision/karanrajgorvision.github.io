import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Token } from '../Models/Common';
import { MatMenuTrigger } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { GlobalVariableService } from '../services/global-variable.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
  isLoaderShow: boolean = false;
  displayedColumns: string[] = []; // Dynamic column names
  displayCardData: string[] = []; // Dynamic card Data
  dataSource = new MatTableDataSource<any>();
  totalDataLength: number;
  pageEvent: PageEvent;
  pageSize: number = 10;
  pageIndex: number | undefined = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noDataAvailble = false;
  gridData = false;

  constructor(private dataService: DataService, private router: Router,
    private globalSpinner: GlobalVariableService,
    private datePipe: DatePipe,) { }

  columns: string[] = ['position', 'name', 'weight', 'symbol'];
  menuItems: string[] = ['sales', 'units', 'promo'];
  submenuItems: string[] = ['Subitem 1', 'Subitem 2', 'Subitem 3'];
  unSendCurrency = ['UnitsOrganic', 'UnitsPPC', 'UnitsSponsoredProducts', 'UnitsSponsoredDisplay', 'Refunds'];
  showParcentage = ['Real ACOS', 'Margin'];
  ngOnInit() {
    this.getProcessFileData(this.pageIndex, this.pageSize);
    this.getCardData();
  }

  downloadAndProcessCSVFile() {
    // this.isLoaderShow = true;
    this.globalSpinner.showSpinner();
    this.dataService.DownloadAndProcessFile().subscribe((response) => {
      if (
        response &&
        response != null &&
        response.payload != null &&
        response.payload
      ) {
        this.getProcessFileData(1, 20);
      }
    });
  }

  getProcessFileData(pageNumber: any, pageSize: any) {
    this.globalSpinner.showSpinner();
    pageNumber = pageNumber == 0 ? pageNumber + 1 : pageNumber;
    let requestObject = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      userId: this.getCurrentUserId(),
      orderByColumn: 'date',
      sortType: 'ASC',
      startDate: null,
      endDate: null,
    };
    this.dataService.GetProcessData(requestObject).subscribe((response) => {
      if (
        response &&
        response != null &&
        response.payload != null &&
        response.payload
      ) {
        // setTimeout(() => {
        if (response.payload.paginationDataList.length) {
          this.displayedColumns = this.getAllKeys(response);
          this.dataSource = new MatTableDataSource<any>(
            response.payload.paginationDataList
          );
          this.totalDataLength = response.payload?.totalDataCount;
          this.globalSpinner.hideSpinner();
        }
        else {
          this.gridData = true;
          this.globalSpinner.hideSpinner();
        }
        // }, 2000);
      }
    });
  }

  renderCell(column: string, element: any): string {
    if (column === 'Date') {
      const dateParts = element[column].split('-').reverse().join('.');
      return dateParts || '0';
    }

    if (typeof element[column] === 'number') {
      const Germany = new Intl.NumberFormat(["ban", "id"], {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
      });

      const formattedValue = Germany.format(Math.abs(element[column])).replace("€", "");

      const currencyDisplay = '\u20AC'

      if (element[column] < 0) {
        return `-${formattedValue} ${currencyDisplay}`;
      } else {
        return `${formattedValue} ${currencyDisplay}`;
      }
    }

    if (typeof element[column] == 'object' && element[column] == null) {
      return '0';
    } else {
      if(column == "sku"){
        return element["SKU"];
      }
      else{
        return element[column];
      }
    }
  }

  formatDate(date: any) {
    const formattedDate = this.datePipe.transform(date, 'yyyy.MM.dd');
    return formattedDate;
  }

  getAllKeys(response: any) {
    let allkeys: any[] = [];
    for (const item of response.payload.paginationDataList) {
      const keys = Object.keys(item).map(key => (key.toLowerCase() === 'sku' ? 'sku' : key));
      allkeys.push(...keys);
    }

    allkeys = [...new Set(allkeys)];
    return allkeys;
  }

  logout() {
    if (confirm('Want to logout ?')) {
      let tokenObj: Token = {
        access_token: null,
        currentUserId: 0,
      };
      localStorage.setItem('authToken', JSON.stringify(tokenObj));
      this.router.navigate(['/auth/login']);
    }
  }

  getCardData() {
    let requestObject = {
      userId: 1,
      todayStartDate: null,
      todayEndDate: null,
      yesterdayStartDate: null,
      yesterdayEndDate: null,
      monthToDateStartDate: null,
      monthToDateEndDate: null,
      lastMonthStartDate: null,
      lastMonthEndDate: null,
    };
    this.dataService.GetCardData(requestObject).subscribe((response: any) => {
      if (response) {
        this.displayCardData = response.payload;
      }
    });
  }

  closeMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.closeMenu();
  }

  handlePageEvent(page: PageEvent) {
    let pageIndex = page?.pageIndex == 0 ? page?.pageIndex : page?.pageIndex;
    let pageSize = page?.pageSize;
    this.getProcessFileData(pageIndex, pageSize);
  }

  getCurrentUserId(): number {
    let loggedInUserId: number = 0;
    const authToken = localStorage.getItem('authToken');
    if (authToken && authToken != null) {
      loggedInUserId = JSON.parse(authToken)?.currentUserId;
    }
    return loggedInUserId;
  }
}
