import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class SettingsState {
  private updating$ = new BehaviorSubject<boolean>(false);
  private categories$ = new BehaviorSubject<Category[]>(null);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getCategories$() {
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
    this.categories$.next([...categories]);
  }

  updateCategoryId(categoryToReplace: Category, addedCategoryWithId: Category) {
    const categories = this.categories$.getValue();
    const updatedCategoryIndex = categories.findIndex(category => category === categoryToReplace);
    categories[updatedCategoryIndex] = addedCategoryWithId;
    this.categories$.next([...categories]);
  }

  removeCategory(categoryRemove: Category) {
    const currentValue = this.categories$.getValue();
    this.categories$.next(currentValue.filter(category => category !== categoryRemove));
  }

}
