import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ApiResult } from './api-result';

@Injectable()
export class CategoryApi {
  readonly API = '/api/Categories';
  api = new ApiResult();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>(this.API);
    return of(this.api.getCategories());
  }

  createCategory(category: Category): Observable<any> {
    // return this.http.post(this.API, category);
    const res = this.api.addCategory(category);
    return of(res);
  }

  updateCategory(category: Category): Observable<any> {
    // return this.http.put(`${this.API}/${category.id}`, category);
    const res = this.api.updateCategory(category);
    return of(res);
  }
}
