import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class MainService {

  private domain = 'http://localhost:8000/api/';
  private customersUrl = 'customers';
  private productsUrl = 'products';
  private invoicesUrl = 'invoices';

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

    addInvoice(values: Object): Promise<any> {
        const url = `${this.domain}${this.invoicesUrl}`;
        return this.http.post(url, values)
            .toPromise()
            .then((response : Response) => {
                    return {status: 'Success'};
            })
            .catch(this.handleError);
    }

    removeInvoice(id: Number): Promise<any> {
        const url = `${this.domain}${this.invoicesUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then((response : Response) => {
                return {status: 'Success'};
            })
            .catch(this.handleError);
    }

    getCustomerById(id: Number): Promise<any> {
        const url = `${this.domain}${this.customersUrl}/${id}`;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .toPromise()
            .then(
                (response: Response) => {
                    let customer = response.json();
                    if (customer) {
                        return {status: 'Success', customer: customer};
                    }
                },
                error => {
                    return {
                        status: 'Error',
                        error: JSON.parse(Object(error)._body).message
                    }
                }
            )
            .catch(this.handleError);
    }

    getCustomers(): Promise<any> {
        const url = `${this.domain}${this.customersUrl}`;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .toPromise()
            .then(
                (response: Response) => {
                    let customers = response.json();
                    if (customers) {
                        return {status: 'Success', customers: customers};
                    }
                },
                error => {
                    return {
                        status: 'Error',
                        error: JSON.parse(Object(error)._body).message
                    }
                }
            )
            .catch(this.handleError);
    }

  getInvoices(): Promise<any> {
    const url = `${this.domain}${this.invoicesUrl}`;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
        .toPromise()
        .then(
            (response: Response) => {
              let invoices = response.json();
              if (invoices) {
                return {status: 'Success', invoices: invoices};
              }
            },
            error => {
              return {
                status: 'Error',
                error: JSON.parse(Object(error)._body).message
              };
            }
        )
        .catch(this.handleError);
  }

    getProducts(): Promise<any> {
        const url = `${this.domain}${this.productsUrl}`;
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .toPromise()
            .then(
                (response: Response) => {
                    let products = response.json();
                    if (products) {
                        return {status: 'Success', products: products};
                    }
                },
                error => {
                    return {
                        status: 'Error',
                        error: JSON.parse(Object(error)._body).message
                    };
                }
            )
            .catch(this.handleError);
    }

}
