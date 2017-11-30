import {Component, OnInit} from '@angular/core';
import {DatepickerOptions} from 'ng2-datepicker';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import {Router, ActivatedRoute} from '@angular/router';

import {APIResponse} from '../api.response';
import {AppConfig} from '../app.settings';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

    options: DatepickerOptions = {
        minYear: 1970,
        maxYear: new Date().getFullYear(),
        displayFormat: 'YYYY-MM-DD',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    };

    //Project New Object
    project = {
        id: -1,
        name: '',
        description: '',
        status: '',
        attachment: '',
        logo: 'user-default.png',
        date_started: new Date(),
        date_ended: new Date(),
        date_onboard: new Date(),
        website: '',
        staging_link: '',
        repo_link: '',
        technologies: ''
    };

    constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe, private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.getProjectByID();
    }

    submitted = false;
    error = false;
    message = {
        class: 'alert-danger',
        message: ''
    };

    saveProject() {
        this.submitted = true;
        let params = new URLSearchParams();
        let projectObj = {
            id: this.project.id,
            name: this.project.name,
            description: this.project.description,
            status: this.project.status,
            attachment: '',
            logo: 'user-default.png',
            date_started: this.datePipe.transform(this.project.date_started.toUTCString(), 'yyyy-MM-dd'),
            date_ended: this.datePipe.transform(this.project.date_ended.toUTCString(), 'yyyy-MM-dd'),
            date_onboard: this.datePipe.transform(this.project.date_onboard.toUTCString(), 'yyyy-MM-dd'),
            website: this.project.website,
            staging_link: this.project.staging_link,
            repo_link: this.project.repo_link,
            technologies: this.project.technologies,
        };

        for (let key in projectObj) {
            params.set(key, projectObj[key])
        }

        this.http.post<APIResponse>(AppConfig.BASEURL + 'save/project', params.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).subscribe(result => {
            if (result.status) {
                this.router.navigateByUrl('projects');
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
                message: "Sorry, we cannot save project right now."
            };
            window.scrollTo(0, 0);
        });
    }

    // Get All Users
    getProjectByID() {
        const id = +this.activeRoute.snapshot.paramMap.get('id');
        this.http.get<APIResponse>(AppConfig.BASEURL + 'project/detail/' + id).subscribe(result => {
                result.data = [result.data];
                if (result.status) {
                    this.project = {
                        id: result.data[0].id,
                        name: result.data[0].name,
                        description: result.data[0].description,
                        status: result.data[0].status,
                        attachment: '',
                        logo: 'user-default.png',
                        date_started: new Date(result.data[0].date_started),
                        date_ended: new Date(result.data[0].date_ended),
                        date_onboard: new Date(result.data[0].date_onboard),
                        website: result.data[0].website,
                        staging_link: result.data[0].staging_link,
                        repo_link: result.data[0].repo_link,
                        technologies: result.data[0].technologies,
                    }
                }
            },
            err => {
                console.log("Error occured.")
            }
        );
    }

}
