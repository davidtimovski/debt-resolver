import {computedFrom} from 'aurelia-framework';

export class Person {

    constructor(name) {
        this.id = Math.random();
        this.name = name;
        this.owes = 0;
        this.beingEdited = false;
    }

    isTheSameAs(person) {
        return this.id === person.id;
    }

    hasTheSameNameAs(person) {
        return this.name.toLowerCase() === person.name.toLowerCase();
    }

    @computedFrom('beingEdited')
    get removeButtonLabel() {
        return this.beingEdited ? 'Editing..' : 'Remove';
    }

}