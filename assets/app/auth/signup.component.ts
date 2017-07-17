import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {

    }

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName);

        this.myForm.reset();

        this.authService.signup(user)
            .subscribe((success) => {
                this.router.navigate(['/message']);
            },
            (err) => {

            })
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [
                Validators.required,
            ]),
            password: new FormControl('', Validators.required)
        });
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}