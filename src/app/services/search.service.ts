import { Injectable } from '@angular/core';

//Import Environment
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  getCakes(searchString): Observable<any> {
    var endPoint = environment.apiURL + '/cakes?name[$search]=' + searchString;

    const response = this.http.get<any>(endPoint);


    return response;


  }
}
