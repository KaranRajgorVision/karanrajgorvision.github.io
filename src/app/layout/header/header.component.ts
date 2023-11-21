import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean=true;
  @Output() ShowSidebarEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.ShowSidebarEvent.emit(this.isMenuOpened);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
