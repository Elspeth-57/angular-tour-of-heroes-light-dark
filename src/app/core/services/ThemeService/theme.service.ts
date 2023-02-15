import { Injectable } from '@angular/core';

// use an enum for theme
export enum themes {
  light = 'LIGHT',
  dark = 'DARK',
  green = 'GREEN'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeName: themes = themes.light;

  changeTheme(newTheme: themes): void {
    this.themeName = newTheme;
  }
}
