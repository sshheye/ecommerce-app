import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerRoutingRoutes } from './add-customer-routing.module';
import { AddCustomerComponent } from './add-customer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,AddCustomerRoutingRoutes,ReactiveFormsModule
  ],
  declarations: [AddCustomerComponent]
})
export class AddCustomerModule { }