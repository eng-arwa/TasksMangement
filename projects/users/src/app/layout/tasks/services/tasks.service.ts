import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/users/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) {

  }
  
  gettaskuser(userid: any, tasksparams:any) {
    let params = new HttpParams();
    Object.entries(tasksparams).forEach(([key, value]: any) => {
      if (value) {
        
       params= params.append(key,value);
      }
      
    });
  

     return this.http.get(environment.baseurl+'tasks/user-tasks/'+userid , {params})
    
    
  }

  completeTasks(model:object) {
    return this.http.put(environment.baseurl+'tasks/complete',model)

  }
  TaskDetails(id:any) {
    return this.http.get(environment.baseurl+'tasks/task/'+id)

  }
}
