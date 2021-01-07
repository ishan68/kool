import { Component, OnInit } from '@angular/core';

//Import Search Service
import {SearchService} from 'src/app/services/search.service';
import { Cake } from 'src/app/models/Cake';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  model: any = {};


  searchString : string = 'ddd';

  

  searchedCakes : Cake[];

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {

  }


  onSubmit() {

    var searchKeyword = this.model.searchString;

    this.searchedCakes = null;
      this.model.searchString = '';
   

    if(searchKeyword.length>0) {
      
      this.router.navigate(['/search'], { queryParams: { s: searchKeyword } });
    }

  
     
    
  }


  onKeyUp(event) {

    var searchKeyword = this.model.searchString;  

    if(searchKeyword.length > 0) {
      this.removeSearchString();
      this.searchService.getCakes(searchKeyword).subscribe(cakes=>{
        console.log("Cakes data");
        console.log(cakes.data);
        this.searchedCakes = cakes.data.data;
      })
    }else {
      this.searchedCakes = null;
    }
}


  


  removeSearchString() {
    this.searchedCakes = null;
    this.searchString = '';

  }

}
