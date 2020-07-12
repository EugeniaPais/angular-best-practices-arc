import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../../core/models/category';
import { ApiResult } from './api-result';

@Injectable()
export class CategoryApi {
  readonly API = '/api/Categories';
  api = new ApiResult();

  constructor(private http: HttpClient) { }

  get(): Observable<Category[]> {
    // return this.http.get<Category[]>(this.API);
    return of(this.api.getCategories());
  }

  create(category: Category): Observable<Category> {
    // return this.http.post(this.API, category);
    const res = this.api.addCategory(category);
    return of(res);
  }

  delete(id: number): Observable<boolean> {
    //  http.delete(this.API, ...
    const res = this.api.deleteCategory(id);
    return of(true);
  }

  update(category: Category): Observable<Category> {
    // return this.http.put(`${this.API}/${category.id}`, category);
    const res = this.api.updateCategory(category);
    return of(res);
  }
}
