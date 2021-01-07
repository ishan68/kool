import { Component, OnInit } from '@angular/core';

import {Category} from '../../../models/Category';

import {ActivatedRoute} from '@angular/router';

import {CategoryService} from './../../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  parentCategoryId:string;
  categories: Category[];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params=>{
      if(params['parentCategoryId']){
        this.parentCategoryId = params['parentCategoryId'];
        this.categoryService.getChildCategories(this.parentCategoryId).subscribe(categories=>{
          this.categories = categories.data;
        })
      }else{
        this.categoryService.getRootCategories().subscribe(categories=>{
          console.log(categories);
          this.categories = categories.data;
          // console.log(response);
        })
      }
    })

    
  }

  

}
