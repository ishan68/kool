import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { Order } from "../models/Order";
import { environment } from "./../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class OrderService {
  ordersURL: string = environment.apiURL + "/orders";
  worldPayURL: string = environment.worldPay.URL;
  worldPayData = {
    testMode: environment.worldPay.testMode,
    instId: 1374094,
    cartId: "",
    amount: 0,
    currency: "GBP",
    MC_callback: "https://koolcakes.uk/#/order-success/",
    MC_returnurl: "https://koolcakes.uk/#/order-success/",
    MC_cancelurl: "https://koolcakes.uk"
  };

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.http.post<Order>(this.ordersURL, order, httpOptions);
  }

  makePayment(id: string, amount: number): void {
    this.worldPayData = {
      ...this.worldPayData,
      MC_callback: "https://koolcakes.uk/#/order-success/" + id,
      MC_returnurl: "https://koolcakes.uk/#/order-success/" + id,
      cartId: id,
      amount
    };

    const paymentForm = document.createElement("form");
    paymentForm.action = this.worldPayURL;
    paymentForm.method = "POST";

    for (const key in this.worldPayData) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = this.worldPayData[key];
      paymentForm.appendChild(input);
    }

    console.log("submitting form");
    document.body.appendChild(paymentForm);
    paymentForm.submit();
  }
}
