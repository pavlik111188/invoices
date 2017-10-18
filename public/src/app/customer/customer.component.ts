import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private mainService: MainService) { }

  customers: any = [];
  customersLength: any;

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.mainService.getCustomers().then(response => {
      if (response.status === 'Success') {
        this.customers = response.customers;
        this.customersLength = response.customers.length;
      }
    });
  }

}
