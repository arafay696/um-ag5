import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {APIResponse} from '../api.response';
import {AppConfig} from '../app.settings';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

    users: APIResponse = {
        status: false,
        data: [],
        message: ''
    };

    constructor(private http: HttpClient) {
    }

    // if data is loading or http is in-progress
    isLoading = false;

    // Get All Users
    getUsers() {
        this.isLoading = true;
        this.http.get<APIResponse>(AppConfig.BASEURL + 'user/listing').subscribe(result => {
                this.isLoading = false;
                if (result.status) {
                    this.users = result;
                }
            },
            err => {
                this.isLoading = false;
                console.log("Error occured.")
            }
        );

    }

    ngOnInit(): void {
        this.getUsers();
    }

    deleteUid: number = -1;

    showDeleteConfirmation(uid) {
        this.deleteUid = uid;
    }

    error = false;
    message = {
        class: 'alert-danger',
        message: ''
    };

    // Delete User
    deleteUser(uid) {
        this.http.delete<APIResponse>(AppConfig.BASEURL + 'delete/user/' + uid).subscribe(result => {
            console.log(result);
            if (result.status) {
                this.getUsers();
                this.error = true;
                this.message = {
                    class: 'alert-success',
                    message: "User deleted successfully."
                };
            } else {
                this.error = true;
                this.message = {
                    class: 'alert-danger',
                    message: "Sorry, we can't delete user right now!"
                };
            }
        }, err => {
            this.error = true;
            this.message = {
                class: 'alert-danger',
                message: "Sorry, we can't delete user right now!"
            };
        });
    }

}
