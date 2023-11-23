import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {
  private isLoading = new BehaviorSubject<boolean>(false);
  constructor() { }
  showSpinner() {
    this.isLoading.next(true);
  }
  hideSpinner() {
    this.isLoading.next(false);
  }
  getSpinnerVisibility() {
    return this.isLoading.asObservable();
  }
}
