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
  providedIn: 'root'
})
export class CakeBuilderService {

  constructor(private http: HttpClient) { }


  uploadCakeImage(file): Observable<any>{
    var formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',environment.cloudinaryUploadPreset);

    return this.http.post(environment.cloudinaryEndPoint, formData, {headers:{'Content-Type' : 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': '*'}});
    
  }

}
