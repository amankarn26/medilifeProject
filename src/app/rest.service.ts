import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // public ip = "http://localhost:8090";
  public ip = "http://45.32.62.106:8090";
  // public ip = "https://cors-anywhere.herokuapp.com/http://45.32.62.106:8090";

  public server = this.ip + '/NaturalHomeoManager';
  public docServer = this.ip + '/naturalhomeodocs';

  constructor(private http: HttpClient) { }

  // Init Data (important)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'form-data'
    })
  };

  public getJSONFromURL(url: any) {
    return this.http.get(url, { headers: new HttpHeaders({ timeout: `${30000}` }) });
  }


  // Post Data
  public postFormData(url: any, json: any) {
    return this.http.post(url, json, this.httpOptions).pipe(
      map(res => {
        const postresponse = res;
        console.log('service method: ' + postresponse);
        return postresponse;
      })
    );
  }
  
  public uploadFormData(url: any, formdata: any) {
    const headers = new Headers();
    return this.http.post(url, formdata)
      .pipe(map(res => {
        const postresponse = res;
        console.log('service method: ' + postresponse);
        return postresponse;
      }));
  }



  public homePageRest(restid: string, stateId : any) {
    let url = this.server;
    switch (restid) {
      case 'banner':
        url += '/common/doc?type=OFFER';
        break;
      case 'hotdeals':
        url += '/offer/hotdeal';
        break;
      case 'prodtype':
        url += '/product/prodtype';
        break;
      case 'popularproducts':
        url += '/order/popular/product';
        break;
      case 'allproductype':
        url += '/product/producttype';
        break;
      default:
        url += '/offer/hotdeal/' + stateId;
        break;
    }
    return url;
  }

  public productPageRest(restid: string, stateId : any) {
    let url = this.server;
    switch (restid) {
      case 'productbyid':
        url += '/product/' + stateId;
        break;
      case 'productbyidWithStock':
        url += '/compact/product?product=' + stateId;
        break;
      case 'popularproducts':
        url += '/order/popular/product';
        break;
      case 'allproductype':
        url += '/product/producttype';
        break;
      default:
        url += '/offer/hotdeal/' + stateId;
        break;
    }
    return url;
  }
}
