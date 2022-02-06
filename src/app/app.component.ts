import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from './cart/cart-service.service';
import { CollapseModule, WavesModule } from 'angular-bootstrap-md'
import { RestService } from './rest.service';

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
  firstMenuOpen = false;
  secondMenuOpen = false;
  allProductType: any

  islogin = localStorage.getItem('islogin');
  getRole = localStorage.getItem('role');

  custname = localStorage.getItem('name');

  constructor(
    @Inject(DOCUMENT) document: Document,
    private cartService: CartServiceService,
    private restService: RestService,
    private router: Router
  ) {
    setInterval(() => {
      this.refreshData();
    }, 2000);
  }

  ngOnInit() {
    this.router.navigate(['/']);
    this.getAllProductType()
    if (this.islogin == "true") {
      if(this.getRole != "CUSTOMER") {
        // location.href = "http://45.32.62.106:8090/medlife/"
      }
    }
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

  public navigateToCategory(additionalPaths: string) {
    this.firstMenuOpen = false
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/category', additionalPaths]);
    });
  }

  public moveToProfile(profileType:number) {
    if (localStorage.getItem('islogin') == "true") {
      switch (profileType) {
        case 1:
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/profile']);
          });
          break;
        case 2:
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/order']);
          });
          break;
        case 3:
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/transection']);
          });
          break;
      
        default:
          break;
      }
    }
    else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  public logout() {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  }

  public openSecondMenu() {
    this.secondMenuOpen = !this.secondMenuOpen
  }

  public gotoCart() {
    if(this.secondMenuOpen)
      this.router.navigate(['cart'])
    this.secondMenuOpen = false
  }

  public openFirstMenu() {
    this.firstMenuOpen = !this.firstMenuOpen
  }

  private getAllProductType() {
    // Get Information from JSON REST api
    const url = this.restService.homePageRest("prodtype", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.makeArray(this.groupBy(response, "category"));
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private groupBy(xs:any, key:any) {
    return xs.reduce((rv:any, x:any) =>{
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  private makeArray(array:any) {
    let tempData = []
    for (const key in array) {
      if (Object.prototype.hasOwnProperty.call(array, key)) {
        const element = array[key];
        let newData = {
          cat: this.capitalizeFirstLetter(key),
          allProdType: array[key]
        }
        tempData.push(newData)
      }
    }
    this.allProductType = tempData
  }

  public capitalizeFirstLetter(string:any) { 
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
