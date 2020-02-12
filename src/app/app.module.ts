import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListCustomerComponent } from './pages/customer/list-customer/list-customer.component';
import { fakeBackendProvider } from './fakebackend';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule ,AppRoutingModule],
  declarations: [ AppComponent, ListCustomerComponent ],
   providers: [ fakeBackendProvider],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
