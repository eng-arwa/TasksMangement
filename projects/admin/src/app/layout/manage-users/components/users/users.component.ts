import { Component, OnInit } from '@angular/core';
import { UsersService, statusUser } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any = [];
  page = 1;
  totalItems:any
  constructor(private service: UsersService,
    private toastr: ToastrService) {this.getuserdata() }
  
  ngOnInit(): void {
    this.getusers();
  }
  getuserdata() {
    this.service.users.subscribe((res: any) => {
      this.dataSource = res.data;
      this.totalItems=res.total
      
    })
  }
  
  getusers() {
    const model = {
      page: this.page,
      limit: 10,
      name:''
      
    }
    this.service.getalluser(model);
  }
  
 
  deleteuser(id: any, index: any) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error("you can't deleted this user becouse you have tasks")
      
    }
    else {
      this.service.deleteUsers(id).subscribe(res => {
        this.toastr.success("deleted user successfully");
        this.getusers();
      })
    }
  }
  changestatus(id: any,status:any, index: any) {
    const model: statusUser = {
      id,
      status
    }
    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error("you can't In-active this user becouse you have tasks")
      
    } else {
      this.service.changeStatusUsers(model).subscribe((res: any) => {
        this.toastr.success("status user updted successfully");
        this.getusers()
      })
    }

    
  }
  changepage(event: any) {
    this.page=event
  }
}
