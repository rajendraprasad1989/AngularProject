import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
baseURL='http://localhost:63951/api/Employee/';
  constructor(private http:HttpClient) { 
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
  }
}
  updateEmployee(id:any,emp:Employee):Observable<Employee>
  {
     return this.http.put<Employee>(this.baseURL + 'UpdateEmployeeData/'+id,emp);
  }
  getData()
    {
      return this.http.get(this.baseURL + 'GetEmployeesData');
    }
    postData(formData:any){  
      return this.http.post(this.baseURL + 'AddEmployeeData/',formData);  
    }  
    
    putData(formData: any){  
      return this.http.put(this.baseURL + 'UpdateEmployeeData/',formData);  
    }  
    deleteData(id:any){  
      return this.http.delete(this.baseURL + 'DeleteEmployeeData/'+id);  
    }  
}
