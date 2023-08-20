import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private loginservices: LoginService,
    private toastr: ToastrService,
    private router: Router
    
  ) { }
  formlogin!: FormGroup;
  ngOnInit(): void {

    this.createform();

  }
  createform() {
    this.formlogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role:['user']
    })
  }
  login() {
    if (this.formlogin.valid) {
      this.loginservices.login(this.formlogin.value).subscribe((res:any) => {
        localStorage.setItem('token',`Bearer ${res.token}`)
        this.toastr.success('تم تسجيل الدخول بنجاح');
        this.router.navigate(['/tasks'])
      }, error => {
        // this.toastr.error("الايميل او الباسوورد غير صحيح")
      });
    }
    else {
      this.toastr.error('يرجى ملئ الحقول ')
  }
    
  }
}
