import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
let customers = JSON.parse(localStorage.getItem("customers")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      seedCustomer();
      switch (true) {
        case url.endsWith("/customer") && method === "GET":
          return getCustomers();
        case url.endsWith("/customer") && method === "POST":
          return addCustomer();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function addCustomer() {
      const customer = body;
      if (customers.find((x: { phoneNo: any }) => x.phoneNo === customer.phoneNo)) {
        return error('Customer already exist');
      }
      customers.push(customer);
      localStorage.setItem("customers", JSON.stringify(customers));
      return ok();
    }
    function seedCustomer() {
      const customer = {
        name: "Omoleye Oluseye",
        address: "Lagos",
        gender: "M",
        phoneNo: "08133223322"
      };

      if (customers.find(x => x.phoneNo === customer.phoneNo)) {
        return error('Customer "' + customer.phoneNo + '" is added');
      }
      customers.push(customer);
      localStorage.setItem("customers", JSON.stringify(customers));

      return ok();
    }
    // helper functions
    function getCustomers() {
      return ok(customers);
    }

    function ok(body?: {
      id: any;
      username: any;
      firstName: any;
      lastName: any;
      token: string;
    }) {
      return of(new HttpResponse({ status: 200, body }));
    }
    function error(message: string) {
      return throwError({ error: { message } });
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service 
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
