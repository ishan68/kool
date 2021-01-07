import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import { Cake } from 'src/app/models/Cake';

//Import search service
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKeyword:string;
  cakes: Cake[];

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params=>{
      this.searchKeyword = params['s'];

      console.log(this.searchKeyword);

      if(this.searchKeyword.length > 0) {
        this.searchService.getCakes(this.searchKeyword).subscribe(cakes=>{
          this.cakes = cakes.data.cakes;
        })
      }else {
        this.cakes = null;
      }


    }) 




  }

}
