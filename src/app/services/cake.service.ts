//Import Injectable
import { Injectable } from "@angular/core";

//Import Http Module for CRUD
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Import Observable to accept reponse from server
import { Observable } from "rxjs";

//Import Category Model
import { Category } from "./../models/Category";

//Import API URL from environment
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CakeService {
  constructor(private http: HttpClient) {}

  //Function will return cakes based on categoryId as input parameter
  getCakesByCategory(categoryId): Observable<any> {
    const endPoint =
      environment.apiURL + "/cakes?$limit=150&category=" + categoryId;
    const response = this.http.get<any>(endPoint);
    return response;
  }

  //Function will return cake based on cakeId as input parameter
  getCake(cakeId): Observable<any> {
    const endPoint = environment.apiURL + "/cakes/" + cakeId;
    const response = this.http.get<any>(endPoint);
    return response;
  }
}
