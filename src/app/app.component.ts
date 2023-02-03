import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  currentPage = 'dashboard';

  constructor(public theme: ThemeService) {
  }

  ngOnInit(): void {
  }

  changeCurrentPage(newPage: string): void {
    this.currentPage = newPage;
  }
}
