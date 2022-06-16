import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpService } from '../service/httpservice';
import Project from '../service/project';
import Employee from '../service/employee';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects:Project[]=[];
  taskData={employee_id:null,project_id:null}
  employees:Employee[]=[];
  projectEmployee:{
    mapId:number, employee_id:number, project_id:number, employee:Employee
  }[]=[]
  enabledEmployee: boolean = false;
  enabledTask: boolean = false;
  enabledAsign: boolean = false;
  projectid: number;
  bearer:string;
  myheaders :HttpHeaders;

    form: FormGroup;
    isLoading: boolean = false;
    submitted = false;
    loggedin: boolean = false;
  
    constructor(private http: HttpClient, private httpService: httpService) { 
      this.bearer= 'Bearer ' + this.httpService.bearerToken
      
     this.myheaders = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':this.bearer
      });
    }
  
    ngOnInit(): void {
      this.loggedin=this.httpService.isLoggedin
      this.http.get<any>("http://localhost:3001/admin/viewProjects", 
       { headers: this.myheaders }).subscribe(data => {
       this.projects=data
    })
    
  
  
      this.form = new FormGroup({
        project_name: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required])
      });
    }
  
    
    onSubmit(){
     
      var raw = { 
        project_name: this.form.value.project_name,
        description: this.form.value.description
      }
      
  
      this.http.post<any>("http://localhost:3001/admin/createProject", 
      raw,  { headers: this.myheaders }).subscribe(data => {
        console.log(data)
        this.ngOnInit();
    })
    }

    getEmployee(data){
      this.enabledEmployee=true;

      this.http.get<any>("http://localhost:3001/admin/viewEmployees", 
     { headers: this.myheaders }).subscribe(data => {
     this.employees=data
     })
     this.projectid=data.project_id;
    }

    asignEmployee(employee){

      var raw={
        employee_id:employee.employee_id,
        project_id:this.projectid
      }

      this.http.post<any>("http://localhost:3001/admin/assignEmployee", 
      raw,  { headers: this.myheaders }).subscribe(data => {
        console.log(data)
    })
    }

    getProjectEmployee(data){
      this.enabledTask=true;
      this.http.get<any>(`http://localhost:3001/admin/viewProjectEmployees/${data.project_id}`, 
      { headers: this.myheaders }).subscribe(data => {
      this.projectEmployee=data;
      console.log(this.projectEmployee)
      })
    }

    asignTask(i){
      this.enabledAsign=true;
      this.enabledTask=false;
      this.taskData=i;
      console.log(this.taskData)
    }
    asign(){
      var raw = { 
        employee_id: this.taskData.employee_id,
        project_id: this.taskData.project_id,
        title: this.form.value.project_name,
        description: this.form.value.description,
        status:"pending"
      }
      
      this.http.post<any>("http://localhost:3001/admin/assignTask", 
      raw,  { headers: this.myheaders }).subscribe(data => {
        console.log(data)
    })
    }
    logout(){
       this.http.post<any>("http://localhost:3001/admin/logout", 
           { headers: this.myheaders }).subscribe(data => {
            console.log(data)
        })
    }
}
