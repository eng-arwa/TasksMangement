import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface statusUser{
  id: string,
  status:string
  }
@Injectable({
  providedIn: 'root'
})
  
export class UsersService {
  users = new BehaviorSubject({});

  constructor(private http :HttpClient) { }

  getallUsers(filter:any) {
  
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
        
          params = params.append(key, value)
        }
      })
    }
    return this.http.get(environment.baseurl + 'auth/users', { params })
    
  }
  deleteUsers(id:any) {
  
    return this.http.delete(environment.baseurl+'auth/user/'+id)
    
  }
  changeStatusUsers(model:statusUser) {
  
    return this.http.put(environment.baseurl+'auth/user-status/',model)
    
  }
  getalluser(model?:any) {
   

    this.getallUsers(model).subscribe((res: any) => {
      this.users.next({
    
        data: res.users,
        total: res.totalItems
     })
      
    })
  }
  
}
