import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeName = 'light';

  changeTheme(newTheme: 'light'|'dark'|'green'): void {
    this.themeName = newTheme;
  }
}
