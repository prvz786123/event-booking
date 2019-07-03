import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../services/data.service"
import { Router } from "@angular/router"
@Component({
  selector: 'app-event-listing-block',
  templateUrl: './event-listing-block.component.html',
  styleUrls: ['./event-listing-block.component.css']
})
export class EventListingBlockComponent implements OnInit {

  @Input() event;

  constructor(
    private dataService:DataService,
    private router:Router ) { }

  ngOnInit() {
    console.log(this.event)
  }

  onBookEvent(){
    this.dataService.selected_event=this.event;
    this.router.navigate(['/book-event'])
  }

}
