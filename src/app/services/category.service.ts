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
export class CategoryService {
  constructor(private http: HttpClient) {}

  //Function will return root categories(which do not have parents)
  getRootCategories(): Observable<any> {
    const endPoint =
      environment.apiURL + "/categories?$limit=150&isSubCategory=false";
    const response = this.http.get<any>(endPoint);
    return response;
  }

  //Function will return all categories
  getAllCategories(): Observable<any> {
    const endPoint = environment.apiURL + "/categories?$limit=150";
    const response = this.http.get<any>(endPoint);
    return response;
  }

  //Function will return child categories by taking parentCategoryId as Input
  getChildCategories(parentCategoryId): Observable<any> {
    const endPoint =
      environment.apiURL +
      "/categories?$limit=150isSubCategory=true&$populate=parentCategory&parentCategory=" +
      parentCategoryId;
    const response = this.http.get<any>(endPoint);
    return response;
  }

  getCategory(categoryId): Observable<any> {
    const endPoint = environment.apiURL + "/categories/" + categoryId;
    const response = this.http.get<any>(endPoint);
    return response;
  }
}
