import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart/cart-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartItem = this.cartService.getCartCount();
  cartData = this.cartService.getCart();
  cartTotal = this.cartService.getCartTotal();

  // For Order Booking
  public order = {
    branch: localStorage.getItem('selectedFirm'),
    customer: localStorage.getItem('id'),
    comments: '',
    adddelivery: 'YES',
    qcost: {
      totalitem: 0,
      baseprice: 0,
      gstamt: 0,
      delivery: 0,
      finalamt: 0,
      discountrate: 0,
      discountvalue: 0,
      servicecharge: 0,
      transferamt: 0,
      refundamt: 0,
      tip: 0


    },
    status: 'PLACED',      // -- enum PLACED/ACCEPTED/IN_PROCESS / PACKED / DELIVERED
    expdelivery: '2020-05-28',   // how to calculate
    expdeliverytime: '07:00:00', // how to calculate

    paymentmode: 'BANK', //  --- always BANK (because we don't have cash on delivery provision)
    favourite: 'NO',     //  -- YES/NO default NO.
    //  'deliverypool': '67', // -- if usedeliverypool = YES, assign person for delivery.
    transactionid: '',
    oentry: [{}]

  };

  private oentry = [{}];

  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.populateOrder()
  }

  public removeProduct(index:number) {
    this.cartService.removeProduct(index);
    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal();
  }

  public ClearAll() {
    this.cartService.clearAll();
    location.reload();
  }

  public inc(index: number) {
    this.cartService.addProductItemsInCart(index);
    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal();

    this.populateOrder()
  }

  public dec(index: number) {
    this.cartService.subProductItemsInCart(index);
    this.cartItem = this.cartService.getCartCount();
    this.cartData = this.cartService.getCart();
    this.cartTotal = this.cartService.getCartTotal();

    this.populateOrder();
  }

  // For Order
  private populateOrder() {
    this.oentry = [];

    if (this.cartData) {
      for(let item of this.cartData) {
        const obj = {
          pname: item.name,
          variant: item.variant,
          brand: item.brand,
          stocksoldas: item.fullloose,
          rateperunit: item.price,
          rateunit: item.rateunit,
          qty: Number(item.quantity),
          amount: Number(item.ratewithgst) * Number(item.quantity),
          gst: Number(item.gst),
          gstamt: Number(item.gstamt),
          volume: Number(item.volume),
          entrytotal: '1'
        };

        if (this.oentry) {
          this.oentry.push(JSON.parse(JSON.stringify(obj)));
        } else {
          this.oentry = [JSON.parse(JSON.stringify(obj))];
        }
        
      }

      this.order.qcost.totalitem = Number(this.cartData.length);
      this.order.qcost.baseprice = this.cartData.reduce((a, b) => {
        return a + (b.quantity * b.price)
      }, 0);
      this.order.qcost.gstamt = this.cartData.reduce((a, b) => {
        return a + b.gstamt
      }, 0);
      this.order.qcost.finalamt = this.cartData.reduce((a, b) => {
        return a + b.amount
      }, 0);

      this.order.oentry = this.oentry;
    }
  }
}
