import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {HEROES} from './mock-heroes';
import {Hero} from './hero';

@Injectable()
export class HeroService {
  constructor(
    private _http: Http
  ) {}

  private _url = 'app/json/heroes.json';
  private _handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }

  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHero(id: number) {
    let hero = HEROES.filter((hero) => {
      return hero.id === id;
    })[0];

    return Promise.resolve(hero);
  }

  getHeroesSlowly() {
    return new Promise<Hero[]>((resolve) => {
      setTimeout(() => {
        resolve(HEROES);
      }, 2000);
    })
  }

  getHeroesFromServer() {
    return this._http
      .get(this._url)
      .map((response) => {
        return <Hero[]>response.json().data;
      })
      .catch(this._handleError);
  }
}
