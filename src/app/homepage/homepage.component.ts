import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  // All Variables
  public hotdeals:any;
  public hotdealsSlice:any;
  public hotdealsLoaded:boolean = false;

  public prodType:any;
  public prodTypeLoaded:boolean = false;

  public topProduct:any;

  public producttype:any;

  public offerList:any;


  public docServer = this.restService.docServer


  public slideIndex = 1;




  images = [
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
    {path: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'},
  ]


  constructor(
    private route: Router,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.getOffers()
    this.showSlides(1)
    this.firstImage()
    this.getPopularProducts()
    this.getProductType()
    this.getTopProduct()
    this.getAllProductType()
  }

  public getDetailsProduct(getProdID:number) {
    this.route.navigate(['/product',getProdID]);
    // alert("Server Error !");
  }

  public getCategory(getcatID:number) {
    // this.route.navigate(['/catagory',getcatID]);
    this.route.navigate(['/catagory']);
    // alert("Server Error !");
  }

  public plusSlides(n:number) {
    this.showSlides(this.slideIndex += n);
  }

  public currentSlide(n:number) {
    this.showSlides(this.slideIndex = n);
  }

  public showSlides(n:number) {
    var i;
    if (n > 3) { this.slideIndex = 1 }
    else if (n < 1) { this.slideIndex = 3 }
    else { this.slideIndex = n}
  }

  public firstImage() {
    setInterval(() => {
      this.plusSlides(1)
    }, 7000)
  }

  private getOffers() {
    // Get Information from JSON REST api
    const url = this.restService.homePageRest("banner", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.offerList = response;

        console.log("getPopularProducts ka data " + url);
        console.log(response);
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
        this.hotdealsSlice = response.slice(1,this.hotdeals.length);
        this.hotdealsLoaded = true
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
  private getProductType() {
    // Get Information from JSON REST api
    const url = this.restService.homePageRest("prodtype", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.prodType = response;
        this.prodTypeLoaded = true
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
  public getTopProduct(){
    // Get Information from JSON REST api
    const url = this.restService.homePageRest('popularproducts', '');
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.topProduct = response;
      },
      error => {
        console.log('Error in data load.');
      }
    );
  }

  private getAllProductType() {
    const url = this.restService.homePageRest("allproductype", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.producttype = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }

}
