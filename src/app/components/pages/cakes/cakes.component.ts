import { Component, OnInit } from '@angular/core';

//Import Activated Route
import {ActivatedRoute} from '@angular/router';
import { CakeService } from '../../../services/cake.service';
import { Cake } from '../../../models/Cake';

//Import Category service
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {

  categoryId: number;
  categoryBannerImage: string;
  cakes: Cake[];

  constructor(
    private route: ActivatedRoute,
    private cakeService: CakeService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    // this.categoryId = parseInt(this.route.snapshot.paramMap.get('categoryId'));


    this.route.queryParams.subscribe(params=>{
      this.categoryId = parseInt(params.categoryId);


      //Use cake service to get all cakes
      this.cakeService.getCakesByCategory(this.categoryId).subscribe(response=>{
        this.cakes = response.data.data;
        
        
      });
  
  
      this.categoryService.getCategory(this.categoryId).subscribe(category=>{
        this.categoryBannerImage = category.data.banner_image;
      })


    })

    


    



    this.route.queryParams.subscribe(params=>{
      
      


    }) 
    
    

    
  }

  



}
