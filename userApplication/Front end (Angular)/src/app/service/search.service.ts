import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://127.0.0.1:8000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  }

  // getSearchResults() {
  //   return this.http.get(this.rootURL);
  // }

  getSearchResults(searchString: any) {
    return this.http.get(this.rootURL + searchString);
  }

}
