import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  SlideOptions = { 
    items: 4,
    dots: true,
    nav: true,
    margin:20,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout:3000,
    lazyLoad: true,
    responsive:{
      0:{
          items:2
      },
      600:{
          items:3
      },
      1000:{
          items:4
      }
    }
  }; 

  constructor() { }

  ngOnInit() {
  }

}
