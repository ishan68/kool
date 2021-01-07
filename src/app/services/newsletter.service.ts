import { Injectable } from '@angular/core';

//Import API URL from environment
import { environment } from "./../../environments/environment";

//Import Http Client
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Import Auth service
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }


  sendNewsletter(name, email, phoneNo) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    // const bearerToken = 'Bearer ' + accessToken
    // const headers = new HttpHeaders().set("Authorization", bearerToken);

    const endPoint = environment.apiURL + "/newsletter";
    return this.http.post(
      endPoint,
      { name, email, phoneNo },
      { headers: headers }
    );
  }
}
