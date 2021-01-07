import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

//Import Mail Service
import { NewsletterService } from "../../../services/newsletter.service";

import { environment } from "../../../../environments/environment";

//Import Jquery
import * as $ from 'jquery';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  model: any = {};

  name: string = '';
  email : string = '';
  phoneNo : string = '';
  
  
  constructor(private newsletterService: NewsletterService, private router: Router) { }

  ngOnInit() {

  }

  onClickSubmit(value) {
    console.log(value);

    $('#newsletter-modal').modal('toggle');

    
    

    // this.newsletterService
    //   .sendNewsletter(v)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.router.navigate(['/enquiry-success']);
    //   });
    // console.log(value);
  }

}
