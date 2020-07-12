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

  loadCategories(): void {
    this.subs.add(this.categoryApi
      .get().subscribe(categories => {
        this.settingsState.setCategories(categories); // Update State
      }));
  }

  addCategory(category: Category) {
    this.settingsState.setUpdating(true);
    // Call the API
    this.subs.add(this.categoryApi
      .create(category)
      .subscribe(
        (value: Category) => this.settingsState.addCategory(value), // Update State
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      ));
  }


  updateCategory(category: Category) {
    this.settingsState.setUpdating(true);
    this.subs.add(this.categoryApi
      .update(category)
      .subscribe(
        () => this.settingsState.updateCategory(category), // Update State
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      ));
  }


  deleteCategory(id: number) {
    this.settingsState.setUpdating(true);
    this.subs.add(this.categoryApi
      .delete(id)
      .subscribe(
        () => this.loadCategories(), // Update State
        (error: any) => console.log(error),
        () => this.settingsState.setUpdating(false)
      ));
  }

}
