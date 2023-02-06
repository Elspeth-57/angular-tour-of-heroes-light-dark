import {Component} from '@angular/core';
import { themes, ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-buttons',
  templateUrl: './theme-buttons.component.html',
  styleUrls: ['./theme-buttons.component.scss']
})
export class ThemeButtonsComponent{
  themeInfo: { name: themes, icon: string }[] = [
    {
      name: themes.light, icon: 'light_mode'
    },
    {
      name: themes.dark, icon: 'dark_mode'
    },
    {
      name: themes.green, icon: 'beach_access'
    }
  ];

  constructor(private theme: ThemeService) { }

  onThemeClick(newTheme: themes): void {
    this.theme.changeTheme(newTheme);
  }

}
