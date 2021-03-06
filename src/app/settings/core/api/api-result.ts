import { Category } from '../models/category';

export class ApiResult {
  private categories = [
    {
      id: 1,
      name: 'Healthcare'
    },
    {
      id: 2,
      name: 'Payroll'
    },
    {
      id: 3,
      name: 'Insurance'
    }
  ];

  public getCategories(): Category[] {
    let cat = localStorage.getItem('categories');
    if (!cat) {
      cat = JSON.stringify(this.categories);
      localStorage.setItem('categories', cat);
    }
    const result = JSON.parse(cat);
    return result;
  }

  public addCategory(category: Category) {
    const currentCategories = JSON.parse(localStorage.getItem('categories'));
    category.id = currentCategories.length + 1;
    currentCategories.push(category);
    localStorage.setItem('categories', JSON.stringify(currentCategories));
    return category;
  }

  public deleteCategory(id: number) {
    let currentCategories = JSON.parse(localStorage.getItem('categories'));
    currentCategories = currentCategories.filter(val => val.id !== id);
    localStorage.setItem('categories', JSON.stringify(currentCategories));
  }

  public updateCategory(category: Category) {
    // TODO add when we have more fields
    return category;
  }
}
