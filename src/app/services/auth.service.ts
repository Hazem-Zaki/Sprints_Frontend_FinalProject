import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order, OrderDetail } from '../interfaces/order';
import { CartService } from 'src/app/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  order: Order = {} as Order;
  constructor(public cartService: CartService, private httpClient: HttpClient, private router: Router) {}

  login(data: any) {
    return this.httpClient.post(`${environment.APIUrl}users/login`, {
      email: data.username,
      password: data.password,
    });

  }
  placeorder(data: any) {
    // data['x-access-token'] = this.getToken();
    // console.log(data);
    this.order = this.cartService.order;
    // console.log(this.order.orderDetails);
    let orders = []
    let data2: any = {}
    for(let order of this.order.orderDetails){
      orders.push({
        "product_id": order.product._id,
        "price" : order.price,
        "qty" : order.quantity
      });
    }
    // console.log(orders);
    data2['order_details'] = orders;
    data2['total_price'] = this.order.getTotal();
    data2['sub_total_price'] = this.order.getSubTotal();
    data2['shipping_info'] = data;
    data2['user_id'] = "6346ac23bb862e01fe4b6535";
    data2["order_date"] = "2022-10-21"
    data2["shipping"] = this.order.getShipping();
    console.log(data2);
    return this.httpClient.post(`${environment.APIUrl}orders?token=${this.getToken()}`, data2);
  }

  register(data: any) {
    return this.httpClient.post(`${environment.APIUrl}users/register`, data);
  }

  saveLoginData(data: any) {
    localStorage.setItem('loginData', JSON.stringify(data));
  }

  loadLoginData(): any {
    return JSON.parse(localStorage.getItem('loginData') ?? '');
  }

  hasLoginData(): boolean {
    return localStorage.getItem('loginData') != null;
  }

  getToken(): string {
    return this.loadLoginData()?.token;
  }

  getName(): string {
    return this.loadLoginData()?.first_name;
  }
  getLastName(): string {
    return this.loadLoginData()?.last_name;
  }

  getEmail(): string{
    return this.loadLoginData()?.email;
  }

  logOut() {
    localStorage.removeItem('loginData');
    this.router.navigate(['']);
  }
}
