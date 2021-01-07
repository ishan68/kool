import { Component, OnInit } from '@angular/core';

//Import Line Item
import {LineItem} from './../../../models/LineItem'



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isCartEmpty:boolean;
  lineItems : LineItem[];
  constructor() { }

  ngOnInit() {
    this.lineItems = JSON.parse(localStorage.getItem('cartArray'));
    if(this.lineItems.length>0){
      this.isCartEmpty = false;
    }else{
      this.isCartEmpty = true;
    }
  }

  remove(lineItemId){
  
    var cartItems = JSON.parse(localStorage.getItem('cartArray'));

    var updateItems = this.removeByAttr(cartItems, 'cakeId', lineItemId);

    this.lineItems = updateItems

    localStorage.setItem('cartArray', JSON.stringify(updateItems));

    if(this.lineItems.length==0){
      this.isCartEmpty = true;
      
    }
    
  }




  //Function to remove line item from array
  removeByAttr(arr, attr, value){
    var i = arr.length;
      while(i--){
        if( arr[i] 
            && arr[i].hasOwnProperty(attr) 
            && (arguments.length > 2 && arr[i][attr] === value ) ){ 
  
            arr.splice(i,1);
  
        }
      }
      return arr;
  }

   


    






  

}
