import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListCustomerComponent } from "./pages/customer/list-customer/list-customer.component";

const routes: Routes = [
  {
    path: "add-customer",
    loadChildren: () =>
      import("./pages/customer/add-customer/add-customer.module").then(
        m => m.AddCustomerModule
      )
  },
  {
    path: "",
    component: ListCustomerComponent
  },
   {
    path: "**",
    component: ListCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
