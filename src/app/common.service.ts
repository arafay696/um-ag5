import {Injectable} from '@angular/core';

@Injectable()
export class CommonService {

    private title = "CR Management";

    constructor() {
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }
}
