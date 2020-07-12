import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../../core/models/category';

@Injectable()
export class SettingsState {
  private updating$ = new BehaviorSubject<boolean>(false);
  private categories$ = new BehaviorSubject<Category[]>(null);

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getCategories$(): Observable<Category[]> {
    return this.categories$.asObservable();
  }

  setCategories(categories: Category[]) {
    this.categories$.next(categories);
  }

  addCategory(category: Category) {
    const currentValue = this.categories$.getValue();
    this.categories$.next([...currentValue, category]);
  }

  updateCategory(updatedCategory: Category) {
    const categories = this.categories$.getValue();
    const indexOfUpdated = categories.findIndex(
      category => category.id === updatedCategory.id
    );
    categories[indexOfUpdated] = updatedCategory;
    this.categories$.next(categories);
  }

}
