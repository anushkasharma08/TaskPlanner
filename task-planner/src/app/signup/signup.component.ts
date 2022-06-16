import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { httpService } from '../service/httpservice';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  bearer:string;
  myheaders :HttpHeaders;
  loggedin:boolean = false;

  signupForm: FormGroup;
  constructor(private http: HttpClient, private httpService: httpService, private router: Router,
    ) { 
      
      this.bearer= 'Bearer ' + this.httpService.bearerToken
      
     this.myheaders = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':this.bearer
      });
    }

  ngOnInit(): void {
    this.loggedin=this.httpService.isLoggedin
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(){
    var raw = { 
      email: this.signupForm.value.email,password:this.signupForm.value.password
    }
    this.http.post<any>("http://localhost:3001/admin/newAdmin", 
      raw,  { headers: this.myheaders }).subscribe(data => {
        console.log(data)
    })

}
}
