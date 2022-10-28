import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  obj: object = {};
  @Input() product: Product = {} as Product;
  products: Array<Product> = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit(): void {
    console.log(this.id);
    this.productService.getProductsByid(this.id).subscribe((data: any) => {
       this.product = data.data;
    });

    console.log(this.product)
    console.log(`${environment.APIUrl}products/${this.id}`);

    
  }

  runJqueryForCarousel() {
    $('.related-carousel').owlCarousel({
      loop: true,
      margin: 29,
      nav: false,
      autoplay: true,
      smartSpeed: 1000,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
      },
    });
  }
}
