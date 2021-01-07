import { Component, OnInit } from "@angular/core";

import {Router} from '@angular/router';

//Import Mail Service
import { MailService } from "../../../services/mail.service";

import { environment } from "../../../../environments/environment";
//Import form controllers
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Import Cake Service
import {CakeService} from '../../../services/cake.service'


//Import Cake Model
import {Cake} from '../../../models/Cake';

@Component({
  selector: "app-cake-builder",
  templateUrl: "./cake-builder.component.html",
  styleUrls: ["./cake-builder.component.css"]
})
export class CakeBuilderComponent implements OnInit {

  cakeBuilder: FormGroup;
  model: any = {};
  // name: string = "";
  cakeId:number;
  cake: Cake;
  serving: number = null;
  cakeType: number = null;
  shape: number = null;
  sponge: number = null;
  cream: number = null;
  inside: number = null;
  egg: number = null;
  topping: number = null;
  candle: number = null;
  decoration: number = null;
  color: number = null;
  requirement: string = "";
  message: string = "";
  remark: string = "";
  quantity: number = 1;
  freshCreamFinalPrice:number = 0;
  final_price:number = 0;
  shapes = [
    {id: 0, name: "Square", price: 10, icon: "/assets/images/cakebuilder/shape/square-shape.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 1, name: "Round", price: 10, icon: "/assets/images/cakebuilder/shape/round-shape.png", img: "/assets/images/cakebuilder/round-shape-main.png"},
    {id: 2, name: "Heart", price: 20, icon: "/assets/images/cakebuilder/shape/heart-shape.png", img: "/assets/images/cakebuilder/heart-shape-main.png"},
    {id: 3, name: "Letters (A - Z)", price: 30, icon: "/assets/images/cakebuilder/shape/letter-shape.png", img: "/assets/images/cakebuilder/letter-shape-main.png"},
    {id: 4, name: "Numers (0 - 9)", price: 40, icon: "/assets/images/cakebuilder/shape/number-shape.png", img: "/assets/images/cakebuilder/number-shape-main.png"}
  ];
  cakeTypes = [
    {id: 0, name: "Fresh Cream", price: 0, icon: "/assets/images/cakebuilder/type/fresh-type.jpg", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 1, name: "Butter Cream", price: 0, icon: "/assets/images/cakebuilder/type/butter-type.jpg", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 2, name: "Icing", price: 0, icon: "/assets/images/cakebuilder/type/icing-type.jpg", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
  ];
  servingsData = [
    {id: 0, inchs: '6"', text: '5 - 6', price: 17, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 1, inchs: '8"', text: '10 - 15', price: 21, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 2, inchs: '10"', text: '15 - 20', price: 26, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 3, inchs: '12"', text: '20 - 30', price: 35, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 4, inchs: '14"', text: '30 - 40', price: 49, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 5, inchs: '16"', text: '50 - 60', price: 59, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 6, inchs: '18"', text: '70 - 75', price: 75, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 7, inchs: '20"', text: '80 - 90', price: 80, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 8, inchs: '16"x30"', text: '120 - 130', price: 100, icon: "/assets/images/cakebuilder/serving-icon.png"},
    {id: 9, inchs: '18"x32"', text: '130 - 140', price: 110, icon: "/assets/images/cakebuilder/serving-icon.png"}
  ];
  spongeData = [
    {id: 0, name: 'Vanila Sponge Cake', price: 0, icon: "/assets/images/cakebuilder/sponge/venilla-sponge.png"},
    {id: 1, name: 'Chocolate Sponge Cake', price: 5, icon: "/assets/images/cakebuilder/sponge/choclate-sponge.png"}
  ];
  creamData = [
    {id: 0, name: 'Vanilla Cream', price: 0, icon: "/assets/images/cakebuilder/cream/venilla-cream.png"},
    {id: 1, name: 'Chocolate Cream', price: 5, icon: "/assets/images/cakebuilder/cream/choclate-cream.png"}
  ];
  eggData = [
    {id: 0, name: 'With Eggs', price: 0, icon: "/assets/images/cakebuilder/with-egg.png"},
    {id: 1, name: 'Eggless', price: 0, icon: "/assets/images/cakebuilder/eggless.png"}
  ];
  insideData = [
    {id: 0, name: "White Fresh Cream", price: 0, icon: "/assets/images/cakebuilder/inside/cream-inside.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 1, name: "Mixed Fruit Jam", price: 0, icon: "/assets/images/cakebuilder/inside/jam-inside.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 2, name: "Cocktail Fruit", price: 1, icon: "/assets/images/cakebuilder/inside/cocktail-inside.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
  ];
  toppingData = [
    {id: 0, name: "Mixed Fruits", price: 0, icon: "/assets/images/cakebuilder/topping/fruit-topping.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 1, name: "Glazed Cherries", price: 0, icon: "/assets/images/cakebuilder/topping/cherry-topping.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 2, name: "Mixed Choc Decoration", price: 2, icon: "/assets/images/cakebuilder/topping/choclate-topping.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 3, name: "Specific Fresh Fruits", price: 2, icon: "/assets/images/cakebuilder/topping/fresh-fruit-topping.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
  ];
  decorData = [
    {id: 0, name: "Luxury Chocolate Vermicelli (Edible)", price: 0, icon: "/assets/images/cakebuilder/decoration/chocolate.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 1, name: "Satin Ribbon (Not Edible)", price: 0, icon: "/assets/images/cakebuilder/decoration/satin-ribbon.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"},
    {id: 2, name: "Hazelnuts (Edible)", price: 0, icon: "/assets/images/cakebuilder/decoration/hazelnuts.png", img: "/assets/images/cakebuilder/wizard-no-img.jpg"}
  ];
  colorsdata = [
    {id: 0, name: 'Blue', price: 0, icon: "/assets/images/cakebuilder/color/blue-color.png"},
    {id: 1, name: 'Dark Brown', price: 0, icon: "/assets/images/cakebuilder/color/dark-brown-color.png"},
    {id: 2, name: 'Gold', price: 1, icon: "/assets/images/cakebuilder/color/gold-color.png"},
    {id: 3, name: 'Light Green', price: 0, icon: "/assets/images/cakebuilder/color/light-green-color.png"},
    {id: 4, name: 'Green', price: 0, icon: "/assets/images/cakebuilder/color/green-color.png"},
    {id: 5, name: 'Grey', price: 1, icon: "/assets/images/cakebuilder/color/grey-color.png"},
    {id: 6, name: 'Light Brown', price: 0, icon: "/assets/images/cakebuilder/color/light-brown-color.png"},
    {id: 7, name: 'Orange', price: 0, icon: "/assets/images/cakebuilder/color/orange-color.png"},
    {id: 8, name: 'Pink', price: 0, icon: "/assets/images/cakebuilder/color/pink-color.png"},
    {id: 9, name: 'Purple', price: 0, icon: "/assets/images/cakebuilder/color/purple-color.png"},
    {id: 10, name: 'Red', price: 0, icon: "/assets/images/cakebuilder/color/red-color.png"},
    {id: 10, name: 'Silver', price: 1, icon: "/assets/images/cakebuilder/color/silver-color.png"},
    {id: 11, name: 'Sky', price: 0, icon: "/assets/images/cakebuilder/color/sky-color.png"},
    {id: 12, name: 'Yellow', price: 0, icon: "/assets/images/cakebuilder/color/yellow-color.png"},
    {id: 13, name: 'Violet', price: 0, icon: "/assets/images/cakebuilder/color/violet-color.png"},
    {id: 14, name: 'White', price: 0, icon: "/assets/images/cakebuilder/color/white-color.png"},
    {id: 15, name: 'Black', price: 0, icon: "/assets/images/cakebuilder/color/black-color.png"}
  ];
  candleData = [
    {id: 0, name: 'Pack of Regular 2 candles', price: 1.99, icon: "/assets/images/cakebuilder/candles.png"},
    {id: 1, name: 'Novelty Candles', price: 0, icon: "/assets/images/cakebuilder/number-candles.png"}
  ];
  selectedValue = null;
  // constructor(private mailService: MailService, private router: Router) {}
constructor(
    private router: Router,
    private mailService: MailService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.cakeBuilder = this.formBuilder.group({
      // remarks: [""],
      shape: ["", Validators.required],
      cakeType: ["", Validators.required],
      serving: ["", Validators.required],
      inside: ["", Validators.required],
      topping: ["", Validators.required],
      color: ["", Validators.required],
      cream: ["", Validators.required],
      sponge: ["", Validators.required],
      candle: ["", Validators.required],
      egg: ["", Validators.required],
      decoration: ["", Validators.required],
      // postalCode: [""],  
      // address: ["", [Validators.required]],
      // city: ["", [Validators.required]],
      deliveryDate: ["", [Validators.required]],
      // isAddressSame: [""],
      // billingName: [""],
      // billingPhone: [""],
      // billingPostalCode: [""],
      // billingAddress: [""],
      // billingCity: [""]
    });
    this.cakeId = 0;
  }

  //On dropdown click 
  onDropdownClick(name) {
    let list_value = document.getElementsByClassName('list-value')[0] as HTMLElement;
    list_value.style.border = '1px solid #ced4da';
    let list_options = document.getElementsByClassName('list-options')[0] as HTMLElement;
    list_options.style.display = 'none';
    document.getElementById(name+'-options').style.display = 'block';
    document.getElementById(name+'-value').style.border = '1px solid red';
  }
  //On shape dropdown click

  onSelectClick(value, name) {
    let data = [];
    switch(name){
      case "shape":{
        this.selectupdate(name, value, this.shapes);
        if (this.shape!=null) {
          this.final_price = this.final_price - this.shapes[this.shape].price;
        }
        this.shape = value;
        // this.cakeTypes.splice(1, 1);
        break; 
      }
      case "cakeType":{
        this.selectupdate(name, value, this.cakeTypes);
        if (this.cakeType!=null) {
          this.final_price = this.final_price - this.cakeTypes[value].price;
        }
        this.cakeType = value;
        break; 
      }
      case "serving":{
        this.selectupdate(name, value, this.servingsData);
        if (this.serving!=null) {
          this.final_price = this.final_price - this.servingsData[this.serving].price;
        }
        this.serving = value;
        break; 
      }
      case "sponge":{
        this.selectupdate(name, value, this.spongeData);
        if (this.sponge!=null) {
          this.final_price = this.final_price - this.spongeData[this.sponge].price;
        }
        this.sponge = value;
        break; 
      }
      case "egg":{
        data = this.eggData;
        this.selectupdate(name, value, data);
        this.egg = value;
        break; 
      }
      case "cream":{
        this.selectupdate(name, value, this.creamData);
        if (this.cream!=null) {
          this.final_price = this.final_price - this.creamData[this.cream].price;
        }
        this.cream = value;
        break; 
      }
      case "color":{
        this.selectupdate(name, value, this.colorsdata);
        if (this.color!=null) {
          this.final_price = this.final_price - this.colorsdata[this.color].price;
        }
        this.color = value;
        break; 
      }
      default: {
        break; 
      }

    }
  }
  selectupdate(name, value, data){

    document.getElementById(name+'-options').style.display = 'none';
    document.getElementById(name+'-value').style.border = '1px solid #ced4da';
    var selectHTML = '';

    selectHTML += '<div class="selectedValue" ';
    if(name == 'serving'){
    selectHTML += 'style="display:flex;text-align:center;width:100%;justify-content:space-between;align-items:center;"';
    }
    selectHTML += '>';
    if(typeof data[value].icon !== 'undefined') {
      selectHTML += '<img width="40px" src="'+data[value].icon+'" />';
    }
    if(typeof data[value].inchs !== 'undefined') {
      selectHTML += '<span class="size"> '+data[value].inchs+'</span>';
    }
    if(typeof data[value].text !== 'undefined') {
      selectHTML += '<span class="portion"> '+data[value].text+'<br/>Portion<font>*</font></span>';
    }
    if(typeof data[value].name !== 'undefined') {
      selectHTML += '<span> '+data[value].name+'</span>';
    }

    if(typeof data[value].price !== 'undefined' && data[value].price > 0) {
      if(name == 'serving'){
        selectHTML += '<span class="price"> £'+data[value].price+'</span>';
      }
      this.final_price = this.final_price + data[value].price;
    }
    document.getElementById(name+'-value').innerHTML = selectHTML;
    document.getElementById(name).setAttribute('value', value);
  }
  //
  onRadioClick(value, name) {
    let el = document.getElementById(name+'_'+value);
    let arr = el.className.split(" ");
    if (arr.includes('active')== true) {
      el.classList.remove('active');
    }else{
      el.classList.add('active');
    }
    console.log(arr);
    document.getElementById(name).setAttribute('value', value);
    var data = [];
    switch(name){
      case "inside":{
        data = this.insideData;
        if (this.inside!=null) {
          this.final_price = this.final_price - this.insideData[this.inside].price;
        }
        this.inside = value;
        break; 
      }
      case "topping":{
        data = this.toppingData;
        if (this.topping!=null) {
          this.final_price = this.final_price - this.toppingData[this.topping].price;
        }
        this.topping = value;
        break; 
      }
      case "candle":{
        data = this.candleData;
        if (this.candle!=null) {
          this.final_price = this.final_price - this.candleData[this.candle].price;
        }
        this.candle = value;
        break; 
      }
      default: {
        break; 
      }

    }
    if(typeof data[value].price !== 'undefined' && data[value].price > 0) {
      // selectHTML += '<span class="price"> £'+data[value].price+'</span>';
      this.final_price = this.final_price + data[value].price;
    }
  }
   //Function to calculate total price of fresh cream cakes
 calcTotalPrice(cakeBasePrice, servingPriceFreshCream, dietaryRequirementPriceFreshCream, spongePriceFreshCream, fillingPriceFreshCream) {
  var total = this.cake.final_price + servingPriceFreshCream + dietaryRequirementPriceFreshCream + spongePriceFreshCream + fillingPriceFreshCream;

  this.freshCreamFinalPrice = total;
 }
  onSubmit() {
    var cartArray = JSON.parse(localStorage.getItem('cartArray'));
    var cart = {};
    cart = {
        cakeId: 0,
        serving: this.servingsData[this.serving].text,
        shape: this.shapes[this.shape].name,
        type: this.cakeTypes[this.cakeType].name,
        sponge: this.spongeData[this.sponge].name,
        egg: this.eggData[this.egg].name,
        cream: this.creamData[this.cream].name,
        filling: this.insideData[this.inside].name,
        topping: this.toppingData[this.topping].name,
        message: this.message,
        writingColor: this.colorsdata[this.color].name,
        price: this.final_price,
        quantity: this.quantity,
        bakery: 1
      }
    if(!cartArray){
      cartArray = [];
    }
    cartArray.push(cart);
    
    localStorage.setItem('cartArray',JSON.stringify(cartArray));
    
    this.router.navigate(['/cart']);

    // this.mailService
    //   .mail(environment.cakeBuilderEmail, "Cake Builder Enquiry", message)
    //   .subscribe(response => {
    //     console.log(response);
    //     this.router.navigate(['/enquiry-success']);
    //   });
    // console.log(value);
  }
}
