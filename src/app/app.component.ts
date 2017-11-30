import {Component, OnInit} from '@angular/core';
import {CommonService} from './common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css',
    ]
})

export class AppComponent implements OnInit {
    title = 'app';

    constructor(private commonService: CommonService) {
    }

    ngOnInit() {
        this.commonService.setTitle(this.title);
        this.title = this.commonService.getTitle();
    }

}
