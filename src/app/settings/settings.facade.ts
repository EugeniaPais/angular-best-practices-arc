import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingsState } from './core/state/settings.state';
import { CategoryApi } from './core/api/category.api';
import { Category } from './core/models/category';
import { UnsubscribeOnDestroy } from '../shared/helpers/unsubscribe-on-destroy';

@Injectable()
export class SettingsFacade extends UnsubscribeOnDestroy {
  constructor(
    private categoryApi: CategoryApi,
    private settingsState: SettingsState
  ) {
    super();
  }

  isUpdating$(): Observable<boolean> {
    return this.settingsState.isUpdating$();
  }

  getCategories$(): Observable<Category[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams
    // and expose to the components
    return this.settingsState.getCategories$();
  }

  loadCategories(): Observable<Category[]> {
    return this.categoryApi
      .getCategories()
      .pipe(
        tap(categories => this.settingsState.setCategories(categories))
      );
  }

  addCategory(category: Category) {
    this.settingsState.setUpdating(true);
    // Call the API
    this.subs.add(this.categoryApi
      .createCategory(category)
      .subscribe(
        (value: Category) => this.settingsState.addCategory(value), // Update State
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      ));
  }


  updateCategory(category: Category) {
    this.settingsState.setUpdating(true);
    this.subs.add(this.categoryApi
      .updateCategory(category)
      .subscribe(
        () => this.settingsState.updateCategory(category),
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      ));
  }

}
