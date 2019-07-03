import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { HttpHeaders } from "@angular/common/http"

const BASE_URL="http://localhost:8001";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  selected_event:{};

  getEvents(){
    return this.httpClient.get(`${BASE_URL}/events-listings`);
  }

  bookEvent(data){
    let headers = new HttpHeaders()
    headers.append("Content-type","application/json")
    return this.httpClient.post(`${BASE_URL}/book-event`,data,{headers:headers})
  }
}
