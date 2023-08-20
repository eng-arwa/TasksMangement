import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from '../../servies/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UsersService } from '../../../manage-users/services/users.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', user: "1.0079", deadLineDate:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', user: "4.0026", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', user: "6.941", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', user: "9.0122", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Boron', user: "10.811", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', user: "12.010", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', user: "14.006", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', user: "15.999", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', user: "18.998", deadLineDate:"10-11-2022" },
  { status:'Complete' , title: 'Neon', user: "20.179", deadLineDate:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
 
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user', 'deadline', 'status', 'actions'];
  expandedElement: PeriodicElement | null | undefined;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = [
    
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Progress" , id:2},
  ]
  idtimeout: any;
  page: any = 1;
  total: any;
  filter: any = {
    page: this.page,
    limit:5
  };
  constructor(public dialog: MatDialog, private fb: FormBuilder,
    private tasksservices: TasksService,
    private servicesuser:UsersService,
    private toastr: ToastrService,

  
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.getUser();
    this.getuserdata();
  }

  createform() {
   
  }

  getAllTasks() {
    this.tasksservices.getalltasks(this.filter).subscribe((res: any) => {
      console.log(res);
      this.dataSource = this.mappingtasks(res.tasks);
      this.total = res.totalItems;

    })

  }
  addTask() {
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width: '750px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.getAllTasks()
        }
      })
  }

  mappingtasks(data: []) {
    
   const newtasksdata=data.map((data:any) => {
     return {
        // this is first slove 
  
        // title: data.title,
        // deadline: data.deadline,
        // status: data.status,
       
      //  or
       ...data,
        user: data.userId.username,
        
      }
   })
    return newtasksdata;
    
  }
  deletetask(id: any) {
    this.tasksservices.deleteTasks(id).subscribe(res => {
      this.toastr.success("deleted Task");
      this.getAllTasks();
    })
  }
  updatTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllTasks()
      }
    })
    
  }
  search(event: any) {
    this.page = 1;
    this.filter['page']=1
    this.filter['keyword'] = event.value;
    clearTimeout(this.idtimeout);
     this.idtimeout = setTimeout(() => {
      this.getAllTasks();
      
    }, 2000);
  }
  filterByuser(event: any) {
    this.page = 1;
    this.filter['page']=1
    this.filter['userId'] = event.value;
    this.getAllTasks();

    
  }
  filterBystatus(event: any) {
    this.page = 1;
    this.filter['page']=1
    this.filter['status'] = event.value;
    this.getAllTasks();
    
  }

  filterBydata(event: any, typedDate: string) {
    this.page = 1;
    this.filter['page']=1
    this.filter[typedDate] = event.value;
    if (typedDate == "toDate") {
      
      this.getAllTasks();
    }
    
    
  }
  changepage(event: any) {
    this.page = event;
    this.filter['page']=event
    this.getAllTasks();
  }

  getUser() {
    this.servicesuser.getalluser();

  }
  getuserdata() {
    this.servicesuser.users.subscribe((res: any) => {
      this.users =this.mappingData(res.data);
      this.total=res.total
      
    })
  }
  mappingData(data:any[]) {
    return data.map(item => {
      return {
        name: item.username,
        id:item._id
      }
      
    })
    
    
  }
  
}
