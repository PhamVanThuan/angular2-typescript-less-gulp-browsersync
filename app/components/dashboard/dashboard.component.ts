import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Hero} from '../../common/hero';
import {HeroService} from '../../common/hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/components/dashboard/dashboard.component.html',
  styleUrls: [
    'app/components/dashboard/dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {
  constructor(
    private _router: Router,
    private _heroService: HeroService
  ) {}

  heroes: Hero[];

  ngOnInit() {
    this._heroService
      .getHeroes()
      .then((heroes) => {
        this.heroes = heroes.slice(0, 5);
      });
  }

  goToDetail(hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
