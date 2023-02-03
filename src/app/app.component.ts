import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  currentPage?: string;

  constructor(public theme: ThemeService) {
  }

  ngOnInit(): void {
    this.currentPage = 'dashboard';
  }

  changeCurrentPage(newPage: string): void {
    this.currentPage = newPage;
  }
}
