import {Component, OnInit} from '@angular/core';
import {APIResponse} from '../api.response';

import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.settings';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    projects: APIResponse = {
        status: false,
        data: [],
        message: ''
    };

    constructor(private http: HttpClient) {
    }

    // if data is loading or http is in-progress
    isLoading = false;

    getProjects() {
        this.isLoading = true;
        this.http.get<APIResponse>(AppConfig.BASEURL + '/project/listing').subscribe(results => {
            this.isLoading = false;
            if (results.status) {
                this.projects = results;
            }
        }, err => {
            console.log('Error occured on project listing API.');
        });
    }

    deletePid = -1;

    setDeletePid(pid) {
        this.deletePid = pid;
    }

    error = false;
    message = {
        class: 'alert-danger',
        message: ''
    };

    deleteProject() {
        this.http.delete(AppConfig.BASEURL + 'delete/project/' + this.deletePid).subscribe(
            result => {
                this.getProjects();
                this.error = true;
                this.message = {
                    class: 'alert-success',
                    message: "Project deleted successfully."
                };
            },
            error => {
                this.error = true;
                this.message = {
                    class: 'alert-danger',
                    message: "Sorry, we can't delete user right now!"
                };
            }
        );
    }

    ngOnInit() {
        this.getProjects();
    }

}
