import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CategoryComponent } from './category/category.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: '', component:  HomepageComponent,  },

  { path: 'category', component:  CategoryComponent },
  { path: 'category/:name', component:  CategoryComponent },

  { path: 'products/:id', component:  ProductDetailsComponent },

  { path: 'cart', component:  CartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
