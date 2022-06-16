import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpService } from '../service/httpservice';
import Employee from '../service/employee';
import Project from '../service/project';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Employee[]=[];
  form: FormGroup;
  isData:boolean = false;
  loggedin:boolean = false;
  employeeProject:{
    mapId:number, employee_id:number, project_id:number, project:Project
  }[]=[]
  isView:boolean = false;

  constructor(private http: HttpClient, private httpService: httpService) { }

  ngOnInit(): void {
    var bearer= 'Bearer ' + this.httpService.bearerToken
    this.loggedin=this.httpService.isLoggedin
    var myheaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':bearer
    });

    this.http.get<any>("http://localhost:3001/admin/viewEmployees", 
     { headers: myheaders }).subscribe(data => {
     this.employees=data
  })
  
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      phone: new FormControl(null, [Validators.minLength(10)]),
    });
  }

  
  onSubmit(){
    var bearer= 'Bearer ' + this.httpService.bearerToken
    
    var myheaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':bearer
    });
    var raw = { 
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
    }
    

    this.http.post<any>("http://localhost:3001/admin/addEmployee", 
    raw,  { headers: myheaders }).subscribe(data => {
      
      this.ngOnInit();
  })
  }

  employeeProjects(data){
    this.isView=true;
    var bearer= 'Bearer ' + this.httpService.bearerToken
    
    var myheaders = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':bearer
    });
    this.http.get<any>(`http://localhost:3001/admin/viewEmployeeProjects/${data.employee_id}`, 
     { headers: myheaders }).subscribe(data => {
       
      this.isData=true;
     this.employeeProject=data
     this.isView=true;
  })
  }
}
