import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

//Import Form
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

//Import first
import {first} from 'rxjs/operators';

//Import Auth service
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { 

    //redirect to home if already logged in
    if(this.authService.currentUserValue){
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    // show success message on registration
    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }

  }


  //convinience getter for easy access to form fields
  get f(){ return this.loginForm.controls;}

  onSubmit(){

    this.submitted = true;

    // reset alerts on submit
    this.error = null;
    this.success = null;

    //stop here if the form is invalid
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;

    this.authService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data =>{
        this.router.navigate([this.returnUrl]);
      },
      error =>{
        this.error = error;
        this.loading = false;
      }
    )
  }

}
