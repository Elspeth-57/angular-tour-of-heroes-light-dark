import { Component, OnInit } from '@angular/core';
import { themes, ThemeService } from './core/services/ThemeService/theme.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.light-theme]': 'this.theme.themeName === "LIGHT"',
    '[class.dark-theme]': 'this.theme.themeName === "DARK"',
    '[class.green-theme]': 'this.theme.themeName === "GREEN"'
  }
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  currentPage?: string;

  constructor(public theme: ThemeService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    const currentPath = this.location.path();
    if (currentPath === '/dashboard') {
      this.currentPage = 'dashboard';
    } else if (currentPath === '/heroes') {
      this.currentPage = 'heroes';
    } else {
      this.currentPage = 'dashboard';
      // this.location.go('/dashboard');
      const promise = this.router.navigateByUrl('/dashboard');
    }
  }

  changeCurrentPage(newPage: string): void {
    this.currentPage = newPage;
  }
}
