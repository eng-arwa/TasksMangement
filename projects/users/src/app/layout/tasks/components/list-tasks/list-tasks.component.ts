import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
  { status: 'Complete', title: 'Neon', description: "20.179", deadLineDate: "10-11-2022" },
  {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
  { status:'Complete' , title: 'Neon', description: "20.179", deadLineDate:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any =[];
  tasksFilter!: FormGroup;
  page = 1;
  totaltasks!:number;
  selectedsatuts:string = "In-Progress";
  userData: any;
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Progress" , id:2},
  ]
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private servicestasks: TasksService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.createform();
    this.getDataUser();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  getAllTasks() {
    let params = {
      page:this.page,
      limit: 10,
      status:"In-Progress"
    }
    this.servicestasks.gettaskuser(this.userData.userId,params).subscribe((res: any) => {
      this.dataSource = res.tasks;
      this.totaltasks=res.totalItems
      console.log(res)
    }, error => {
      console.log('this error respone',error)
    })

  }
  getDataUser() {
    if (localStorage.getItem('token')) {
      
      let token = JSON.stringify(localStorage.getItem('token'));
      this.userData = JSON.parse(window.atob(token.split('.')[1]));
      console.log(this.userData)
    }
  }
  changepage(event: any) {
    this.page=event
  }

  complete(element:any) {
    const model = {
      id:element._id
    }
    this.servicestasks.completeTasks(model).subscribe(res => {
      this.getAllTasks();
      this.toastr.success("this tasks completed")
    })
  }
}
