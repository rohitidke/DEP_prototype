import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  }

  getSearchResults() {
    return this.http.get(this.rootURL + '/getSearchResultsClusters');
  }

  postSearchResults(searchString: any) {
    return this.http.post(this.rootURL + '/search', searchString, this.httpOptions);
  }

}
