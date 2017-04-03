import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Data} from '../data';

@inject(Data, Router)
export class ResolvedDebt {

    constructor(data, router) {
        this.data = data;
        this.router = router;
    }

    attached() {
        if (this.redirect()) {
            this.router.navigateToRoute('index');
        }

        $(this.view).velocity('fadeIn', { duration: 600 });
    }

    startOverKeepPersons() {
        this.data.resetExceptPersons();
        this.router.navigateToRoute('add-debt');
    }

    startOver() {
        this.data.reset();
        this.router.navigateToRoute('add-persons');
    }

    redirect() {
        return this.data.transactions.length === 0;
    }
    
}