import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { CustomerService } from "../../../services/customer.service";
import { Customer } from "../../../models/customer";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.css"]
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  isLoading = false;
  isSubmitted = false;
  form: FormGroup;
  submitted = false;
  errorMsg = "";
  private ngUnsubscribe = new Subject();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      address: ["", Validators.required],

      phoneNo: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      gender: ["", Validators.required]
    });
  }
  get formData() {
    return this.form.value;
  }
  get f(): any {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category = {
      name: this.formData.name,
      address: this.formData.address,
      gender: this.formData.gender,
      phoneNo: this.formData.phoneNo
    } as Customer;
    this.customerService
      .addCustomer(category)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          this.isSubmitted = false;
          this.router.navigate(["/"]);
        },
        err => {
          this.isSubmitted = false;
          this.errorMsg = err.error.message;
        }
      );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
