import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../domain/user';
import { LoginResponse } from '../../domain/loginResponse';
import { LoginDTO } from '../../domain/login';
import { TOKEN_NAME, PARAM_USUARIO, REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME } from '../../domain/constants';
import { UserService } from '../../services/user.service';
import { SecurityService } from '../../services/security.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

    currentUser: User;
    loginDTO: LoginDTO;
    loading = false;
    loginForm: FormGroup;
    returnUrl: string;
    role: string;
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
        this.loginDTO = this.loginForm.getRawValue();
        this.securityService.login(this.loginDTO).subscribe((data: LoginResponse) => {
            if (data.status == 'OK') {
                sessionStorage.setItem(TOKEN_NAME, data.idToken);
                sessionStorage.setItem(REFRESH_TOKEN_NAME, data.refreshToken);
                sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);

                if (data.admin) {
                    this.router.navigate(['/poll-list'])
                } else {
                    this.router.navigate(['/poll/vote/1'])
                }
            } else {
                this.loginForm.reset();
            }
        })
    }

}