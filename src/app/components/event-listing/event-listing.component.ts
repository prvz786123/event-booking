import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service"

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.css']
})
export class EventListingComponent implements OnInit {

  constructor(private dataService : DataService) { }

  events:{}=[];
  filterValue="";
  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.dataService.getEvents().subscribe((res:{success:boolean,events:[]})=>{
      if(res.success){
        this.events=res.events;
      }
    })
  }

}
