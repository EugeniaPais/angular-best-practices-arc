import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { ApiResult } from '../models/api-result';

@Injectable()
export class CategoryApi {
  readonly API = '/api/cashflowCategories';
  api = new ApiResult();

  constructor(private http: HttpClient) { }

  getCashflowCategories(): Observable<Category[]> {
    // return this.http.get<CashflowCategory[]>(this.API);
    return of(this.api.getCategories());
  }

  createCashflowCategory(category: Category): Observable<any> {
    // return this.http.post(this.API, category);
    const res = this.api.addCategory(category);
    return of(res);
  }

  updateCashflowCategory(category: Category): Observable<any> {
    return this.http.put(`${this.API}/${category.id}`, category);
  }
}
