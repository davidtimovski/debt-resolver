import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {Data} from '../data';
import {Person} from '../models/person';

@inject(Data)
export class AddPersons {

    constructor(data) {
        this.data = data;
        this.editing = false;
        this.invalidPersonName = false;
        this.addDebtLabel = this.data.debtItems.length === 0 ? 'Add Debt' : 'Continue';
    }

    attached() {
        let self = this;
        $(this.view).velocity('fadeIn', { 
            duration: 600, 
            begin: () => { 
                setTimeout(() => {
                    self.nameInput.focus();
                }, 200);
            } 
        });
    }

    select(selectedPerson) {
        for (let person of this.data.persons) {
            person.beingEdited = false;
        }

        if (selectedPerson.isTheSameAs(this.data.currentPerson)) {
            selectedPerson.beingEdited = false;
            this.data.currentPerson = new Person('');
            this.editing = false;
        } else {
            selectedPerson.beingEdited = true;
            this.data.currentPerson = selectedPerson;
            this.editing = true;
        }
    }

    save() {
        if (!this.data.currentPerson.name.trim()) {
            this.formError = true;
            this.nameInput.focus();
            return;
        }

        let editedPerson = this.data.persons.find(person => person.hasTheSameNameAs(this.data.currentPerson));
        if (editedPerson) {
            if (!this.data.currentPerson.isTheSameAs(editedPerson)) {
                this.formError = true;
                return;
            }
            editedPerson.beingEdited = false;
            this.data.currentPerson = new Person('');
            this.editing = false;
            this.nameInput.focus();
            this.formError = false;
            return;
        }

        this.data.addCurrentPerson();
        this.data.currentPerson = new Person('');
        this.editing = false;
        this.nameInput.focus();
        this.formError = false;
    }

    remove($index, person, event) {
        if (person.name === this.data.currentPerson.name) {
            return;
        }

        event.stopPropagation();
        this.data.removePerson($index, person);
        this.nameInput.focus();
    }

    cancel() {
        this.data.currentPerson.beingEdited = false;
        this.data.currentPerson = new Person('');
        this.editing = false;
        this.nameInput.focus();
        this.formError = false;
    }

    @computedFrom('editing')
    get addPersonLabel() {
        return this.editing ? 'Save Person' : 'Add Person';
    }

    @computedFrom('data.persons.length')
    get canSeePersons() {
        return this.data.persons.length > 0;
    }

    @computedFrom('data.currentPerson.name', 'editing')
    get canCancel() {
        return this.data.currentPerson.name !== '' || this.editing;
    }

    @computedFrom('data.persons.length')
    get canAddDebt() {
        return this.data.persons.length > 1;
    }

    @computedFrom('formError')
    get formErrorClass() {
        return this.formError ? 'error' : '';
    }
    
}