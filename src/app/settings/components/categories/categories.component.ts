import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { SettingsFacade } from '../../settings.facade';
import { Observable } from 'rxjs';
import { UnsubscribeOnDestroy } from '../../../shared/helpers/unsubscribe-on-destroy';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends UnsubscribeOnDestroy implements OnInit {
  isUpdating$: Observable<boolean>;
  categories$: Observable<Category[]>;
  form: FormGroup;
  showUpdate: boolean;

  constructor(
    private settingsFacade: SettingsFacade,
    private formBuilder: FormBuilder
  ) {
    super();
    this.isUpdating$ = settingsFacade.isUpdating$();
  }

  ngOnInit() {
    this.initForm();

    this.subs.add(this.isUpdating$.subscribe(val => {
      this.showUpdate = val;
    }));

    this.subs.add(this.settingsFacade.loadCategories().subscribe(val => {
      this.categories$ = this.settingsFacade.getCategories$();
    }));
  }

  addCategory(category: Category) {
    this.settingsFacade.addCategory(category);
  }

  updateCategory(category: Category) {
    this.settingsFacade.updateCategory(category);
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  onAdd() {
    if (this.form.get('name').value) {
      const add: Category = {
        name: this.form.get('name').value
      };
      this.addCategory(add);
      this.form.get('name').setValue('');
    }
  }
}

