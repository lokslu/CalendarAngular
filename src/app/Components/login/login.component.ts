import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Api/AuthServise';
import { ValidateService } from 'src/app/Services/ValidateService';
import { UserModel } from "src/app/Models/UserModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public FormLogin: FormGroup;

  public logined: Boolean;//индикатор ожидания ответа от сервера
  public error: Boolean;//индикатор ошибки от сертвера 

  constructor(private fb: FormBuilder,
    private AuthS: AuthService,
    private router: Router,
    private validate: ValidateService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.FormLogin = this.fb.group({
      "Nickname": [null, [Validators.required]],
      "Password": [null, [Validators.required,
       
      ]]
    })
  }

  onSubmit() {
    this.logined = true;
    this.error = false;
    let loginModel = new UserModel();
    loginModel.Nickname = this.FormLogin.value.Nickname;
    loginModel.Password = this.FormLogin.value.Password;
    this.AuthS.login(loginModel).subscribe((data: any) => {

      localStorage.setItem('token', data.token);
      this.logined = false;
      this.router.navigateByUrl("/");
      // this.router.navigateByUrl('/user');
    }, (error) => {

      console.log(error);
      this.logined = false;
      this.error = true;

    });
  }

}
