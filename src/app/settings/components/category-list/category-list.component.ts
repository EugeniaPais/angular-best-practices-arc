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
  @Input() categories$: Observable<CashflowCategory[]>;
  constructor() {}

  ngOnInit() {}
}
