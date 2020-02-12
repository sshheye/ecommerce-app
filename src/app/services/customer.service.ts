import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import{config} from '../enviroment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomers() {
    return this.http.get<Customer[]>(`${config.apiUrl}/customer`);
  }
  addCustomer(customer: Customer) {
    return this.http.post(`${config.apiUrl}/customer`, customer);
  }

}
