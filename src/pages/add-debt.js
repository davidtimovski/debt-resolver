import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Data} from '../data';
import {Debt} from '../models/debt';

@inject(Data, Router)
export class AddDebt {

    constructor(data, router) {
        this.data = data;
        this.router = router;
    }

    attached() {
        if (this.redirect()) {
            this.router.navigateToRoute('index');
        }

        $(this.view).velocity('fadeIn', { duration: 600 });

        $('.draggable').draggable({
            axis: 'y',
            revert: 'invalid',
            revertDuration: 200,
            snap: true,
            snapMode: 'inner',
            snapTolerance: 30,
            zIndex: 10
        });

        let self = this;

        function goToAddDebt(debtor, creditor) {
            self.data.addDebt(debtor, creditor, null)
            self.router.navigateToRoute('debt-amount');
        }

        $('.droppable').droppable({
            drop: (event, ui) => {
                let debtor = ui.draggable.attr('data-person');
                let creditor = $(this).attr('data-person');

                goToAddDebt(debtor, creditor);
            }
        });
    }

    remove($index, debt) {
        this.data.debtItems.splice($index, 1);
    }

    @computedFrom('data.debtItems.length')
    get canSeeDebt() {
        return this.data.debtItems.length > 0;
    }

    @computedFrom('data.debtItems.length')
    get canResolveDebt() {
        return this.data.debtItems.length > 1;
    }

    resolveDebt() {
        this.data.resolveDebt();
        this.router.navigateToRoute('resolved-debt');
    }

    redirect() {
        return this.data.persons.length < 2;
    }
    
}