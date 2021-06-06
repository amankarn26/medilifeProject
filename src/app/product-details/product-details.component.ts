import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public productDetail:any
  public productLoaded = false;

  public hotdeals:any
  public hotdealsLoaded = false;

  public allProduct:any
  public topProductLoaded = false;

  public prodID = 0

  public docServer = this.restService.docServer

  constructor(
    private route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService

  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.prodID = this.routprms.snapshot.params['id'];
    if (this.prodID > 0) {
      this.getProductDetails()
    }
    this.getPopularProducts()
  }

  private getProductDetails() {
    // Get Information from JSON REST api
    const url = this.restService.productPageRest("productbyid", this.prodID);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.productDetail = response;
        if (response.name) {
          this.getSelectedProduct()
        } 
        this.productLoaded = true
        console.log(this.productDetail)
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getSelectedProduct() {
    // Get Information from JSON REST api
    const url = this.restService.catPageRest("getByProdType", this.productDetail.prodtype);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.allProduct = response;
        this.topProductLoaded = true
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

  private getPopularProducts() {
    // Get Information from JSON REST api
    const url = this.restService.homePageRest("hotdeals", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.hotdeals = response;
        this.hotdealsLoaded = true
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

}
