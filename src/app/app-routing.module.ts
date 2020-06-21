import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const featureRoutes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(featureRoutes, {
      enableTracing: false,
      useHash: true
    })
  ],
  declarations: []
})
export class AppRoutingModule { }
