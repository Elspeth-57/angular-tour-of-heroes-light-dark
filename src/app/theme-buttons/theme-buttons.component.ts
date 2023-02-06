import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-buttons',
  templateUrl: './theme-buttons.component.html',
  styleUrls: ['./theme-buttons.component.scss']
})
export class ThemeButtonsComponent{
  themeInfo: { name: 'light'|'dark'|'green', icon: string }[] = [
    {
      name: 'light', icon: 'light_mode'
    },
    {
      name: 'dark', icon: 'dark_mode'
    },
    {
      name: 'green', icon: 'beach_access'
    }
  ];

  constructor(private theme: ThemeService) { }

  toNewTheme(newTheme: 'light'|'dark'|'green'): void {
    this.theme.changeTheme(newTheme);
  }

}
