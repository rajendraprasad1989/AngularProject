import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  empDetail!: FormGroup;
  empObj:Employee=new Employee();
  empList : Employee[] = [];
  updateEmpid:any;
    constructor(private formbuilder:FormBuilder,private empService:EmployeeService){}

    ngOnInit(): void {
      this.getAllEmployee();
      this.empDetail=this.formbuilder.group({
         emloyeeid:[''],
         firstname:[''],
         lastname:[''],
         emailid:[''],
         phoneno:[''],
      });
    }
    addEmployee(empDetail:any)
    {
            return this.empService.postData(empDetail.value).subscribe((data:any)=>{
      console.log(data);
      this.resetForm();
      this.getAllEmployee();
      });
    }
resetForm()
{
  this.empDetail.reset();
}
  getAllEmployee() {
    this.empService.getData().subscribe((data:any)=> {
        this.empList = data;
    });
  }
  editEmployee(emp:Employee)
  {
     this.empDetail.controls['firstname'].setValue(emp.firstName);
     this.empDetail.controls['lastname'].setValue(emp.lastName);
     this.empDetail.controls['emailid'].setValue(emp.emailId);
     this.empDetail.controls['phoneno'].setValue(emp.phoneNo);
     this.updateEmpid=emp.employeeId;
  }
  updateEmployee()
  {
    this.empObj.employeeId=this.updateEmpid;
    this.empObj.firstName=this.empDetail.value.firstname;
    this.empObj.lastName=this.empDetail.value.lastname;
    this.empObj.emailId=this.empDetail.value.emailid;
    this.empObj.phoneNo=this.empDetail.value.phoneno;
    return this.empService.putData(this.empObj).subscribe((data:any)=>{
      console.log(data);
      this.resetForm();
      this.getAllEmployee();
      });
  }
  deleteEmployee(empId:any)
  {
     this.empService.deleteData(empId).subscribe((data:any)=>{
      console.log(data);
      alert('Employee deleted successfully');
      this.getAllEmployee();
     });
  }
}

/* console.log(this.empDetail);
      this.empObj.employeeId=this.empDetail.value;
      this.empObj.firstName=this.empDetail.value;
      this.empObj.lastName=this.empDetail.value;
      this.empObj.emailId=this.empDetail.value;
      this.empObj.phoneNo=this.empDetail.value;
      return this.empService.addEmployee(this.empObj).subscribe((data)=> {
        console.log(data);
      }); */