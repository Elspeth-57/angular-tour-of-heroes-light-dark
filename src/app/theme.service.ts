import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkTheme = false;

  changeTheme(): void {
    this.darkTheme = !this.darkTheme;
  }
}
