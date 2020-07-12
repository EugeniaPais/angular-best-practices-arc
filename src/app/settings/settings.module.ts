import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './presentation/categories/categories.component';
import { CategoryApi } from './core/api/category.api';
import { SettingsFacade } from './settings.facade';
import { SettingsState } from './core/state/settings.state';
import { SettingsRoutingModule } from './settings-routing.module';
import { CategoryTableComponent } from './presentation/category-table/category-table.component';
import { DashboardTotalComponent } from './presentation/dashboard-totals/dashboard-totals.component';


@NgModule({
  imports: [
    CommonModule, SettingsRoutingModule, ReactiveFormsModule
  ],
  declarations: [CategoriesComponent, CategoryTableComponent, DashboardTotalComponent],
  providers: [CategoryApi, SettingsFacade, SettingsState, ReactiveFormsModule],
  exports: [CategoriesComponent, DashboardTotalComponent]
})
export class SettingsModule { }
