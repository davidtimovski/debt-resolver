import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Data} from '../data';
import {Debt} from '../models/debt';
import {Person} from '../models/person';

@inject(Data, Router)
export class DebtAmount {

    constructor(data, router) {
        this.data = data;
        this.router = router;
    }

    attached() {
        if (this.redirect()) {
            this.router.navigateToRoute('index');
        }

        let self = this;
        $(this.view).velocity('fadeIn', { 
            duration: 600, 
            begin: () => { 
                setTimeout(() => {
                    self.amountInput.focus();
                }, 200); 
            } 
        });
    }

    save() {
        if (!this.data.currentDebt.amount) {
            this.amountInput.focus();
            return;
        }
        if (this.data.currentDebt.amount === 0) {
            this.amountInput.focus();
            return;
        }

        this.data.debtItems.push(this.data.currentDebt);
        this.router.navigateToRoute('add-debt');
    }

    cancel() {
        this.currentDebt = new Debt(new Person(''), new Person(''), null);
        this.router.navigateToRoute('add-debt');
    }

    redirect() {
        return this.data.persons.length < 2;
    }
    
}