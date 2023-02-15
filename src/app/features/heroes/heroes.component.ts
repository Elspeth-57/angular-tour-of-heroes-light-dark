import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.enum';
import { HeroService } from '../../core/services/HeroService/hero.service';
import { MessageService } from '../../core/services/MessageService/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
// create a property, as a currently empty array, that will be an array of object types Hero - it is available for binding in the template
  heroes: Hero[] = [];

  /**
   * Function called when this component, HeroesComponent, is being created.
   * @param heroService - Defines private heroService property and identifies it as a HeroService injection site.
   * Being private means this property cannot be bound to (accessed in) the template, only within this class.
   * @param messageService - Defines private messageService property from MessageService injection.
   * @param theme - Defines a public theme property that will be accessed in the template.
   */
  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  /**
   * Function called when component initiated, after constructor.
   * It calls the component's getHeroes function which sets the heroes property using dependency injection from the HeroesService.
   */
  ngOnInit(): void { // void type for a function means it returns nothing
    this.getHeroes();
  }

  /**
   * Method to retrieve heroes from the HeroService and assign them to heroes property in HeroesComponent
   */
  getHeroes(): void { // HeroService is asynchronous so returns an Observable<Hero[]> containing the array called heroes
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
    // .subscribe waits for the Observable, then passes the array (heroes) into the callback to assign to the component property this.heroes
  }

  /**
   * Function to take a name from an input and create a new hero on the server.
   * @param name The name of the new hero.
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; } // check the name isn't blank
    this.heroService.addHero({ name } as Hero )
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /**
   * Function to delete a hero when a button is pressed and send a message to do ot on the server.
   * @param hero The hero object you are deleting.
   */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe();
  }
}
