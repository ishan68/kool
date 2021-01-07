import { Injectable } from '@angular/core';

//Import HttpClient
import {HttpClient} from '@angular/common/http';

//Import Observables and Behaviour Subject
import {Observable, BehaviorSubject} from 'rxjs';

//Import Map
import {map} from 'rxjs/operators';

//Import API URL
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) { 

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(){

    return this.currentUserSubject.value;

  }

  login(email, password){
    const endPoint = environment.apiURL + '/login';
    return this.http.post<any>(endPoint, {email, password})
      .pipe(map(user=>{

        //Store user details and jwt int local storage to keep user logged in
        localStorage.setItem('currentUser',JSON.stringify(user));
        return user;
      }));
  }

  logout(){
    //remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
