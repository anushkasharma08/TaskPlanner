import { Component } from '@angular/core';
import { httpService } from './service/httpservice';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  bearer:string;
  myheaders :HttpHeaders;
  constructor(private http: HttpClient, private httpService: httpService
    ) { }

logout(){
  this.bearer= 'Bearer ' + this.httpService.bearerToken
      
  this.myheaders = new HttpHeaders({
     'Content-Type':'application/json',
     'Authorization':this.bearer
   });
   console.log(this.bearer);
   this.http.post<any>("http://localhost:3001/admin/logout", 
       { headers: this.myheaders }).subscribe(data => {
        console.log(data)
    })
}
}
