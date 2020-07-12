import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from '../../../shared/helpers/unsubscribe-on-destroy';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category';
import { SettingsFacade } from '../../settings.facade';

@Component({
  selector: 'app-dashboard-totals',
  templateUrl: './dashboard-totals.component.html',
  styleUrls: ['./dashboard-totals.component.css']
})
export class DashboardTotalComponent extends UnsubscribeOnDestroy implements OnInit {
  total = 0;
  categories$: Observable<Category[]>;

  constructor(
    private settingsFacade: SettingsFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.categories$ = this.settingsFacade.getCategories$();

    this.categories$.subscribe(val => this.total = val.length);
  }

}
