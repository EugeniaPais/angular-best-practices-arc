import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CashflowCategory } from "../../models/cashflow-category";
import { SettingsFacade } from "../../settings.facade";
import { Observable } from "rxjs";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  @Input() cashflowCategories$: CashflowCategory[];
  newCategory: CashflowCategory = new CashflowCategory();
  isUpdating$: Observable<boolean>;
  showUpdate: boolean;
  categories: CashflowCategory[];
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
      console.log("is updating");

      this.showUpdate = val;
    });

    this.settingsFacade
      .loadCashflowCategories()
      .subscribe((val: CashflowCategory[]) => {
        console.log("get categories");
        this.categories = val;
      });

    this.settingsFacade.getCashflowCategories$().subscribe(val => {
      this.categories = val;
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