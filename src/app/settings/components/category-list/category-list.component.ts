import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CashflowCategory } from "../../models/cashflow-category";
import { SettingsFacade } from "../../settings.facade";
import { Observable } from "rxjs";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"]
})
export class CategoryListComponent implements OnInit {
  @Input() cashflowCategories$: CashflowCategory[];
  newCategory: CashflowCategory = new CashflowCategory();
  isUpdating$: Observable<boolean>;
  showUpdate: boolean;
  categories$: Observable<CashflowCategory[]>;
  form: FormGroup;
  constructor(
    private settingsFacade: SettingsFacade,
    private formBuilder: FormBuilder
  ) {
    this.isUpdating$ = settingsFacade.isUpdating$();
  }

  ngOnInit() {
    this.initForm();
    this.isUpdating$.subscribe(val => {
      this.showUpdate = val;
    });

    this.settingsFacade.loadCashflowCategories().subscribe(val => {
      this.categories$ = this.settingsFacade.getCashflowCategories$();
    });
  }

  addCategory(category: CashflowCategory) {
    this.settingsFacade.addCashflowCategory(category);
  }

  updateCategory(category: CashflowCategory) {
    this.settingsFacade.updateCashflowCategory(category);
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  onAdd() {
    if (this.form.get("name").value) {
      const add: CashflowCategory = {
        name: this.form.get("name").value
      };
      this.addCategory(add);
    }
  }
}
