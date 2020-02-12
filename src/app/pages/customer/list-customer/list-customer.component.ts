import { Component, OnInit, OnDestroy } from "@angular/core";
import { Customer } from "../../../models/customer";
import { CustomerService } from "../../../services/customer.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "app-list-customer",
  templateUrl: "./list-customer.component.html",
  styleUrls: ["./list-customer.component.css"]
})
export class ListCustomerComponent implements OnInit, OnDestroy {
  customers: Customer[];
  isLoading = true;
  private ngUnsubscribe = new Subject();
  constructor(private customerService: CustomerService) {}
  ngOnInit() {
    this.customerService
      .getCustomers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          this.customers = data;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
  }
  identify(index, item) {
    return item.phoneNo;
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
