import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListingComponent } from './components/event-listing/event-listing.component';
import { EventListingBlockComponent } from './components/event-listing/event-listing-block/event-listing-block.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EventBookingComponent } from './components/event-booking/event-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListingComponent,
    EventListingBlockComponent,
    FilterPipe,
    EventBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
