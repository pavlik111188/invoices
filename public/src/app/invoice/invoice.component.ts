import { Component, OnInit, NgModule } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private mainService: MainService) { }

  products: any = [];
  productsLength: any;
  invoices: any = [];
  invoicesNewArr: Object = {};
  invoicesLength: any;
  customers: any = [];
  customersLength: any;
  invoiceNew: Object = {};
  discountNew: number = 0;
  total: number = 0;
  customerId: number;
  isError: boolean = false;
  isSuccess: Boolean = false;
  private Interval: any;


  ngOnInit() {
    this.getInvoices();
    this.getCustomers();
    this.getProducts();
  }

  getCustomers() {
    this.mainService.getCustomers().then(response => {
      if (response.status === 'Success') {
        this.customers = response.customers;
        this.customersLength = response.customers.length;
      }
    });
  }

  getInvoices() {
    this.mainService.getInvoices().then(response => {
      if (response.status === 'Success') {
        this.invoices = response.invoices;
        this.invoicesNewArr = response.invoices;
        this.invoicesLength = response.invoices.length;
        for (let i = 0; i <= this.invoicesLength; i ++) {
          if (this.invoices[i]) {
            this.mainService.getCustomerById(this.invoices[i].customer_id).then(response => {
              if (response.status === 'Success') {
                this.invoicesNewArr[i]['customer_name'] = response.customer.name;
              }
            });
          }
          /*if (this.invoices[i]) {
            console.log(this.invoices[i]);
            this.mainService.removeInvoice(this.invoices[i]['id']).then(response => {
            });
          }*/
        }
      }

    });
  }

  addInvoice () {
    if (this.customerId) {
      this.invoiceNew['discount'] = this.discountNew;
      this.invoiceNew['total'] = this.total;
      this.invoiceNew['customer_id'] = this.customerId;
      console.log(this.invoiceNew);
      this.mainService.addInvoice(this.invoiceNew).then(response => {
        if (response.status === 'Success') {
          this.isSuccess = true;
          this.discountNew = 0;
          this.total = 0;
          delete this.customerId;
          this.getInvoices();
          this.Interval = setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
        }
      });
    }
    else {
      this.isError = true;
      this.Interval = setTimeout(() => {
        this.isError = false;
      }, 3000);
    }
  }

  getProducts() {
    this.mainService.getProducts().then(response => {
      if (response.status === 'Success') {
        this.products = response.products;
        this.productsLength = response.products.length;
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.Interval);
  }

}
