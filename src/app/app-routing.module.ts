import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListingComponent } from "../app/components/event-listing/event-listing.component";
import { EventBookingComponent } from "../app/components/event-booking/event-booking.component";

const routes: Routes = [
  {path:"",component:EventListingComponent},
  {path:"book-event", component:EventBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
