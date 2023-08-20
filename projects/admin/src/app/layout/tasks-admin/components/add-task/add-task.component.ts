import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../servies/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newtaskform!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public datatask: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private servicestasks: TasksService,
    private toastr: ToastrService,
   private servicesuser:UsersService
  ) {this.getuserdata(); }
  ngOnInit(): void {
    this.createformnewtasks();
    
  }
  formdata = "";
  filename: string = "";
  users:any = [
  

  
  ]


  createformnewtasks() {
    this.newtaskform = this.fb.group({
      title:[this.datatask?.title || '',[Validators.required]],
      userId:[this.datatask?.userId._id || '',[Validators.required]],
      image:[this.datatask?.image || '',[Validators.required]],
      description:[this.datatask?.description || '',[Validators.required]],
      deadline:[this.datatask ? new Date(this.datatask?.deadline.split('-').reverse().join('-')).toISOString() : '',[Validators.required]],
    })

    this.formdata = this.newtaskform.value
  }
  selectImage(event:any) {
    this.filename = event.target.value;
    this.newtaskform.get('image')?.setValue(event.target.files[0]);
  }
  createtask() {
    console.log(this.newtaskform.value);
    let model = this.prepeareformdata();
    // formmodel.append('title',this.newtaskform.value['title'])
    // formmodel.append('userId',this.newtaskform.value['userId'])
    // formmodel.append('image',this.newtaskform.value['image'])
    // formmodel.append('description',this.newtaskform.value['description'])
    // formmodel.append('deadline',this.newtaskform.value['deadline'])
    this.servicestasks.createtasks(model).subscribe(res => {
      this.toastr.success('done add  new task successfully');
      model.delete;
      this.newtaskform.reset()
      this.dialog.close(true);

    }, error => {
      console.log(error)
      model.delete;
      this.newtaskform.reset()
    })
  }

  prepeareformdata() {
    
    let formdata = new FormData();

    Object.entries(this.newtaskform.value).forEach(([key, value]:[any,any])=> {
      formdata.append(key,value)
    })

    return formdata;
  }

  updatetask() {
    let model = this.prepeareformdata();
    this.servicestasks.updatetask(model,this.datatask?._id).subscribe(res => {
    
      this.toastr.success('updated task successfully');
      this.closedialog();
    })
  }
  closedialog() {
    let haschange = false;
    Object.keys(this.formdata).forEach((item:any) => {
      if (this.formdata[item] !== this.newtaskform.value[item]) {
        haschange=true
      }
    })

    if (haschange) {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '550px',
        
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
        if (result) {
          result=true
        }
      })
      
      
    } else {
      this.dialog.close(true);
      this.newtaskform.reset()
      
    }
  }
  getuserdata() {
    this.servicesuser.users.subscribe((res: any) => {
      this.users =this.mappingData(res.data);
    
      
    })
  }
  mappingData(data:any[]) {
    return data?.map(item => {
      return {
        name: item.username,
        id:item._id
      }
      
    })
    
    
  }
}
