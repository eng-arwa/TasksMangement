import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent {
  constructor(private router: Router){}
  shownav = false;
  showmenu = false;

  showNav() {
    this.shownav = !this.shownav;
    this.showmenu = false;
  }
  showMenu() {
    this.shownav= false;
    this.showmenu = !this.showmenu;
  }
  logout() {
    localStorage.removeItem('token');
  }
}
