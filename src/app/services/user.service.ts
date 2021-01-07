import { Injectable } from '@angular/core';

//Import Http Client
import {HttpClient} from '@angular/common/http';

//Import API URL
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user){
    const endPoint = environment.apiURL + '/users';
    return this.http.post(endPoint, user);
  }
}
