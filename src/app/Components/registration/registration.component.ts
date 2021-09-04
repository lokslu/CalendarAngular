import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/Api/AuthServise';
import { UserModel } from 'src/app/Models/UserModel';
import { ValidateService } from 'src/app/Services/ValidateService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  public FormRegistration: FormGroup;
  public registered: Boolean;//индикатор ожидания ответа от сервера
  public error: Boolean;//индикатор ошибки от сертвера 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AuthS: AuthService,
    private validate: ValidateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.FormRegistration = this.fb.group({
      "Nickname": [null, [Validators.required,
      this.validate.customPatternValid({ pattern: '(?=.*[^!@#$%^&*\\\n])[0-9a-zA-Zа-яёА-ЯЁ]{1,}', msg: "Спец символи запрещены" })],
        [this.validate.C_O_Nickname.bind(this)]],

      "Password": [null, [Validators.required,
      this.validate.customPatternValid({ pattern: '(?=.*[^!@#$%^&*\\\n])[0-9a-zA-Zа-яёА-ЯЁ]{6,}', msg: "Спец символи запрещены" }),
      this.validate.customPatternValid({ pattern: '(?=.*[A-Z])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}', msg: "Пароль должен иметь хотя бы одну букву в вышем регистре" }),
      this.validate.customPatternValid({ pattern: '(?=.*[0-9])[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&*\s ]{6,}', msg: "Пароль должен иметь хотя бы одну цыфру" }),
      this.validate.customPatternValid({ pattern: '(?=.*[a-z])[0-9a-zA-Z!@#$%^&*\s ]{6,}', msg: "Обезательно нужны латинские символы" }),
      this.validate.customPatternValid({ pattern: '[0-9a-zA-Zа-яёА-ЯЁ!@#$%^&\'\"*/;:\s ]{6,}', msg: "Пароль должен иметь хотя бы 6 символов" })
      ]]
    })
  }

  onSubmit() {

    this.registered = true;
    this.error = false;
    let registerModel = new UserModel();
    registerModel.Nickname = this.FormRegistration.value.Nickname;
    registerModel.Password = this.FormRegistration.value.Password;

    this.AuthS.register(registerModel).subscribe((data: any) => {

      this.AuthS.SetToken(data.token);
      this.router.navigateByUrl("/");
      this.registered = false;
      // this.router.navigateByUrl('/user');
    }, (error) => {
      if (error.status == 401) {
        this.snackBar.open("Password or username is incorrect, please try again", "okey", {
          duration: 6000,
        });
      }
      else {
        this.snackBar.open("Something went wrong, please try again", "okey", {
          duration: 6000,

        });
      }
      this.initForm();

      console.log(error);
      this.registered = false;
      this.error = true;

    });
  }
}
