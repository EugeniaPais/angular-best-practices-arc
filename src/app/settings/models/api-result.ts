import { Category } from './category';

export class ApiResult {
  private categories = [
    {
      id: 1,
      name: 'Health'
    },
    {
      id: 2,
      name: 'Banking'
    },
    {
      id: 3,
      name: 'Logistic'
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
}
