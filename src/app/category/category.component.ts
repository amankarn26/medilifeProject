import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnChanges {

  public prodTypeName:any
  public allProduct:any

  public docServer = this.restService.docServer

  constructor(
    private route: Router,
    public routprms: ActivatedRoute,
    private restService: RestService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0,0);

    this.prodTypeName = this.routprms.snapshot.params['name'];

    if (this.prodTypeName) {
      this.getSelectedProduct();
    }
    else {
      this.getAllProduct()
      this.prodTypeName = "Products"
    }
    console.log("Working on init")

  }

  ngOnChanges(): void {
    console.log("Working on change")
  }

  private getAllProduct() {
    // Get Information from JSON REST api
    const url = this.restService.catPageRest("getAllProduct", "");
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.allProduct = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
  
  private getSelectedProduct() {
    // Get Information from JSON REST api
    const url = this.restService.catPageRest("getByProdType", this.prodTypeName);
    this.restService.getJSONFromURL(url).subscribe(
      (response: any) => {
        this.allProduct = response;
      },
      (error) => {
        console.log("Error in data load.");
      }
    );
  }
}
