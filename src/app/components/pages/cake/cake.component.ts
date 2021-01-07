import { Component, OnInit } from '@angular/core';


//Import Router
import {ActivatedRoute, Router} from '@angular/router';


//Import Cake Service
import {CakeService} from '../../../services/cake.service'


//Import Cake Model
import {Cake} from '../../../models/Cake';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  model: any = {
    quantity:1
  };
  
  serving:string = '';
  shape: string = '';
  type: string = '';
  sponge:string = '';
  filling:string = '';
  requirement:string = '';
  message:string = '';
  writingColor: string = '';
  quantity: number = 1;
  final_price:number;


 

  isCakeFreshCream:boolean = false;


  cakeId:number;
  cake: Cake;

  


   //Serving Price for fresh cream
   servingPriceFreshCream: number = 0;
   dietaryRequirementPriceFreshCream: number = 0;
   spongePriceFreshCream: number = 0;
   fillingPriceFreshCream: number = 0;

   freshCreamFinalPrice:number = 0;



   //For Icing
   servingPriceIcing: number = 0;
   spongePriceIcing: number = 0;
   fillingPriceIcing: number = 0;

   icingFinalPrice: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private cakeService: CakeService) { }

  ngOnInit() {

    //Get cake Id from URL
    this.route.queryParams.subscribe(params=>{
      if(!params['id']){
        
      }else{

       this.cakeId = parseInt(params['id']);
        

        //Get cake from cake service
        this.cakeService.getCake(this.cakeId).subscribe(cake=>{
          this.cake = cake.data;

         
        


          //Check if cake is fresh cream
          if(this.cake.category==129) {
            console.log("Cake is freshcream");
            this.isCakeFreshCream = true;
            this.freshCreamFinalPrice = this.cake.final_price;
            
          }else {
            console.log("Cake is icing");
            console.log(this.cake.category);
            this.icingFinalPrice = this.cake.final_price;
          }
          
        })
      }
      
    })

    
  }

  onClickSubmit(formData) {

    console.log(formData);

  

    var cartArray = JSON.parse(localStorage.getItem('cartArray'));

    var cart = {};

    if(this.isCakeFreshCream) {
      cart = {
        cakeId: this.cakeId,
        serving: this.serving,
        shape: this.model.shape,
        type: this.model.type,
        sponge: this.model.sponge,
        filling: this.model.filling,
        requirement: this.model.requirements,
        message: this.model.message,
        writingColor: this.model.writingColor,
        price: this.freshCreamFinalPrice,
        quantity: this.model.quantity,
        bakery: this.model.bakery
      }
    }else {
      cart = {
        cakeId: this.cakeId,
        serving: this.serving,
        shape: this.model.shape,
        type: this.model.type,
        sponge: this.model.sponge,
        filling: this.model.filling,
        requirement: this.model.requirements,
        message: this.model.message,
        writingColor: this.model.writingColor,
        price: this.icingFinalPrice,
        quantity: this.model.quantity,
        bakery: this.model.bakery
      }
    }


    
    
    if(!cartArray){
      cartArray = [];
    }
    cartArray.push(cart);
    
    localStorage.setItem('cartArray',JSON.stringify(cartArray));
    
    this.router.navigate(['/cart']);
  
 }


 //Function to calculate total price of fresh cream cakes
 calcTotalPrice(cakeBasePrice, servingPriceFreshCream, dietaryRequirementPriceFreshCream, spongePriceFreshCream, fillingPriceFreshCream) {
  var total = this.cake.final_price + servingPriceFreshCream + dietaryRequirementPriceFreshCream + spongePriceFreshCream + fillingPriceFreshCream;

  this.freshCreamFinalPrice = total;
 }


 //Function to calculate total price of icing cakes
 calcIcingTotalPrice(cakeBasePrice, servingPriceIcing, spongePriceIcing, fillingPriceIcing) {
  var total = this.cake.final_price + servingPriceIcing + spongePriceIcing + fillingPriceIcing;

  this.icingFinalPrice = total;
 }


 //On serving change for fresh cream cakes
  onServingChange(value) {
    if(value=='5-6') {
      this.servingPriceFreshCream = -5;
      this.calcTotalPrice(this.cake.final_price, -5, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='10-15') {
      this.servingPriceFreshCream = 0;
      this.calcTotalPrice(this.cake.final_price, 0, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='15-20') {
      this.servingPriceFreshCream = 5;
      this.calcTotalPrice(this.cake.final_price, 5, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='20-30') {
      this.servingPriceFreshCream = 15;
      this.calcTotalPrice(this.cake.final_price, 15, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='30-40') {
      this.servingPriceFreshCream = 30;
      this.calcTotalPrice(this.cake.final_price, 30, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='50-60') {
      this.servingPriceFreshCream = 45;
      this.calcTotalPrice(this.cake.final_price, 45, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else if(value=='70-80') {
      this.servingPriceFreshCream = 60;
      this.calcTotalPrice(this.cake.final_price, 60, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }
    
  }

  //On Serving change for Icing
  onIcingServingChange(value) {
    console.log("changnig serving");
    if(value=='10-15') {
      this.servingPriceIcing = 0;
      this.calcIcingTotalPrice(this.cake.final_price, 0, this.spongePriceIcing, this.fillingPriceIcing);
    } else if(value=="15-20") {
      this.servingPriceIcing = 12;
      this.calcIcingTotalPrice(this.cake.final_price, 12, this.spongePriceIcing, this.fillingPriceIcing);
    } else if(value=="20-30") {
      this.servingPriceIcing = 25;
      this.calcIcingTotalPrice(this.cake.final_price, 25, this.spongePriceIcing, this.fillingPriceIcing);
    } else if(value=="35-45") {
      this.servingPriceIcing = 40;
      this.calcIcingTotalPrice(this.cake.final_price, 40, this.spongePriceIcing, this.fillingPriceIcing);
    }
  }


  //On dietary requirement change for fresh cream
  onDietaryRequirementChange(value) {
    if(value=='Gluten Free' || value=='Vegan') {
     this.dietaryRequirementPriceFreshCream = 0.75 * this.freshCreamFinalPrice;
      this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, 0.75 * this.freshCreamFinalPrice, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }else {
      this.dietaryRequirementPriceFreshCream = 0;
      this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, 0, this.spongePriceFreshCream, this.fillingPriceFreshCream);
    }
  }


  //On sponge change for fresh cream
  onSpongeChange(value) {
    if(this.fillingPriceFreshCream!==5) {
      if(value=='Chocolate') {
        this.spongePriceFreshCream = 5;
        this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, this.dietaryRequirementPriceFreshCream, 5, this.fillingPriceFreshCream);
      }else {
        this.spongePriceFreshCream = 0;
        this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, this.dietaryRequirementPriceFreshCream, 0, this.fillingPriceFreshCream);

      }
    }
  }


  //On sponge change for fresh cream
  onIcingSpongeChange(value) {
    if(this.fillingPriceIcing!==5) {
      if(value=='Chocolate') {
        this.spongePriceFreshCream = 5;
        this.calcIcingTotalPrice(this.cake.final_price, this.servingPriceIcing, 5, this.fillingPriceIcing);
      }else {
        this.spongePriceIcing = 0;
        this.calcIcingTotalPrice(this.cake.final_price, this.servingPriceIcing, 0, this.fillingPriceIcing);

      }
    }
  }


  //On filling change 
  onFillingChange(value) {
    if(this.spongePriceFreshCream!==5) {
      if(value == 'Chocolate Fresh Cream' || value == 'Chocolate Fresh Cream + Jam') {
        this.fillingPriceFreshCream = 5;
        this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, 5);

      }else {
        this.fillingPriceFreshCream = 0;
        this.calcTotalPrice(this.cake.final_price, this.servingPriceFreshCream, this.dietaryRequirementPriceFreshCream, this.spongePriceFreshCream, 0);
      }
    }
    
  }


  onIcingFillingChange(value) {
    if(this.spongePriceIcing!==5) {
      if(value == 'Chocolate Butter Cream' || value == 'Chocolate Butter Cream + Jam') {
        this.fillingPriceIcing = 5;
        this.calcIcingTotalPrice(this.cake.final_price, this.servingPriceIcing, this.spongePriceIcing, 5);

      }else {
        this.fillingPriceIcing = 0;
        this.calcIcingTotalPrice(this.cake.final_price, this.servingPriceIcing, this.spongePriceIcing, 0);
      }
    }
    
  }

  //On serving dropdown click
  onServingDropdownClick(event) {
    var id = event.target.id;
    if(id=='serving-value') {
      document.getElementById('serving-options').style.display = 'block';
      document.getElementById('serving-value').style.border = '1px solid red';
    }else{
      document.getElementById('serving-options').style.display = 'none';
      document.getElementById('serving-value').style.border = '1px solid #ced4da';
    }

    
  }

  //Freshcream
  onServiceClick(servings) {
    console.log(servings);
    this.serving = servings;
    document.getElementById('serving-options').style.display = 'none';
    document.getElementById('serving-value').style.border = '1px solid #ced4da';

    document.getElementById('serving-value').textContent = servings + ' Portions';

    document.getElementById('servings').setAttribute('value', servings);


    this.onServingChange(servings);

  }



  //Freshcream
  onIcingServiceClick(servings) {
    console.log(servings);
    this.serving = servings;
    document.getElementById('serving-options').style.display = 'none';
    document.getElementById('serving-value').style.border = '1px solid #ced4da';

    document.getElementById('serving-value').textContent = servings + ' Portions';

    document.getElementById('servings').setAttribute('value', servings);


    this.onIcingServingChange(servings);

  }








}
