import { Injectable } from "@angular/core";

//Import API URL from environment
import { environment } from "./../../environments/environment";

//Import Http Client
import { HttpClient, HttpHeaders } from "@angular/common/http";

//Import Auth service
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MailService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  mail(to, subject, message): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    // const bearerToken = 'Bearer ' + accessToken
    // const headers = new HttpHeaders().set("Authorization", bearerToken);

    const endPoint = environment.apiURL + "/email";
    return this.http.post(
      endPoint,
      { to, subject, text: message },
      { headers: headers }
    );
  }
}
