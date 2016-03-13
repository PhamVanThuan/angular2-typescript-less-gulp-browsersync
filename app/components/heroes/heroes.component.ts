import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Hero} from '../../common/hero';
import {HeroService} from '../../common/hero.service';
import {HeroDetailComponent} from '../../components/hero-detail/hero-detail.component';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/components/heroes/heroes.component.html',
  styleUrls: [
    'app/components/heroes/heroes.component.css'
  ],
  directives: [
    HeroDetailComponent
  ]
})
export class HeroesComponent implements OnInit {
  constructor(
    private _router: Router,
    private _heroService: HeroService
  ) {}

  public heroes: Hero[];
  public selectedHero: Hero;

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this._heroService
      .getHeroesFromServer()
      .subscribe((heroes) => {
        this.heroes = heroes
      });
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
