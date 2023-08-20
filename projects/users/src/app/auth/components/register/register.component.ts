import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { register } from '../../model/DoTS';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private fb: FormBuilder,
  private  servicerigestr: LoginService
  ) {
    
  }
  ngOnInit(): void {
    this.createform();
  }

  formRegistr!: FormGroup;
  createform() {
    this.formRegistr = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]],
    },{validators:this.checkpassword})
  }
  checkpassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
     let password = group.value['password'];
     let confirmpassword = group.value['confirmpassword'];
    
    return password === confirmpassword ? null : {nomatched:'nomatched'} ;
    
  }
  createaccount() {
    const model: register = {
      email: this.formRegistr.value['email'],
      password: this.formRegistr.value['password'],
      username: this.formRegistr.value['username'],
      role:'user'
    }
    if (this.formRegistr.valid) {
      this.servicerigestr.register(model).subscribe(res => {
        
      });
    }
    
  }
}
