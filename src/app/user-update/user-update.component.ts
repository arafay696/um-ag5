import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../app.settings';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';

import {APIResponse} from '../api.response';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {
    }

    // User Obj
    user = {
        id: -1,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        cpassword: '',
        isAdmin: false
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
        this.getUserByID();
    }

    // Get All Users
    getUserByID() {
        const id = +this.activeRoute.snapshot.paramMap.get('id');
        this.http.get<APIResponse>(AppConfig.BASEURL + 'user/detail/' + id).subscribe(result => {
                result.data = [result.data];
                if (result.status) {
                    this.user = {
                        id: result.data[0].id,
                        firstName: result.data[0].fname,
                        lastName: result.data[0].lname,
                        userName: result.data[0].username,
                        email: result.data[0].email,
                        password: '',
                        cpassword: '',
                        isAdmin: (result.data[0].role == 1) ? true : false
                    }
                }
            },
            err => {
                console.log("Error occured.")
            }
        );
    }

}
