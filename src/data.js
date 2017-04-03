import {Person} from 'models/person';
import {Debt} from 'models/debt';

export class Data {

    constructor() {
        this.persons = [];
        this.debtItems = [];
        this.transactions = [];
        this.reduction = 0;

        this.currentPerson = new Person('');
        this.currentDebt = new Debt(new Person(''), new Person(''), null);
    }

    resolveDebt() {

        let debtors = [];
        let creditors = [];

        for (let debt of this.debtItems) {
            debt.creditor.owes -= debt.amount;
            debt.debtor.owes += debt.amount;
        }

        for (let person of this.persons) {
            if (person.owes > 0) {
                debtors.push(person);
            } else if (person.owes < 0) {
                creditors.push(person);
            }
        }

        debtors.sort((d, d2) => { return d.owes - d2.owes; });
        creditors.sort((c, c2) => { return c.owes - c2.owes; });

        for (let debtor of debtors) {
            while (debtor.owes > 0) {
                let creditor = creditors[0];
                let amount = Math.min(debtor.owes, -creditor.owes);
                creditor.owes += amount;
                debtor.owes -= amount;

                if (creditor.owes === 0) {
                    creditors.shift();
                }

                this.transactions.push(new Debt(debtor, creditor, amount));
            }
        }

        this.reduction = Math.floor(100 - this.transactions.length / this.debtItems.length * 100);
    }

    addDebt(debtorName, creditorName, amount) {
        let debtor = this.persons.find(function (person) { return person.name === debtorName; });
        let creditor = this.persons.find(function (person) { return person.name === creditorName; });
        this.currentDebt = new Debt(debtor, creditor, null);
    }

    addCurrentPerson(person) {
        let name = this.currentPerson.name.trim();
        this.currentPerson.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.persons.push(this.currentPerson);
    }

    removePerson(index, person) {
        for (let i = this.debtItems.length - 1; i >= 0; i--) {
            if (this.debtItems[i].debtor.name === person.name || this.debtItems[i].creditor.name === person.name) {
                this.debtItems.splice(i, 1);
            }
        }

        this.persons.splice(index, 1);
    }

    resetExceptPersons() {
        for (let person of this.persons) {
            person.owes = 0;
        }
        this.debtItems = [];
        this.transactions = [];
        this.currentPerson = new Person('');
        this.currentDebt = new Debt(new Person(''), new Person(''), null);
        this.reduction = 0;
    }

    reset() {
        this.persons = [];
        this.debtItems = [];
        this.transactions = [];
        this.currentPerson = new Person('');
        this.currentDebt = new Debt(new Person(''), new Person(''), null);
        this.reduction = 0;
    }
}