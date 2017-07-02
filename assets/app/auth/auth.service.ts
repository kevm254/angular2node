import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
    constructor(private http: Http) {

    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new  Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/user', body, options)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers( { 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/user/signin', body,options)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }
}