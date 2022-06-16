import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })

export class httpService {
  isLoggedin: boolean = false;
    bearerToken: number
  constructor(private http: HttpClient) { }

  async login(username){
   await this.http.post<any>("http://localhost:3001/admin/login", {
        "email": "admin@admin.com",
        "password": "123123123"
    })
  }
}