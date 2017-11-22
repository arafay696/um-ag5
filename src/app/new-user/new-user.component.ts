import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../app.settings';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';

import {APIResponse} from '../api.response';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router) {
    }

    // User Obj
    user = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        cpassword: '',
        isAdmin: 0
    };


    submitted = false;
    error = false;
    message = {
        class: 'alert-danger',
        message: ''
    };


    // Save User in Db
    saveUser() {
        this.submitted = true;
        let params = new URLSearchParams();
        this.user.isAdmin = (this.user.isAdmin) ? 1 : 0;
        for (let key in this.user) {
            params.set(key, this.user[key])
        }

        this.http.post<APIResponse>(AppConfig.BASEURL + 'save/user', params.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).subscribe(result => {
            if (result.status) {
                this.router.navigateByUrl('user/listing');
            } else {
                this.error = true;
                this.message = {
                    class: 'alert-danger',
                    message: result.message
                };
                window.scrollTo(0, 0);
            }
        }, err => {
            this.error = true;
            this.message = {
                class: 'alert-danger',
                message: "Sorry, we cannot save user right now."
            };
            window.scrollTo(0, 0);
        });
    }

    ngOnInit() {
    }

}
