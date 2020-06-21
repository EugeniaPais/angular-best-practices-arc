import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SettingsState } from './state/settings.state';
import { CategoryApi } from './api/category.api';
import { Category } from './models/category';

@Injectable()
export class SettingsFacade {
  constructor(
    private cashflowCategoryApi: CategoryApi,
    private settingsState: SettingsState
  ) { }

  isUpdating$(): Observable<boolean> {
    return this.settingsState.isUpdating$();
  }

  getCashflowCategories$(): Observable<Category[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.settingsState.getCashflowCategories$();
  }

  loadCashflowCategories(): Observable<Category[]> {
    return this.cashflowCategoryApi
      .getCategories()
      .pipe(
        tap(categories => this.settingsState.setCashflowCategories(categories))
      );
  }

  // optimistic update
  // 1. update UI state
  // 2. call API
  addCashflowCategory(category: Category) {
    this.settingsState.addCashflowCategory(category);

    this.cashflowCategoryApi.createCategory(category).subscribe(
      (addedCategoryWithId: Category) => {
        // success callback - we have id generated by the server, let's update the state
        this.settingsState.updateCashflowCategoryId(
          category,
          addedCategoryWithId
        );
      },
      (error: any) => {
        // error callback - we need to rollback the state change
        this.settingsState.removeCashflowCategory(category);
        console.log(error);
      }
    );
  }

  // pessimistic update
  // 1. call API
  // 2. update UI state
  updateCashflowCategory(category: Category) {
    this.settingsState.setUpdating(true);
    this.cashflowCategoryApi
      .updateCategory(category)
      .subscribe(
        () => this.settingsState.updateCashflowCategory(category),
        error => console.log(error),
        () => this.settingsState.setUpdating(false)
      );
  }
}
