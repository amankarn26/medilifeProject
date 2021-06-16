import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from './cart/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'welcome';

  cartItem = this.cartService.getCartCount();
  cartData = this.cartService.getCart();
  cartTotal = this.cartService.getCartTotal();
  stickNav = false;

  islogin = localStorage.getItem('islogin');

  custname = localStorage.getItem('name');

  constructor(
    @Inject(DOCUMENT) document: Document,
    private cartService: CartServiceService,
    private router: Router
  ) {
    setInterval(() => {
      this.refreshData()
    },2000)
  }

  ngOnInit() {
    console.log('AMan')
    this.router.navigate(['/'])
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      this.stickNav = true;
    } else {
      this.stickNav = false;
    }

    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
  }

  private refreshData() {
    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal();
  }

  public removeProduct(index: number) {
    this.cartService.removeProduct(index);
    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal();
  }
}
