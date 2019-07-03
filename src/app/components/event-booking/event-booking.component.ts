import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.css']
})
export class EventBookingComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private router:Router
    ) { }

  event=this.dataService.selected_event;
  name="";
  email="";
  phone="";
  seats:any="";
  name_of_attendee=[];
  booking_success:boolean=false;
  ngOnInit() {
    this.booking_success=false;
    if(!this.event){
      this.router.navigate(['/'])
    }
  }

  onSeatsSelect(){
    this.name_of_attendee=[];
    this.seats=Number(this.seats)
    this.validateSeats();
    if(!this.validation_flags.seats){
      for(let i=0; i<this.seats-1; i++){
        this.name_of_attendee[i]="";
        this.validation_flags.attendee[i]=false;
      }
    }
  }

  
  validation_flags={
    name:false,
    email:false,
    phone:false,
    seats:false,
    attendee:[]
  }
  validation_errors={
    name:"",
    email:"",
    phone:"",
    seats:"",
  }

  resetValidationSetting(){
    this.validation_flags={
      name:false,
      email:false,
      phone:false,
      seats:false,
      attendee:[]
    }
    this.validation_errors={
      name:"",
      email:"",
      phone:"",
      seats:"",
    }
  }

  validateName(){
    let flag=false;
    this.validation_flags.name=false;
    this.validation_errors.name="";
    if(this.name){
      let regExp= /^[a-zA-Z\s]*$/;  
      if(this.name.match(regExp)){
        flag=true
      }else{
        this.validation_errors['name']="Only letters and spaces are allowed";
        this.validation_flags.name=true;  
        flag=false;
      }
    }else{
      this.validation_errors['name']="Please enter your name";
      this.validation_flags.name=true;
      flag=false;
    }
    return flag;  
  }
  validateEmail(){
    let flag;
    this.validation_flags.email=false;
    this.validation_errors.email="";
    if(this.email){
      let regExp= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
      if(this.email.match(regExp)){
        flag=true
      }else{
        this.validation_errors['email']="Invalid Email";
        this.validation_flags.email=true;  
        flag=false;
      }
    }else{
      this.validation_errors['email']="Please enter your email";
      this.validation_flags.email=true;
      flag=false;
    }
    return flag;
  }
  

  validatePhone(){
    let flag=false;
    this.validation_flags.phone=false;
    this.validation_errors.phone="";
    if(this.phone.match(/^[0-9]{10}$/)){
      flag=true
    }else{
      this.validation_errors['phone']="Please enter 10 digit phone number";
      this.validation_flags.phone=true;  
      flag=false;
    }
    return flag
  }

  validateSeats(){
    let flag=false;
    this.validation_flags.seats=false;
    this.validation_errors.seats="";
    if(this.seats<=0){
      this.validation_errors.seats="Please select number of seats"
      this.validation_flags.seats=true;
      flag=false;
    }else if(this.seats>this.event['seat_availability']){
      this.validation_errors.seats="Number of seats selected is more than available seats";
      this.validation_flags.seats=true;
      flag=false;
    }else{
      flag=true;
    }
    return flag;
  }

  validateAttendee(){
    let flag=false;
    for(let i=0; i<this.name_of_attendee.length; i++){
      if(this.name_of_attendee[i]===""){
        this.validation_flags['attendee'][i]=true;
      }else{
        this.validation_flags['attendee'][i]=false;
      }
    }
    if(this.validation_flags['attendee'].indexOf(true)!=-1){
      flag=false;
    }else{
      flag=true;
    }
    return flag;

  }

  validateAll(){
    let flag=false;
    this.resetValidationSetting();
    //Name Validation
    flag=this.validateName();
    //Email_Validation
    flag=this.validateEmail();
    //Phone Validation
    flag=this.validatePhone(); 
    //Seat Validation
    flag=this.validateSeats()
    console.log(this.validateSeats());
    //Attendee
    if(this.seats>1){
      flag=this.validateAttendee();
    }
    return flag;
  }
  onSubmit(){
    console.log(this.validateAll())
    if(this.validateAll()){
      let booking_details={
        uid:this.event['uid'],
        name:this.name,
        email:this.email,
        phone:this.phone,
        seats:this.seats
      }
      if(this.seats>1){
        booking_details['attendees']=this.name_of_attendee;
      }

      this.dataService.bookEvent(booking_details).subscribe(res=>{
        if(res['success']){
          this.booking_success=true;
          this.event['seat_availability']-=Number(this.seats);
        }
      })
    }else{
      console.log("failure")
    }
  }

  resetForm(){
    this.name="";
    this.email="";
    this.phone="";
    this.seats=0;
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
