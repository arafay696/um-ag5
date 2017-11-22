import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';

@Component({
    selector: 'title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

    public title = "Dashboard - CR Management";

    constructor(private commonService: CommonService) {
    }

    ngOnInit() {
        this.commonService.setTitle(this.title);
        this.title = this.commonService.getTitle();
    }

}
