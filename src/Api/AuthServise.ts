import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment'
import { UserModel } from 'src/app/Models/UserModel';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
    private jwtH: JwtHelperService = new JwtHelperService();
    public readonly apiString = environment.apiUrl;
    constructor(private router: Router,
        private httpClient: HttpClient
    ) { }


    //проверка оригинальности никнейма
    public CheckOriginNickname(newNick: string) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.apiString + '/api/User/cheknickname', `\"${newNick}\"`, { headers: myHeaders });
    }

    //логин
    public login(loginModel: UserModel) {
        return this.httpClient.post(this.apiString + '/api/User/login', loginModel);
    }

    //регистрацыя
    public register(registerModel: UserModel) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.httpClient.post(this.apiString + '/api/User/registration', registerModel);
    }

    //выход
    public logout() {
        localStorage.removeItem("token");
        this.router.navigateByUrl('/');
    }
    
    // проверка токена на валидность по времени
    public UserIsAuthorized(): boolean {
        if (null != localStorage.getItem("token")) {
            if (!this.jwtH.isTokenExpired(localStorage?.getItem("token"))) {
                return true;
            }
        } else {
            return false;
        }
    }
    public SetToken(token:string)
    {
        localStorage.setItem('token',token);
    }
    public GetToken(token:string)
    {
        return localStorage.getItem('token');
    }
}
