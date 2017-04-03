import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Data} from '../data';

@inject(Data, Router)
export class Home {

    constructor(data, router) {
        this.data = data;
        this.router = router;
        this.startButtonLabel = this.data.persons.length === 0 ? 'Start' : 'Continue';
    }

    attached() {
        $(this.view).velocity('fadeIn', { duration: 600 });
    }

    startOver() {
        this.data.reset();
        this.router.navigateToRoute('add-persons');
    }

    @computedFrom('data.persons.length')
    get canStartOver() {
        return this.data.persons.length > 0;
    }

}