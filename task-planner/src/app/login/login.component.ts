import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { httpService } from '../service/httpservice';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private http: HttpClient, private httpService: httpService, private router: Router,
    ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(){
    this.http.post<any>("http://localhost:3001/admin/login", 
    { email: this.signupForm.value.email,password:this.signupForm.value.password})
    .subscribe(data => {
      this.httpService.bearerToken=data.bearertoken
      this.httpService.isLoggedin=true;
      
      this.router.navigate(['/employee']);
  })

}
}
