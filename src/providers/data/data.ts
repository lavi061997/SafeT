import { Http, Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: Http) {
  }


  headers = new Headers({'Content-Type': 'application/json', 'app_id': '666ce266', 'app_key': 'e3579b4490c6ae4d2a2ce09334774ee7'});

  options = new RequestOptions({headers: this.headers});

  enroll(img) {
      return this.http.post('https://api.kairos.com/enroll',img, this.options)
        .map(res => res.json())
  }

  verify(img) {
      return this.http.post(' https://api.kairos.com/verify',img, this.options)
        .map(res => res.json())
  }
}
