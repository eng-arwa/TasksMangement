import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['./tasks-details.component.scss']
})
export class TasksDetailsComponent implements OnInit {

  task_id: any;
  taskdetails: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
         private  toastr:ToastrService,
             private service:TasksService ) {
    this.route.paramMap.subscribe((res: any) => {
      this.task_id = res.params['id']
      
    }
    )
  }
  ngOnInit(): void {
    this.service.TaskDetails(this.task_id).subscribe((res: any) => {
      console.log(res)
     this.taskdetails=res.tasks
   })
  }
  complete(element:any) {
    const model = {
      id:this.task_id
    }

    this.service.completeTasks(model).subscribe(res => {
      this.router.navigate(['/tasks'])
      this.toastr.success("this tasks completed")
    })
  }
  
}
