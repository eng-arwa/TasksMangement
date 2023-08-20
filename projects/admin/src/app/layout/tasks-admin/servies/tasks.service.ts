import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getalltasks(filter: any) {
    let params = new HttpParams();


  
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params=params.append(key,value)
        }
       
      })    

 

    
    
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization',localStorage.getItem('token')!);
    return this.http.get(environment.baseurl+'tasks/all-tasks',{params})
    
  }

  createtasks(model: any) {
  
    return this.http.post(environment.baseurl+'tasks/add-task', model)
  }
  updatetask(model: any,id:any) {
  
    return this.http.put(environment.baseurl+`tasks/edit-task/${id}`, model)
  }

  deleteTasks(id: any) {
    
    return this.http.delete(environment.baseurl+`tasks/delete-task/${id}`)
  }
}
