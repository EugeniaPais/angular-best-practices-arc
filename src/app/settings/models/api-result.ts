import { CashflowCategory } from "./cashflow-category";

export class ApiResult {
  private _categories = [
    {
      id: 1,
      name: "Health"
    },
    {
      id: 2,
      name: "Banking"
    },
    {
      id: 3,
      name: "Logistic"
    }
  ];

  public getCategories(): CashflowCategory[] {
    const cat = localStorage.getItem("categories");
    if (!cat) {
      const cat = JSON.stringify(this._categories);
      localStorage.setItem("categories", cat);
    }
    const result = JSON.parse(cat);
    return result;
  }

  public addCategory(category: CashflowCategory) {
    const currentCategories = JSON.parse(localStorage.getItem("categories"));
    category.id = currentCategories.length + 1;
    currentCategories.push(category);
    localStorage.setItem("categories", JSON.stringify(currentCategories));
    return category;
  }
}
