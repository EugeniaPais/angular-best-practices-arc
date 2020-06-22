import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryApi } from './api/category.api';
import { SettingsFacade } from './settings.facade';
import { SettingsState } from './state/settings.state';
import { SettingsRoutingModule } from './settings-routing.module';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { DashboardTotalComponent } from './components/dashboard-totals/dashboard-totals.component';


@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, ReactiveFormsModule
  ],
  declarations: [CategoriesComponent, CategoryTableComponent, DashboardTotalComponent],
  providers: [CategoryApi, SettingsFacade, SettingsState, ReactiveFormsModule],
  exports: [CategoriesComponent, DashboardTotalComponent]
})
export class SettingsModule { }
