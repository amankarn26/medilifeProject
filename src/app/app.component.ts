import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { CartServiceService } from './cart/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'welcome';

  cartItem = this.cartService.getCartCount();
  cartData = this.cartService.getCart();
  cartTotal = this.cartService.getCartTotal();
  stickNav = false;

  constructor(
    @Inject(DOCUMENT) document: Document,
    private cartService: CartServiceService
  ) {
    setInterval(() => {
      this.refreshData()
    },2000)
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
