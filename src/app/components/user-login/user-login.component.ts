import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../domain/user';
import { LoginResponse } from '../../domain/loginResponse';

import { UserService } from '../../services/user.service';
import { SecurityService } from '../../_services/security.service';


@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

    currentUser: User;
    loading = false;
    loginForm: FormGroup;
    returnUrl: string;
    role:string;
    submitted = false;
    
    constructor(
        
        public securityService: SecurityService,
        public userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.role = 'User';
    }
    
    get f() { return this.loginForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

    }

    login() {
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.securityService.login(this.login).subscribe((data: LoginResponse)=>{
        
            if (data.isAdmin) {
                this.router.navigate(['/poll-list'])
            } else {
                this.router.navigate(['/poll/vote/1'])
            }
        })
    }
}