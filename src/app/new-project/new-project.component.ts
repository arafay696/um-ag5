import {Component, OnInit} from '@angular/core';
import {DatepickerOptions} from 'ng2-datepicker';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';

import {APIResponse} from '../api.response';
import {AppConfig} from '../app.settings';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

    options: DatepickerOptions = {
        minYear: 1970,
        maxYear: new Date().getFullYear(),
        displayFormat: 'YYYY-MM-DD',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    };

    //Project New Object
    project = {
        name: '',
        description: '',
        status: '',
        attachment: '',
        logo: 'user-default.png',
        date_started:  new Date(),
        date_ended: new Date(),
        date_onboard: new Date(),
        website: '',
        staging_link: '',
        repo_link: '',
        technologies: ''
    };

    constructor(private http: HttpClient, private router: Router,private datePipe: DatePipe) {
    }

    ngOnInit() {
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
            name: this.project.name,
            description: this.project.description,
            status: this.project.status,
            attachment: '',
            logo: 'user-default.png',
            date_started:  this.datePipe.transform(this.project.date_started.toUTCString(), 'yyyy-MM-dd'),
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
}
