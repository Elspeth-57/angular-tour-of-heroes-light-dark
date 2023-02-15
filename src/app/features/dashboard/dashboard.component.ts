import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.enum';
import { HeroService } from '../../core/services/HeroService/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = []; // create heroes property in the class, it has type array of Hero types

  constructor(
    private heroService: HeroService, // when the class is created, create a private property for the HeroService injection
  ) { }

  ngOnInit(): void { // once the class is created call the getHeroes method within the class
    this.getHeroes();
  }

  /**
   * getHeroes method gets 3 elements (2, 3, 4) from the array of heroes using injected HeroService.
   * The service is asynchronous so subscribe is used to wait for the Observable
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5)); // this will only return heroes in positions 2, 3, 4 in the list
  }

}
