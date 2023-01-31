import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Method to return the HEROES, an array of mock hero objects.
   *
   * Mock data can be returned immediately so the function is synchronous.
   *
   * If the data cannot be returned immediately there must be an asynchronous signature.
   *
   * @Using-rxjs-method-of() The of() function returns an Observable<Hero[]> with a value asynchronously.
   *
   * @Using-HttpClient Use the injected client to fetch data using a Http request, it is still returned as an Observable<Hero[]>.
   */
  getHeroes(): Observable<Hero[]> {
    /*
    const heroes = of(HEROES);
    // send a message to message array using injected messageService
    this.messageService.add('Hero Service: fetched heroes');
    return heroes;
    */
    return this.http.get<Hero[]>(this.heroesUrl)
      // before returning the result of the Http request, check for errors.
      .pipe(
        // use the tap() function to call the log function and add a message to the message array
        tap(_ => this.log('fetched heroes')),
        // catchError intercepts a failed Observable, then passes it on to an error handling function - handleError.
        // handleError reports the error and returns a default result [].
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /**
   * Method to return an Observable with a single hero object, found in the HEROES mock data.
   * A message will be added using messageService as well.
   * @param id - The id of the hero you are looking for.
   */
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    // this.log(`fetched hero id=${id}`);
    // return of(hero);
    const url = `${this.heroesUrl}/${id}`; // create a url to get a single hero data using the id
    return this.http.get<Hero>(url) // send a request using HttpClient
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)), // use log() to add a message to message array
        // use same function to handle any errors, with no safe value to be returned instead
        catchError(this.handleError<Hero>('get hero by id'))
      );
  }

  /**
   * A function to permanently update the data on the "server".
   * @param hero The updated hero object with changes.
   */
  updateHero(hero: Hero): Observable<any> {
    // A put request rather than a get
    // Three  for put(): the server url, data to update, options (such as headers)
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  /** POST add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => {this.log(`added hero w/ id=${newHero.id}`); }),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** DELETE to delete a hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => {this.log(`deleted hero w/ id=${id}`); }),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  /** GET heroes whose names contain the search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if there is no search term return an empty array
      return of([]);
    }
    // the url includes a query string with the search term
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Function to handle errors when fetching data using a Http request.
   * @param operation Description of what operation was being performed when the error occurred.
   * @param result Optional value to return as the default result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log the error to the console
      this.log(`${operation} failed: ${error.message}`); // add message to display in message array
      return of(result as T); // return a default result to keep app running
    };
  }

  /**
   * When HeroService is created Angular injects MessageService and HttpClient into private properties.
   * Being private means that this property can only be accessed within the class,
   * not the template or passed down to other classes as a property.
   * @param messageService - property injected with service that looks after message array.
   * @param http - property injected with HttpClient, lets you het data using a Http request.
   */
  constructor(private messageService: MessageService, private http: HttpClient) {
  }
}
