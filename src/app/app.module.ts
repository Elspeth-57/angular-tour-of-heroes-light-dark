import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Where to find ngModel which allows two-way data binding
import { HttpClientModule} from '@angular/common/http'; // Angular's way of communicating with a remove server over HTTP
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './features/heroes/heroes.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeroDetailComponent } from './features/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './features/dashboard/hero-search/hero-search.component';
import { MessagesComponent } from './features/messages/messages.component';
import { ThemeButtonsComponent } from './features/theme-buttons/theme-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,
    ThemeButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
