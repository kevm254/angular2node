import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class AuthService {
    hostUrl: string = 'https://guarded-woodland-59899.herokuapp.com';


    constructor(private http: Http, private errorService: ErrorService) {

    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new  Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.hostUrl + '/user', body, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers( { 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.hostUrl + '/user/signin', body,options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}