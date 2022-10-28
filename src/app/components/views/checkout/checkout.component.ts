import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  order: Order = {} as Order;
  submitForm = new FormGroup(
    {
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile_number: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip_code: new FormControl('', [Validators.required]),
  }
  );
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.order = this.cartService.order;
  }
  PlaceOrder() {
    // console.log(this.submitForm.value.first_name);
    // console.log(this.submitForm.value.last_name);
    // console.log(this.submitForm.value.city);
    // console.log(this.submitForm.value);
    this.authService.placeorder(this.submitForm.value).subscribe(
      (data: any) => {
        // this.authService.saveLoginData(data);
        // console.log(data);
      },
      (error: any) => {
        alert('Error');
      }
    );
    // console.log(event);
  }

}
