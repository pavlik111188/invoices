import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private mainService: MainService) { }

  products: any = [];
  productsLength: any;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.mainService.getProducts().then(response => {
      if (response.status === 'Success') {
        this.products = response.products;
        this.productsLength = response.products.length;
      }
    });
  }

}
