import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { CashflowCategoryApi } from './api/cashflow-category-api';
import { SettingsFacade } from './settings.facade';
import { SettingsState } from './state/settings.state';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, ReactiveFormsModule
  ],
  declarations: [CategoriesComponent],
  providers: [CashflowCategoryApi, SettingsFacade, SettingsState, ReactiveFormsModule],
  exports:      [ CategoriesComponent]
})
export class SettingsModule { }