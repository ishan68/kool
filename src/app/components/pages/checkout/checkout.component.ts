import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

//Import Line items
import { LineItem } from "src/app/models/LineItem";

//Import form controllers
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Import Auth Service
import { AuthService } from "src/app/services/auth.service";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {


  minDate : string = '';

  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  totalPrice: number;

  remarks : string = '';

  lineItems: LineItem[];

  isAddressSame: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    var date = new Date();
    var todayDate = date.getFullYear() + '-' + '0'+(date.getMonth()+1) +  '-' + date.getDate();

    this.minDate = todayDate;
    




    this.checkoutForm = this.formBuilder.group({
      remarks: [""],
      name: ["", Validators.required],
      phone: ["", Validators.required],
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

    var lineItems = JSON.parse(localStorage.getItem("cartArray"));
    this.lineItems = lineItems;
    var totalPrice = 0;
    lineItems.forEach(element => {
      totalPrice = totalPrice + element.price * element.quantity;
    });
    this.totalPrice = totalPrice;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }

    this.loading = true;
    // console.log(this.checkoutForm.value);
    const deliveryInfo = this.checkoutForm.value;

    const orderDetails: Order = {
      remarks: deliveryInfo.remarks,
      line_items: this.lineItems.map(lineItem => {
        return {
          item_id: lineItem.cakeId,
          quantity: lineItem.quantity,
          amount: lineItem.price,
          servings: lineItem.serving,
          shape: lineItem.shape,
          filling: lineItem.filling,
          dietary_requirements: lineItem.requirement,
          type: lineItem.type,
          sponge: lineItem.sponge,
          message: lineItem.message,
          writing_color: lineItem.writingColor,
          bakery: lineItem.bakery
        };
      }),
      delivery_date: new Date(deliveryInfo.deliveryDate),
      delivery_address: {
        name: deliveryInfo.name,
        phone: deliveryInfo.phone,
        // address1: deliveryInfo.address,
        // city: deliveryInfo.city,
        // pincode: deliveryInfo.postalCode,
        country: "UK"
      }
    };

    // if (!deliveryInfo.isAddressSame) {
    //   orderDetails.billingAddress = {
    //     name: deliveryInfo.billingName,
    //     phone: deliveryInfo.billingPhone,
    //     address1: deliveryInfo.billingAddress,
    //     city: deliveryInfo.billingCity,
    //     pincode: deliveryInfo.billingPostalCode,
    //     country: "UK"
    //   };
    // }

    // console.log("Before sending order");

    // console.log(orderDetails)

   


    this.orderService.createOrder(orderDetails).subscribe(res => {
			const order: Order = res.data
			// console.log("orderDetails:",  order)
      window.localStorage.removeItem("cartArray");
      this.orderService.makePayment(order.id.toString(), order.final_amount);
    });
  }
}
