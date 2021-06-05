import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component:  HomepageComponent },
  { path: 'category', component:  CategoryComponent },
  { path: 'category/:name', component:  CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
